'use server';

import { prisma } from '@/lib/prisma';
import type { CalendarEvent } from '@prisma/client';
import type { ResponseData } from '@/types/response';

// --- Action to Get Calendar Events ---
export async function getCalendarEvents(): Promise<
  ResponseData<CalendarEvent[]>
> {
  try {
    const calendarEvents = await prisma.calendarEvent.findMany();
    if (!calendarEvents || calendarEvents.length === 0) {
      return { success: false, error: 'Calendar event not found.' };
    }
    return { success: true, data: calendarEvents };
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    return { success: false, error: 'Failed to fetch calendar events.' };
  }
}
