'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  getCalendarEvents,
  getCalendarEventsForTask,
} from '@/actions/calendarActions';
import type {
  CalendarEventData,
  CalendarEventWithTasks,
} from '@/types/calendar';

export function useCalendarEvents() {
  const [calendarEvents, setCalendarEvents] = useState<CalendarEventData>({
    daily: new Map(),
    seasonal: new Map(),
    yearRound: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCalendarEvents = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getCalendarEvents();
      if (result.success && result.data) {
        const calendarEventsData = result.data as CalendarEventWithTasks[];
        const currCalendarEvents: CalendarEventData = {
          daily: new Map(),
          seasonal: new Map(),
          yearRound: [],
        };
        calendarEventsData.forEach((event: CalendarEventWithTasks) => {
          const parts = event.date.split(' ');
          const season = parts[0];

          if (season === 'year-round') {
            currCalendarEvents.yearRound.push(event);
          } else if (parts.length === 2) {
            const dayKey = event.date as import('@/types/calendar').Day;
            const existing = currCalendarEvents.daily.get(dayKey);
            if (existing) {
              existing.push(event);
            } else {
              currCalendarEvents.daily.set(dayKey, [event]);
            }
          } else {
            const seasonKey = season as import('@/types/calendar').Season;
            const existing = currCalendarEvents.seasonal.get(seasonKey);
            if (existing) {
              existing.push(event);
            } else {
              currCalendarEvents.seasonal.set(seasonKey, [event]);
            }
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
  const [calendarEvents, setCalendarEvents] = useState<
    CalendarEventWithTasks[]
  >([]);
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
        setCalendarEvents(result.data as CalendarEventWithTasks[]);
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
