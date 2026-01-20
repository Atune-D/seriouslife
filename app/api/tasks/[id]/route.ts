import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { status, resistance, progress_score } = body;
    
    const updateData: any = {};
    
    if (status !== undefined) {
      updateData.status = status;
      // If status is done, set progress to 10
      if (status === 'done') {
        updateData.progressScore = 10;
      }
    }
    
    if (resistance !== undefined) {
      updateData.resistance = resistance;
    }
    
    if (progress_score !== undefined) {
      // Validate progress score is 0-10
      const score = Math.max(0, Math.min(10, progress_score));
      updateData.progressScore = score;
      
      // If progress is 10, mark as done
      if (score === 10) {
        updateData.status = 'done';
      }
    }
    
    const task = await prisma.task.update({
      where: {
        id: params.id,
      },
      data: updateData,
      include: {
        steps: {
          orderBy: {
            position: 'asc',
          },
        },
        weeklyTheme: true,
      },
    });
    
    return NextResponse.json(task);
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json(
      { error: 'Failed to update task' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.task.delete({
      where: {
        id: params.id,
      },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting task:', error);
    return NextResponse.json(
      { error: 'Failed to delete task' },
      { status: 500 }
    );
  }
}


