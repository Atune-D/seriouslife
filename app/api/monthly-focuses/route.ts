import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { quarter_theme_id, title, month_start } = body;
    
    if (!quarter_theme_id || !title || !month_start) {
      return NextResponse.json(
        { error: 'Missing required fields: quarter_theme_id, title, month_start' },
        { status: 400 }
      );
    }
    
    // For MVP, use hardcoded user ID
    const userId = 'default-user';
    
    const monthlyFocus = await prisma.monthlyFocus.create({
      data: {
        userId,
        quarterThemeId: quarter_theme_id,
        title,
        monthStart: new Date(month_start),
      },
    });
    
    return NextResponse.json(monthlyFocus);
  } catch (error) {
    console.error('Error creating monthly focus:', error);
    return NextResponse.json(
      { error: 'Failed to create monthly focus' },
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
    
    const focuses = await prisma.monthlyFocus.findMany({
      where,
      orderBy: {
        monthStart: 'desc',
      },
    });
    
    return NextResponse.json(focuses);
  } catch (error) {
    console.error('Error fetching monthly focuses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch monthly focuses' },
      { status: 500 }
    );
  }
}


