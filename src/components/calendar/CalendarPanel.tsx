'use client';

import { Flex, Text } from '@radix-ui/themes';
import {
  DAYS,
  SEASONS_CONFIG,
  SEASONS_LIST,
  SeasonType,
} from '@/constants/calendar';
import {
  CalendarEventData,
  CalendarEventWithTasks,
  Day,
  Season,
} from '@/types/calendar';
import { FarmTaskCompletion } from '@/types/tasks';
import { useMemo } from 'react';
import { TASK_CONFIG, TaskType } from '@/constants/taskTypes';
import { Card, Badge } from '@/components';
import {
  ashGray,
  mainWhite,
  pumpkinRust,
  sage10,
  sageDark,
} from '@/styles/colors';
import { PiCheckCircleLight } from 'react-icons/pi';
import styled from 'styled-components';

const ScrollablePanelCard = styled(Card)`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const EventCard = styled(Card)<{ $isCompleted?: boolean }>`
  ${({ $isCompleted }) =>
    $isCompleted &&
    `
    opacity: 0.5;
    background-color: ${mainWhite};
  `}
`;

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

    const currentSeason = SEASONS_LIST[viewingSeasonIndex] as Season;
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
        <PiCheckCircleLight
          size="30px"
          color="green"
          style={{ display: 'inline', verticalAlign: 'middle', opacity: '1' }}
        />
      );
    }
    if (completed > 0) {
      return (
        <Text size="1" color="gray" style={{ zIndex: '1' }}>
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

    const eventSeason = (event.date.split(' ')[0] ?? 'Spring') as SeasonType;

    return (
      <EventCard
        variant="flat"
        padding="sm"
        key={event.id}
        onClick={() => changeSelectedEvent(event)}
        $isCompleted={!!allDone}
      >
        <Flex justify="between" align="center">
          <Flex direction="column" gap="2">
            <Text
              size="2"
              weight="bold"
              style={{
                color: sageDark,
                textDecoration: `${allDone ? 'line-through' : 'none'}`,
              }}
            >
              {event.name}
            </Text>
            {event.description && (
              <Text size="1" style={{ color: sageDark }}>
                {event.description}
              </Text>
            )}
            <Flex direction="row" gap="1">
              <Badge
                variant={allDone ? 'secondary' : 'primary'}
                color={
                  allDone
                    ? ashGray
                    : SEASONS_CONFIG[eventSeason].backgroundColor
                }
                style={{
                  borderColor: `${allDone ? 'transparent' : SEASONS_CONFIG[eventSeason].primaryColor}`,
                  color: `${allDone ? ashGray : SEASONS_CONFIG[eventSeason].primaryColor}`,
                }}
              >
                {event.date}
              </Badge>
              <Badge
                variant="tertiary"
                color={
                  allDone
                    ? ashGray
                    : TASK_CONFIG[(event.type as TaskType) ?? 'other'].color
                }
              >
                {event.type.toUpperCase()}
              </Badge>
            </Flex>
          </Flex>
          {getCompletionBadge(event)}
        </Flex>
      </EventCard>
    );
  };

  return (
    <Flex direction="column" gap="4">
      {/* Viewing Day Events */}
      <Card variant="outline" color={`${pumpkinRust}4D`}>
        <Text size="4" weight="bold" style={{ color: sageDark }}>
          {viewingDay === selectedDay ? `Today's` : viewingDay} Events
        </Text>
        <Flex direction="column" gap="2">
          {viewingDayCalendarEvents && viewingDayCalendarEvents.length > 0 ? (
            <Flex direction="column" gap="2" mt="2">
              {viewingDayCalendarEvents?.map((event: CalendarEventWithTasks) =>
                renderEventCard(event)
              )}
            </Flex>
          ) : (
            <Text size="1">
              No tasks scheduled
              <br />
              Enjoy your free day on the farm! 🌱
            </Text>
          )}
        </Flex>
      </Card>

      {/* Seasonal Events */}
      <ScrollablePanelCard variant="outline" color={sage10}>
        <Text size="4" weight="bold" style={{ color: sageDark }}>
          {SEASONS_LIST[viewingSeasonIndex]} Events
        </Text>
        {viewingSeasonCalendarEvents.length > 0 ? (
          <ScrollableContent>
            <Flex direction="column" gap="2" mt="2">
              {viewingSeasonCalendarEvents.map(
                (event: CalendarEventWithTasks) => renderEventCard(event)
              )}
            </Flex>
          </ScrollableContent>
        ) : (
          <Text size="2" color="gray" mt="2">
            No upcoming tasks
          </Text>
        )}
      </ScrollablePanelCard>
    </Flex>
  );
}
