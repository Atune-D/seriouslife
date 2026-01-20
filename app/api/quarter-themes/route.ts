import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, why, start_date, end_date } = body;
    
    if (!title || !start_date || !end_date) {
      return NextResponse.json(
        { error: 'Missing required fields: title, start_date, end_date' },
        { status: 400 }
      );
    }
    
    // For MVP, use hardcoded user ID
    const userId = 'default-user';
    
    // Set all existing themes to paused
    await prisma.quarterTheme.updateMany({
      where: {
        userId,
        status: 'active',
      },
      data: {
        status: 'paused',
      },
    });
    
    const quarterTheme = await prisma.quarterTheme.create({
      data: {
        userId,
        title,
        why: why || null,
        status: 'active',
        startDate: new Date(start_date),
        endDate: new Date(end_date),
      },
    });
    
    return NextResponse.json(quarterTheme);
  } catch (error) {
    console.error('Error creating quarter theme:', error);
    return NextResponse.json(
      { error: 'Failed to create quarter theme' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // For MVP, use hardcoded user ID
    const userId = 'default-user';
    
    const themes = await prisma.quarterTheme.findMany({
      where: {
        userId,
      },
      orderBy: {
        startDate: 'desc',
      },
    });
    
    return NextResponse.json(themes);
  } catch (error) {
    console.error('Error fetching quarter themes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quarter themes' },
      { status: 500 }
    );
  }
}


