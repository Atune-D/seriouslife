import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { quarter_theme_id, name, unit, cadence, target, action_template } = body;
    
    if (!quarter_theme_id || !name) {
      return NextResponse.json(
        { error: 'Missing required fields: quarter_theme_id, name' },
        { status: 400 }
      );
    }
    
    // For MVP, use hardcoded user ID
    const userId = 'default-user';
    
    // Check if user already has 3 KPIs for this quarter
    const existingCount = await prisma.kPI.count({
      where: {
        userId,
        quarterThemeId: quarter_theme_id,
      },
    });
    
    if (existingCount >= 3) {
      return NextResponse.json(
        { error: 'Maximum 3 KPIs per quarter allowed' },
        { status: 400 }
      );
    }
    
    const kpi = await prisma.kPI.create({
      data: {
        userId,
        quarterThemeId: quarter_theme_id,
        name,
        unit: unit || 'count',
        cadence: cadence || 'daily',
        target: target || null,
        actionTemplate: action_template || null,
      },
    });
    
    return NextResponse.json(kpi);
  } catch (error) {
    console.error('Error creating KPI:', error);
    return NextResponse.json(
      { error: 'Failed to create KPI' },
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
    
    const kpis = await prisma.kPI.findMany({
      where,
      include: {
        quarterTheme: true,
      },
    });
    
    return NextResponse.json(kpis);
  } catch (error) {
    console.error('Error fetching KPIs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch KPIs' },
      { status: 500 }
    );
  }
}


