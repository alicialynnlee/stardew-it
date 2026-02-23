import { DAYS, SEASONS } from '@/constants/calendar';
import type { CalendarEvent, Task } from '@prisma/client';

// Type for CalendarEvent with tasks included
type CalendarEventWithTasks = CalendarEvent & {
  tasks: Task[];
};

/**
 * Defines the type for the seasons of the year.
 * Key: Season String "Spring", "Summer", "Fall", "Winter"
 * Value: Array of days of the season, 0-28, 29 if no day (season event), null if no event
 * Value: Array of CalendarEvents with tasks
 */
type CalendarEventData = Map<
  string,
  Array<Array<CalendarEventWithTasks> | null>
>;

type Season = (typeof SEASONS)[number];
type DayNum = (typeof DAYS)[number];
type Day = `${Season} ${DayNum}`;

export type { CalendarEventWithTasks, CalendarEventData, Season, DayNum, Day };
