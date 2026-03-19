import { prisma } from '@/lib/prisma';
import { startOfWeek } from 'date-fns';

export interface TodayData {
  context: {
    quarterTheme: any | null;
    monthlyFocuses: any[];
    weeklyTheme: any | null;
  };
  kpis: Array<{
    id: string;
    name: string;
    unit: string;
    target: number | null;
    todayValue: number;
  }>;
  tasks: any[];
  reflection: any | null;
}

/**
 * Get all data needed for the Today page in a single optimized query
 */
export async function getTodayData(date: Date, userId: string): Promise<TodayData> {
  const weekStart = startOfWeek(date, { weekStartsOn: 1 });

  // Get active quarter theme
  const quarterTheme = await prisma.quarterTheme.findFirst({
    where: {
      userId,
      status: 'active',
    },
  });

  if (!quarterTheme) {
    return {
      context: {
        quarterTheme: null,
        monthlyFocuses: [],
        weeklyTheme: null,
      },
      kpis: [],
      tasks: [],
      reflection: null,
    };
  }

  // Get monthly focuses for active quarter
  const monthlyFocuses = await prisma.monthlyFocus.findMany({
    where: {
      userId,
      quarterThemeId: quarterTheme.id,
    },
    orderBy: {
      monthStart: 'desc',
    },
    take: 2,
  });

  // Get weekly theme for current week
  const weeklyTheme = await prisma.weeklyTheme.findUnique({
    where: {
      userId_weekStart: {
        userId,
        weekStart,
      },
    },
  });

  // Get KPIs with today's values
  const kpis = await prisma.kPI.findMany({
    where: {
      userId,
      quarterThemeId: quarterTheme.id,
    },
    include: {
      entries: {
        where: {
          date,
        },
      },
    },
    take: 3, // Max 3 KPIs
  });

  const kpisWithValues = kpis.map((kpi) => ({
    id: kpi.id,
    name: kpi.name,
    unit: kpi.unit,
    target: kpi.target,
    todayValue: kpi.entries[0]?.value ?? 0,
  }));

  // Get tasks for today with steps
  const tasks = await prisma.task.findMany({
    where: {
      userId,
      date,
    },
    include: {
      steps: {
        orderBy: {
          position: 'asc',
        },
      },
      weeklyTheme: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  // Get reflection for today
  const reflection = await prisma.reflection.findUnique({
    where: {
      userId_date: {
        userId,
        date,
      },
    },
  });

  return {
    context: {
      quarterTheme,
      monthlyFocuses,
      weeklyTheme,
    },
    kpis: kpisWithValues,
    tasks,
    reflection,
  };
}


