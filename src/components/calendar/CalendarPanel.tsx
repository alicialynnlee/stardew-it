'use client';

import * as Styled from './CalendarPanel.styled';
import { Badge, Flex, IconButton, Select, Text } from '@radix-ui/themes';
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

  // Calculate the season's calendar events
  const viewingSeasonCalendarEvents = useMemo(() => {
    if (!selectedDay || !calendarEvents || calendarEvents.size === 0) {
      return [];
    }

    const selectedDayNumber = parseInt(selectedDay.split(' ')[1]);

    // Flatten all calendar events and filter the ones of the season
    const filteredEvents: CalendarEventWithTasks[] = [];
    const seasonsEvents: Array<Array<CalendarEventWithTasks> | null> =
      calendarEvents.get(SEASONS[viewingSeasonIndex]) ?? [];
    seasonsEvents.forEach((dayEvents) => {
      if (dayEvents) {
        filteredEvents.push(...dayEvents);
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
        <Styled.PanelCard>
          <Text size="2" weight="bold" as="div">
            Today's Events
          </Text>
        </Styled.PanelCard>
        <Styled.ScrollablePanelCard>
          <Text size="2" weight="bold" as="div">
            {SEASONS[viewingSeasonIndex]} Events
          </Text>
          {viewingSeasonCalendarEvents.length > 0 ? (
            <Styled.ScrollableContent>
              {viewingSeasonCalendarEvents.map(
                (event: CalendarEventWithTasks) => {
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
                          {event.name}
                        </Text>

                        {getCompletionBadge(event)}
                      </Flex>
                      <Flex direction={'row'} gap={'1'}>
                        <Badge variant="soft">{event.date}</Badge>
                      </Flex>
                    </Styled.EventCard>
                  );
                }
              )}
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
