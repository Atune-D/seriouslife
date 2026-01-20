import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { kpi_id, date: dateStr, delta } = body;
    
    if (!kpi_id || !dateStr || delta === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: kpi_id, date, delta' },
        { status: 400 }
      );
    }
    
    const date = new Date(dateStr);
    date.setHours(0, 0, 0, 0);
    
    // For MVP, use hardcoded user ID
    const userId = 'default-user';
    
    // Find existing entry
    const existing = await prisma.kPIEntry.findUnique({
      where: {
        kpiId_date: {
          kpiId: kpi_id,
          date,
        },
      },
    });
    
    let newValue: number;
    
    if (existing) {
      // Update existing
      newValue = Math.max(0, existing.value + delta);
      await prisma.kPIEntry.update({
        where: {
          id: existing.id,
        },
        data: {
          value: newValue,
        },
      });
    } else {
      // Create new entry
      newValue = Math.max(0, delta);
      await prisma.kPIEntry.create({
        data: {
          userId,
          kpiId: kpi_id,
          date,
          value: newValue,
        },
      });
    }
    
    return NextResponse.json({ value: newValue });
  } catch (error) {
    console.error('Error incrementing KPI:', error);
    return NextResponse.json(
      { error: 'Failed to increment KPI' },
      { status: 500 }
    );
  }
}


