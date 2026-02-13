'use client';

import {
  Calendar,
  CalendarPanel,
  EventDetails,
  WarningBanner,
} from '@/components';
import { useTasks } from '@/hooks/useTasks';
import { useCalendarEvents } from '@/hooks/useCalendarEvents';
// import { getCurrentUser } from '@/lib/auth';
import { CalendarEventWithTasks, Day } from '@/types/calendar';
import { Box, Flex, Link, Spinner } from '@radix-ui/themes';
import { useState } from 'react';

export default function CalendarClient({
  userId,
  selectedFarmId,
}: {
  userId: string | null;
  selectedFarmId: string | null;
}) {
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(0);
  const [selectedDay, setSelectedDay] = useState<Day | null>('Spring 1');
  const { farmTaskCompletion, updateTask } = useTasks(selectedFarmId);
  const [selectedEvent, setSelectedEvent] =
    useState<CalendarEventWithTasks | null>(null);
  const { calendarEvents, isLoading, error } = useCalendarEvents();

  if (isLoading) return <Spinner />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {(!userId || (userId && !selectedFarmId)) && (
        <Box py="3">
          <WarningBanner
            content={
              userId ? (
                <>
                  Please select a farm from the navigation bar to track your
                  progress.
                </>
              ) : (
                <>
                  You must be <Link href="/auth">signed in</Link> and have a
                  farm selected to save your progress.
                </>
              )
            }
          />
        </Box>
      )}
      <Flex direction="row" align="stretch" height="calc(100vh - 9rem)">
        <Calendar
          farmTaskCompletion={selectedFarmId ? farmTaskCompletion : undefined}
          selectedMonth={selectedMonthIndex}
          selectedDay={selectedDay}
          changeSelectedDay={(dayIndex) => setSelectedDay(dayIndex)}
          changeSelectedMonth={(monthIndex) =>
            setSelectedMonthIndex(monthIndex)
          }
          selectedEvent={selectedEvent}
          changeSelectedEvent={(event) => setSelectedEvent(event)}
          calendarEvents={calendarEvents}
        />
        <CalendarPanel
          selectedMonth={selectedMonthIndex}
          selectedDay={selectedDay}
          changeSelectedDay={(dayIndex) => setSelectedDay(dayIndex)}
          changeSelectedMonth={(monthIndex) =>
            setSelectedMonthIndex(monthIndex)
          }
          selectedEvent={selectedEvent}
          changeSelectedEvent={(event) => setSelectedEvent(event)}
          farmTaskCompletion={selectedFarmId ? farmTaskCompletion : undefined}
          calendarEvents={calendarEvents}
        />
      </Flex>
      {selectedEvent && (
        <EventDetails
          event={selectedEvent}
          changeSelectedEvent={(event) => setSelectedEvent(event)}
          farmTaskCompletion={selectedFarmId ? farmTaskCompletion : undefined}
          updateTask={selectedFarmId ? updateTask : undefined}
        />
      )}
    </div>
  );
}
