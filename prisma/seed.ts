import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

const prisma = new PrismaClient();

async function main() {
  const userId = 'default-user';

  console.log('Seeding database...');

  // Create Quarter Theme
  const quarterTheme = await prisma.quarterTheme.create({
    data: {
      userId,
      title: 'Build Healthy Habits',
      why: 'I want to establish consistent routines that support my long-term goals',
      status: 'active',
      startDate: new Date('2026-01-01'),
      endDate: new Date('2026-03-31'),
    },
  });

  console.log('Created Quarter Theme:', quarterTheme.title);

  // Create KPIs
  const kpi1 = await prisma.kPI.create({
    data: {
      userId,
      quarterThemeId: quarterTheme.id,
      name: 'Deep work sessions',
      unit: 'sessions',
      cadence: 'daily',
      target: 2,
    },
  });

  const kpi2 = await prisma.kPI.create({
    data: {
      userId,
      quarterThemeId: quarterTheme.id,
      name: 'Exercise',
      unit: 'minutes',
      cadence: 'daily',
      target: 30,
    },
  });

  const kpi3 = await prisma.kPI.create({
    data: {
      userId,
      quarterThemeId: quarterTheme.id,
      name: 'Reading',
      unit: 'pages',
      cadence: 'daily',
      target: 10,
    },
  });

  console.log('Created 3 KPIs');

  // Create Weekly Theme for current week
  const today = new Date();
  const monday = new Date(today);
  monday.setDate(today.getDate() - today.getDay() + 1); // Get Monday
  monday.setHours(0, 0, 0, 0);

  const weeklyTheme = await prisma.weeklyTheme.create({
    data: {
      userId,
      quarterThemeId: quarterTheme.id,
      title: 'This week: establish morning routine',
      weekStart: monday,
    },
  });

  console.log('Created Weekly Theme:', weeklyTheme.title);

  // Create sample tasks for today
  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);

  const task1 = await prisma.task.create({
    data: {
      userId,
      weeklyThemeId: weeklyTheme.id,
      date: todayDate,
      title: 'Complete project proposal',
      tinyStart: 'Open blank document and write title',
      progressScore: 3,
      status: 'planned',
      resistance: 'medium',
    },
  });

  await prisma.taskStep.createMany({
    data: [
      {
        taskId: task1.id,
        title: 'Research requirements',
        isDone: true,
        position: 0,
      },
      {
        taskId: task1.id,
        title: 'Draft outline',
        isDone: true,
        position: 1,
      },
      {
        taskId: task1.id,
        title: 'Write introduction',
        isDone: false,
        position: 2,
      },
      {
        taskId: task1.id,
        title: 'Complete first draft',
        isDone: false,
        position: 3,
      },
    ],
  });

  const task2 = await prisma.task.create({
    data: {
      userId,
      weeklyThemeId: weeklyTheme.id,
      date: todayDate,
      title: 'Review and respond to emails',
      tinyStart: 'Open inbox and mark urgent messages',
      progressScore: 0,
      status: 'planned',
      resistance: 'low',
    },
  });

  console.log('Created 2 sample tasks with checklist items');

  // Create sample KPI entries for today
  await prisma.kPIEntry.create({
    data: {
      userId,
      kpiId: kpi1.id,
      date: todayDate,
      value: 1,
    },
  });

  console.log('Created sample KPI entry');

  console.log('✅ Seeding complete!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


