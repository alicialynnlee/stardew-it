'use client';

import * as Styled from './CalendarPanel.styled';
import { Badge, Card, Flex, IconButton, Select, Text } from '@radix-ui/themes';
import { CheckIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { DAYS, SEASONS } from '@/constants/calendar';
import {
  CalendarEventData,
  CalendarEventWithTasks,
  Day,
  Season,
} from '@/types/calendar';
import { FarmTaskCompletion } from '@/types/tasks';
import { useState, useMemo } from 'react';
import { SEASONAL_PALETTES, Season as SeasonStyle } from '@/styles/seasonal';
import { TASK_TYPE_PALETTE } from '@/styles/tasks';
import { TaskType } from '@/constants/taskTypes';

export default function CalendarPanel({
  viewingSeasonIndex,
  viewingDay,
  selectedDay,
  changeSelectedEvent,
  farmTaskCompletion,
  calendarEvents,
}: {
  viewingSeasonIndex: number;
  viewingDay: Day;
  selectedDay: Day | null;
  changeSelectedEvent: (event: CalendarEventWithTasks | null) => void;
  farmTaskCompletion?: FarmTaskCompletion;
  calendarEvents?: CalendarEventData;
}) {
  const [isOpen, setIsOpen] = useState(true);

  // Get viewing day's calendar events
  const viewingDayCalendarEvents = useMemo(() => {
    if (!viewingDay || !calendarEvents) {
      return [];
    }
    return calendarEvents.daily.get(viewingDay);
  }, [viewingDay, calendarEvents]);

  // Calculate the season's calendar events
  const viewingSeasonCalendarEvents = useMemo(() => {
    if (!selectedDay || !calendarEvents) {
      return [];
    }

    const currentSeason = SEASONS[viewingSeasonIndex] as Season;
    const filteredEvents: CalendarEventWithTasks[] = [];

    // Daily events for this season
    DAYS.forEach((day) => {
      const dayKey = `${currentSeason} ${day}` as Day;
      const dayEvents = calendarEvents.daily.get(dayKey);
      if (dayEvents) {
        filteredEvents.push(...dayEvents);
      }
    });

    // Season-wide events
    const seasonalEvents = calendarEvents.seasonal.get(currentSeason);
    if (seasonalEvents) {
      filteredEvents.push(...seasonalEvents);
    }

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

  const renderEventCard = (event: CalendarEventWithTasks) => {
    const allDone =
      farmTaskCompletion &&
      event.tasks.length > 0 &&
      event.tasks.every((t) => farmTaskCompletion.get(t.id));

    const eventSeason = (event.date.split(' ')[0].toLowerCase() ??
      'spring') as SeasonStyle;
    const eventSeasonalPalette = SEASONAL_PALETTES[eventSeason];

    return (
      <Styled.EventCard
        key={event.id}
        size="1"
        mt="2"
        onClick={() => changeSelectedEvent(event)}
        $isCompleted={!!allDone}
      >
        <Flex justify="between" align="center">
          <Flex direction="column" gap="2">
            <Text size="2" weight="medium" as="div">
              {event.name}
            </Text>
            {event.description && (
              <Text size="1" weight={'light'}>
                {event.description}
              </Text>
            )}
            <Flex direction="row" gap="1">
              <Badge
                style={{
                  backgroundColor: eventSeasonalPalette.radixAccent.a3,
                  color: eventSeasonalPalette.radixAccent.a11,
                }}
              >
                {event.date}
              </Badge>
              <Badge
                style={{
                  backgroundColor:
                    TASK_TYPE_PALETTE[(event.type as TaskType) ?? 'other'].base,
                  color:
                    TASK_TYPE_PALETTE[(event.type as TaskType) ?? 'other'].text,
                }}
              >
                {event.type}
              </Badge>
            </Flex>
          </Flex>

          {getCompletionBadge(event)}
        </Flex>
      </Styled.EventCard>
    );
  };

  return (
    <Styled.PanelWrapper $isOpen={isOpen}>
      <IconButton
        variant="ghost"
        className="panel-toggle"
        highContrast
        onClick={() => setIsOpen(!isOpen)}
        style={{ marginBottom: '8px' }}
      >
        <ChevronRightIcon />
      </IconButton>
      <Styled.PanelContent $isOpen={isOpen} gap="4" direction="column">
        <Card>
          <Text size="2" weight="bold" as="div">
            {viewingDay === selectedDay ? `Today's` : viewingDay} Events
          </Text>
          {viewingDayCalendarEvents && viewingDayCalendarEvents.length > 0 ? (
            viewingDayCalendarEvents?.map((event: CalendarEventWithTasks) =>
              renderEventCard(event)
            )
          ) : (
            <Text size="1" weight="light">
              No tasks scheduled
              <br />
              Enjoy your free day on the farm! 🌱
            </Text>
          )}
        </Card>
        <Styled.ScrollablePanelCard>
          <Text size="2" weight="bold" as="div">
            {SEASONS[viewingSeasonIndex]} Events
          </Text>
          {viewingSeasonCalendarEvents.length > 0 ? (
            <Styled.ScrollableContent>
              {viewingSeasonCalendarEvents.map(
                (event: CalendarEventWithTasks) => renderEventCard(event)
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
