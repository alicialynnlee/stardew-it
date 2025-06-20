'use client';

import { useState, useEffect, useCallback } from 'react';
import type { CalendarEvent } from '@prisma/client';
import {
  getCalendarEvents,
  getCalendarEventsForTask,
} from '@/actions/calendarActions';
import type { CalendarEventData } from '@/types/calendar';

export function useCalendarEvents() {
  const [calendarEvents, setCalendarEvents] = useState<CalendarEventData>(
    new Map()
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCalendarEvents = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getCalendarEvents();
      if (result.success && result.data) {
        const calendarEventsData = result.data;
        const currCalendarEvents = new Map([
          ['Spring', Array(29).fill(null)],
          ['Summer', Array(29).fill(null)],
          ['Fall', Array(29).fill(null)],
          ['Winter', Array(29).fill(null)],
        ]);
        calendarEventsData.forEach((event: CalendarEvent) => {
          const date = event.date.split(' ');
          const monthMap = currCalendarEvents.get(date[0]);
          if (!monthMap || !date[0]) {
            setError('Could not find month map');
            return;
          }
          const day = date.length === 2 ? parseInt(date[1]) : 29;
          if (monthMap[day]) {
            monthMap[day].push(event);
          } else {
            monthMap[day] = [event];
          }
        });
        setCalendarEvents(currCalendarEvents);
      } else if (!result.success) {
        setError(result.error ?? 'Could not fetch calendar events');
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Could not fetch calendar events'
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCalendarEvents();
  }, [fetchCalendarEvents]);

  return {
    calendarEvents,
    isLoading,
    error,
  };
}

export function useCalendarEventsForTask(taskId: string) {
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCalendarEventsForTask = useCallback(async () => {
    if (!taskId) {
      setCalendarEvents([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const result = await getCalendarEventsForTask(taskId);
      if (result.success && result.data) {
        setCalendarEvents(result.data);
      } else if (!result.success) {
        setError(result.error ?? 'Could not fetch calendar events for task');
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Could not fetch calendar events for task'
      );
    } finally {
      setIsLoading(false);
    }
  }, [taskId]);

  useEffect(() => {
    fetchCalendarEventsForTask();
  }, [fetchCalendarEventsForTask]);

  return {
    calendarEvents,
    isLoading,
    error,
  };
}
