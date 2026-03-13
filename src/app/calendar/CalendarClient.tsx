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
import { Box, Flex, Grid, Link, Spinner } from '@radix-ui/themes';
import { useState, useEffect } from 'react';
import { setFarmDateAction } from '@/actions/farmActions';
import styled from 'styled-components';
import { BREAKPOINTS } from '@/styles/responsive';

const ResponsiveGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto;
  gap: 1rem;
  width: 100%;
  height: auto;

  /* Desktop: side-by-side layout */
  @media (min-width: ${BREAKPOINTS.tablet + 1}px) {
    grid-template-columns: 3fr 1fr;
    grid-template-rows: 1fr;
    height: calc(100vh - 9rem);
  }
`;

const CalendarContainer = styled.div`
  width: 100%;
  height: auto;
  overflow: hidden;

  @media (min-width: ${BREAKPOINTS.tablet + 1}px) {
    height: 100%;
  }
`;

const PanelContainer = styled.div`
  width: 100%;
  height: auto;
  overflow: hidden;

  @media (min-width: ${BREAKPOINTS.tablet + 1}px) {
    height: 100%;
  }
`;

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
  const [viewingDay, setViewingDay] = useState<Day>(
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

  // When the farm changes, sync selectedDay to the new farm's saved date
  useEffect(() => {
    setSelectedDay((initialDate as Day) ?? 'Spring 1');
  }, [initialDate]);

  const handleChangeSelectedDay = (day: Day) => {
    if (selectedFarmId) {
      setFarmDateAction(selectedFarmId, day);
    }
    setSelectedDay(day);
  };

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
      <ResponsiveGrid>
        <CalendarContainer>
          <Calendar
            farmTaskCompletion={selectedFarmId ? farmTaskCompletion : undefined}
            viewingSeasonIndex={viewingSeasonIndex}
            selectedDay={selectedDay}
            changeSelectedDay={(dayIndex) => handleChangeSelectedDay(dayIndex)}
            changeViewingSeasonIndex={(seasonIndex) =>
              setViewingSeasonIndex(seasonIndex)
            }
            selectedEvent={selectedEvent}
            changeSelectedEvent={(event) => setSelectedEvent(event)}
            calendarEvents={calendarEvents}
            viewingDay={viewingDay}
            changeViewingDay={(newDay) => setViewingDay(newDay)}
          />
        </CalendarContainer>
        <PanelContainer>
          <CalendarPanel
            viewingSeasonIndex={viewingSeasonIndex}
            viewingDay={viewingDay}
            selectedDay={selectedDay}
            changeSelectedEvent={(event) => setSelectedEvent(event)}
            farmTaskCompletion={selectedFarmId ? farmTaskCompletion : undefined}
            calendarEvents={calendarEvents}
          />
        </PanelContainer>
      </ResponsiveGrid>
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
