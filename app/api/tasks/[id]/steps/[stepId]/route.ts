import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string; stepId: string } }
) {
  try {
    const body = await request.json();
    const { is_done, title } = body;
    
    const updateData: any = {};
    
    if (is_done !== undefined) {
      updateData.isDone = is_done;
    }
    
    if (title !== undefined) {
      updateData.title = title;
    }
    
    const step = await prisma.taskStep.update({
      where: {
        id: params.stepId,
      },
      data: updateData,
    });
    
    return NextResponse.json(step);
  } catch (error) {
    console.error('Error updating step:', error);
    return NextResponse.json(
      { error: 'Failed to update step' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; stepId: string } }
) {
  try {
    await prisma.taskStep.delete({
      where: {
        id: params.stepId,
      },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting step:', error);
    return NextResponse.json(
      { error: 'Failed to delete step' },
      { status: 500 }
    );
  }
}


