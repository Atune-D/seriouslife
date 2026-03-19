import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { title, position } = body;
    
    if (!title) {
      return NextResponse.json(
        { error: 'Missing required field: title' },
        { status: 400 }
      );
    }
    
    // Get current max position
    const maxStep = await prisma.taskStep.findFirst({
      where: {
        taskId: params.id,
      },
      orderBy: {
        position: 'desc',
      },
    });
    
    const newPosition = position !== undefined ? position : (maxStep?.position ?? -1) + 1;
    
    const step = await prisma.taskStep.create({
      data: {
        taskId: params.id,
        title,
        position: newPosition,
        isDone: false,
      },
    });
    
    return NextResponse.json(step);
  } catch (error) {
    console.error('Error creating step:', error);
    return NextResponse.json(
      { error: 'Failed to create step' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const steps = await prisma.taskStep.findMany({
      where: {
        taskId: params.id,
      },
      orderBy: {
        position: 'asc',
      },
    });
    
    return NextResponse.json(steps);
  } catch (error) {
    console.error('Error fetching steps:', error);
    return NextResponse.json(
      { error: 'Failed to fetch steps' },
      { status: 500 }
    );
  }
}


