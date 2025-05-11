import type { CalendarEvent } from '@prisma/client';

/**
 * Defines the type for the months of the year.
 * Key: Month String "Spring", "Summer", "Fall", "Winter"
 * Value: Array of days of the month, 0-28, 29 if no day (month event), null if no event
 * Value: Array of CalendarEvents
 */
type CalendarEventData = Map<string, Array<Array<CalendarEvent> | null>>;
