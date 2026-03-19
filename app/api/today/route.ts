import { NextRequest, NextResponse } from 'next/server';
import { getTodayData } from '@/lib/services/today';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const dateParam = searchParams.get('date');
    
    // For MVP, use hardcoded user ID
    const userId = 'default-user';
    
    // Parse date or use today
    const date = dateParam ? new Date(dateParam) : new Date();
    date.setHours(0, 0, 0, 0); // Normalize to start of day
    
    const data = await getTodayData(date, userId);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching today data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch today data' },
      { status: 500 }
    );
  }
}


