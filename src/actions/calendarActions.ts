'use server';

import { prisma } from '@/lib/prisma';
import type { CalendarEvent } from '@prisma/client';
import type { ResponseData } from '@/types/response';

// --- Action to Get Calendar Events ---
export async function getCalendarEvents(): Promise<
  ResponseData<CalendarEvent[]>
> {
  try {
    const calendarEvents = await prisma.calendarEvent.findMany({
      include: {
        tasks: true,
      },
    });
    if (!calendarEvents || calendarEvents.length === 0) {
      return { success: false, error: 'Calendar event not found.' };
    }
    return { success: true, data: calendarEvents };
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    return { success: false, error: 'Failed to fetch calendar events.' };
  }
}

// --- Action to Get Calendar Events for a Specific Task ---
export async function getCalendarEventsForTask(
  taskId: string
): Promise<ResponseData<CalendarEvent[]>> {
  try {
    const calendarEvents = await prisma.calendarEvent.findMany({
      where: {
        tasks: {
          some: {
            id: taskId,
          },
        },
      },
    });
    return { success: true, data: calendarEvents };
  } catch (error) {
    console.error('Error fetching calendar events for task:', error);
    return {
      success: false,
      error: 'Failed to fetch calendar events for task.',
    };
  }
}
