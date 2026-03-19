import { prisma } from '@/lib/prisma';
import { startOfWeek } from 'date-fns';

/**
 * Get or create a weekly theme for a given date
 * Auto-assigns tasks to weeks with Monday as week start
 */
export async function getOrCreateWeeklyTheme(date: Date, userId: string): Promise<string> {
  // Calculate Monday of the week
  const weekStart = startOfWeek(date, { weekStartsOn: 1 }); // 1 = Monday

  // Try to find existing weekly theme
  let weeklyTheme = await prisma.weeklyTheme.findUnique({
    where: {
      userId_weekStart: {
        userId,
        weekStart,
      },
    },
  });

  // If not found, create a default one
  if (!weeklyTheme) {
    // First, get the active quarter theme
    const activeQuarter = await prisma.quarterTheme.findFirst({
      where: {
        userId,
        status: 'active',
      },
    });

    if (!activeQuarter) {
      throw new Error('No active quarter theme found. Please create a quarter theme first.');
    }

    // Create default weekly theme
    weeklyTheme = await prisma.weeklyTheme.create({
      data: {
        userId,
        quarterThemeId: activeQuarter.id,
        title: 'This week: keep momentum',
        weekStart,
      },
    });
  }

  return weeklyTheme.id;
}

/**
 * Get weekly theme by date
 */
export async function getWeeklyThemeByDate(date: Date, userId: string) {
  const weekStart = startOfWeek(date, { weekStartsOn: 1 });

  return prisma.weeklyTheme.findUnique({
    where: {
      userId_weekStart: {
        userId,
        weekStart,
      },
    },
    include: {
      quarterTheme: true,
      monthlyFocus: true,
    },
  });
}


