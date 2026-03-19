import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getOrCreateWeeklyTheme } from '@/lib/services/weekly-theme';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, tiny_start, date: dateStr, weekly_theme_id, resistance } = body;
    
    if (!title || !tiny_start || !dateStr) {
      return NextResponse.json(
        { error: 'Missing required fields: title, tiny_start, date' },
        { status: 400 }
      );
    }
    
    const date = new Date(dateStr);
    date.setHours(0, 0, 0, 0);
    
    // For MVP, use hardcoded user ID
    const userId = 'default-user';
    
    // Auto-assign to weekly theme if not provided
    let weeklyThemeId = weekly_theme_id;
    if (!weeklyThemeId) {
      weeklyThemeId = await getOrCreateWeeklyTheme(date, userId);
    }
    
    const task = await prisma.task.create({
      data: {
        userId,
        weeklyThemeId,
        date,
        title,
        tinyStart: tiny_start,
        resistance: resistance || null,
        progressScore: 0,
        status: 'planned',
      },
      include: {
        steps: true,
        weeklyTheme: true,
      },
    });
    
    return NextResponse.json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const dateParam = searchParams.get('date');
    
    // For MVP, use hardcoded user ID
    const userId = 'default-user';
    
    const date = dateParam ? new Date(dateParam) : new Date();
    date.setHours(0, 0, 0, 0);
    
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
    
    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}


