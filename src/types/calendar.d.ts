import { DAYS, SEASONS } from '@/constants/calendar';
import type { CalendarEvent, Task } from '@prisma/client';

// Type for CalendarEvent with tasks included
type CalendarEventWithTasks = CalendarEvent & {
  tasks: Task[];
};

/**
 * Defines the type for calendar event data, organized by scope.
 * - daily: events tied to a specific day, keyed by "Season Day" (e.g. "Spring 15")
 * - seasonal: events spanning an entire season, keyed by season name
 * - yearRound: events available year-round with no season/day restriction
 */
type CalendarEventData = {
  daily: Map<Day, CalendarEventWithTasks[]>;
  seasonal: Map<Season, CalendarEventWithTasks[]>;
  yearRound: CalendarEventWithTasks[];
};

type Season = (typeof SEASONS)[number];
type DayNum = (typeof DAYS)[number];
type Day = `${Season} ${DayNum}`;

export type { CalendarEventWithTasks, CalendarEventData, Season, DayNum, Day };
