import { DAYS, MONTHS } from '@/constants/calendar';
import type { CalendarEvent, Task } from '@prisma/client';

// Type for CalendarEvent with tasks included
type CalendarEventWithTasks = CalendarEvent & {
  tasks: Task[];
};

/**
 * Defines the type for the months of the year.
 * Key: Month String "Spring", "Summer", "Fall", "Winter"
 * Value: Array of days of the month, 0-28, 29 if no day (month event), null if no event
 * Value: Array of CalendarEvents with tasks
 */
type CalendarEventData = Map<
  string,
  Array<Array<CalendarEventWithTasks> | null>
>;

type Month = (typeof MONTHS)[number];
type DayNum = (typeof DAYS)[number];
type Day = `${Month} ${DayNum}`;

export type { CalendarEventWithTasks, CalendarEventData, Month, DayNum, Day };
