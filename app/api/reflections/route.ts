import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { date: dateStr, energy, mood, did, blocked } = body;
    
    if (!dateStr || !energy) {
      return NextResponse.json(
        { error: 'Missing required fields: date, energy' },
        { status: 400 }
      );
    }
    
    const date = new Date(dateStr);
    date.setHours(0, 0, 0, 0);
    
    // For MVP, use hardcoded user ID
    const userId = 'default-user';
    
    // Upsert reflection
    const reflection = await prisma.reflection.upsert({
      where: {
        userId_date: {
          userId,
          date,
        },
      },
      update: {
        energy,
        mood: mood || null,
        did: did || null,
        blocked: blocked || null,
      },
      create: {
        userId,
        date,
        energy,
        mood: mood || null,
        did: did || null,
        blocked: blocked || null,
      },
    });
    
    return NextResponse.json(reflection);
  } catch (error) {
    console.error('Error saving reflection:', error);
    return NextResponse.json(
      { error: 'Failed to save reflection' },
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
    
    const reflection = await prisma.reflection.findUnique({
      where: {
        userId_date: {
          userId,
          date,
        },
      },
    });
    
    return NextResponse.json(reflection);
  } catch (error) {
    console.error('Error fetching reflection:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reflection' },
      { status: 500 }
    );
  }
}


