import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { quarter_theme_id, monthly_focus_id, title, week_start } = body;
    
    if (!quarter_theme_id || !title || !week_start) {
      return NextResponse.json(
        { error: 'Missing required fields: quarter_theme_id, title, week_start' },
        { status: 400 }
      );
    }
    
    // For MVP, use hardcoded user ID
    const userId = 'default-user';
    
    const weeklyTheme = await prisma.weeklyTheme.create({
      data: {
        userId,
        quarterThemeId: quarter_theme_id,
        monthlyFocusId: monthly_focus_id || null,
        title,
        weekStart: new Date(week_start),
      },
    });
    
    return NextResponse.json(weeklyTheme);
  } catch (error) {
    console.error('Error creating weekly theme:', error);
    return NextResponse.json(
      { error: 'Failed to create weekly theme' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const quarterThemeId = searchParams.get('quarter_theme_id');
    
    // For MVP, use hardcoded user ID
    const userId = 'default-user';
    
    const where: any = { userId };
    if (quarterThemeId) {
      where.quarterThemeId = quarterThemeId;
    }
    
    const themes = await prisma.weeklyTheme.findMany({
      where,
      orderBy: {
        weekStart: 'desc',
      },
      include: {
        quarterTheme: true,
        monthlyFocus: true,
      },
    });
    
    return NextResponse.json(themes);
  } catch (error) {
    console.error('Error fetching weekly themes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weekly themes' },
      { status: 500 }
    );
  }
}


