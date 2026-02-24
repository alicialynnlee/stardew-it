'use client';

import {
  Calendar,
  CalendarPanel,
  EventDetails,
  WarningBanner,
} from '@/components';
import { useTasks } from '@/hooks/useTasks';
import { useCalendarEvents } from '@/hooks/useCalendarEvents';
import { useSetSelectedDay } from '@/contexts/SeasonalContext';
// import { getCurrentUser } from '@/lib/auth';
import { CalendarEventWithTasks, Day } from '@/types/calendar';
import { Box, Flex, Link, Spinner } from '@radix-ui/themes';
import { useState, useEffect } from 'react';
import { setFarmDateAction } from '@/actions/farmActions';

export default function CalendarClient({
  userId,
  selectedFarmId,
  initialDate,
}: {
  userId: string | null;
  selectedFarmId: string | null;
  initialDate?: string | null;
}) {
  const [viewingSeasonIndex, setViewingSeasonIndex] = useState(0);
  const [selectedDay, setSelectedDay] = useState<Day | null>(
    (initialDate as Day) ?? 'Spring 1'
  );
  const setSeasonalSelectedDay = useSetSelectedDay();
  const { farmTaskCompletion, updateTask } = useTasks(selectedFarmId);
  const [selectedEvent, setSelectedEvent] =
    useState<CalendarEventWithTasks | null>(null);
  const { calendarEvents, isLoading, error } = useCalendarEvents();

  // Sync selectedDay with seasonal context to update seasonal colors
  useEffect(() => {
    if (selectedDay) {
      setSeasonalSelectedDay(selectedDay);
    }
  }, [selectedDay, setSeasonalSelectedDay]);

  // Persist selectedDay to the farm's date field
  useEffect(() => {
    if (selectedFarmId && selectedDay) {
      setFarmDateAction(selectedFarmId, selectedDay);
    }
  }, [selectedFarmId, selectedDay]);

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
          viewingSeasonIndex={viewingSeasonIndex}
          selectedDay={selectedDay}
          changeSelectedDay={(dayIndex) => setSelectedDay(dayIndex)}
          changeViewingSeasonIndex={(seasonIndex) =>
            setViewingSeasonIndex(seasonIndex)
          }
          selectedEvent={selectedEvent}
          changeSelectedEvent={(event) => setSelectedEvent(event)}
          calendarEvents={calendarEvents}
        />
        <CalendarPanel
          viewingSeasonIndex={viewingSeasonIndex}
          selectedDay={selectedDay}
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
