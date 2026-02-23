'use client';

import * as Styled from './CalendarPanel.styled';
import { Flex, IconButton, Select, Text } from '@radix-ui/themes';
import { CheckIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { DAYS, SEASONS } from '@/constants/calendar';
import {
  CalendarEventData,
  CalendarEventWithTasks,
  Day,
} from '@/types/calendar';
import { FarmTaskCompletion } from '@/types/tasks';
import { useState, useMemo } from 'react';

export default function CalendarPanel({
  viewingSeasonIndex,
  selectedDay,
  changeSelectedEvent,
  farmTaskCompletion,
  calendarEvents,
}: {
  viewingSeasonIndex: number;
  selectedDay: Day | null;
  changeSelectedEvent: (event: CalendarEventWithTasks | null) => void;
  farmTaskCompletion?: FarmTaskCompletion;
  calendarEvents?: CalendarEventData;
}) {
  const [isOpen, setIsOpen] = useState(true);

  // Calculate upcoming calendar events based on selected season and day
  const upcomingCalendarEvents = useMemo(() => {
    if (!selectedDay || !calendarEvents || calendarEvents.size === 0) {
      return [];
    }

    const selectedDayNumber = parseInt(selectedDay.split(' ')[1]);

    // Flatten all calendar events and filter for upcoming ones
    const filteredEvents: CalendarEventWithTasks[] = [];
    const filteredSeasons = SEASONS.slice(viewingSeasonIndex);
    calendarEvents.forEach((seasonEvents, seasonName) => {
      if (filteredSeasons.includes(seasonName)) {
        const filteredDays = seasonEvents.slice(selectedDayNumber);
        filteredDays.forEach((dayEvents) => {
          if (dayEvents) {
            filteredEvents.push(...dayEvents);
          }
        });
      }
    });

    return filteredEvents;
  }, [selectedDay, viewingSeasonIndex, calendarEvents]);

  const getCompletionBadge = (event: CalendarEventWithTasks) => {
    if (!farmTaskCompletion || event.tasks.length === 0) return null;
    const completed = event.tasks.filter((t) =>
      farmTaskCompletion.get(t.id)
    ).length;
    const total = event.tasks.length;
    if (completed === total) {
      return (
        <Text size="1" color="green" weight="bold">
          <CheckIcon style={{ display: 'inline', verticalAlign: 'middle' }} />{' '}
          Done
        </Text>
      );
    }
    if (completed > 0) {
      return (
        <Text size="1" color="gray">
          {completed}/{total}
        </Text>
      );
    }
    return null;
  };

  return (
    <Styled.PanelWrapper $isOpen={isOpen}>
      <IconButton
        variant="ghost"
        className="panel-toggle"
        highContrast
        onClick={() => setIsOpen(!isOpen)}
      >
        <ChevronRightIcon />
      </IconButton>
      <Styled.PanelContent $isOpen={isOpen}>
        <Styled.ScrollablePanelCard>
          <Text size="2" weight="bold" as="div">
            Upcoming Events
          </Text>
          {upcomingCalendarEvents.length > 0 ? (
            <Styled.ScrollableContent>
              {upcomingCalendarEvents.map((event: CalendarEventWithTasks) => {
                const allDone =
                  farmTaskCompletion &&
                  event.tasks.length > 0 &&
                  event.tasks.every((t) => farmTaskCompletion.get(t.id));

                return (
                  <Styled.EventCard
                    key={event.id}
                    size="1"
                    mt="2"
                    onClick={() => changeSelectedEvent(event)}
                    $isCompleted={!!allDone}
                  >
                    <Flex justify="between" align="center">
                      <Text size="2" weight="medium" as="div">
                        {event.date}: {event.name}
                      </Text>
                      {getCompletionBadge(event)}
                    </Flex>
                    {event.description && (
                      <Text size="1" color="gray" as="p">
                        {event.description}
                      </Text>
                    )}
                  </Styled.EventCard>
                );
              })}
            </Styled.ScrollableContent>
          ) : (
            <Text size="2" color="gray" mt="2">
              No upcoming tasks
            </Text>
          )}
        </Styled.ScrollablePanelCard>
      </Styled.PanelContent>
    </Styled.PanelWrapper>
  );
}
