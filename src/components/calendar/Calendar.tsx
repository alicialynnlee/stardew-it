'use client';

import {
  Flex,
  IconButton,
  Text,
  Popover,
  Select,
  Grid,
} from '@radix-ui/themes';
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TriangleRightIcon,
} from '@radix-ui/react-icons';
import { DAYS, DAYS_OF_WEEK, SEASONS_LIST } from '@/constants/calendar';
import {
  Day,
  CalendarEventWithTasks,
  CalendarEventData,
} from '@/types/calendar';
import { FarmTaskCompletion } from '@/types/tasks';
import { useState, useMemo } from 'react';
import { TaskType, TASK_TYPE_LIST, TASK_CONFIG } from '@/constants/taskTypes';
import { Card, Button as ButtonUI, Badge } from '@/components';
import styled from 'styled-components';
import {
  ashGray,
  mainWhite,
  pumpkinOrange,
  sage10,
  sageDark,
  sageGreen,
  sageMist,
} from '@/styles/colors';

const CardWrapper = styled(Card)`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const CalendarWrapper = styled(CardWrapper)`
  flex: 1;
`;

const TaskBar = styled(Flex)<{ $isExpanded?: boolean }>`
  cursor: pointer;
  user-select: none;
  flex-shrink: 0;
  color: ${sageDark};
  opacity: 60%;
`;

const Chevron = styled.span<{ $isExpanded?: boolean }>`
  display: inline-flex;
  align-items: center;
  transition: transform 0.2s ease;
  transform: ${({ $isExpanded }) =>
    $isExpanded ? 'rotate(90deg)' : 'rotate(0deg)'};
  font-size: 0.8rem;
  color: var(--gray-9);
`;

const ExpandedContent = styled.div<{ $isExpanded?: boolean }>`
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  padding: ${({ $isExpanded }) => ($isExpanded ? '0.5rem 1rem' : '0')};
  max-height: ${({ $isExpanded }) => !$isExpanded && '0'};
  overflow: ${({ $isExpanded }) => !$isExpanded && 'hidden'};
  transition:
    max-height 0.3s ease,
    padding 0.3s ease;
`;

const DaysGrid = styled(Grid)`
  gap: 1px;
  background-color: ${sage10};
  height: 100%;
`;

const DayBox = styled(Flex)<{ $isSelected?: boolean; $isViewing?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  padding: 1rem;
  background-color: ${({ $isSelected }) =>
    $isSelected ? 'transparent' : mainWhite};
  border: ${({ $isSelected, $isViewing }) =>
    $isViewing
      ? `1px solid ${pumpkinOrange}80`
      : $isSelected
        ? `1px solid ${sageDark}0D`
        : `1px solid ${mainWhite}`};
  overflow-y: auto;
  cursor: pointer;
  min-height: 100px;
`;

function getEventCompletion(
  event: CalendarEventWithTasks,
  farmTaskCompletion?: FarmTaskCompletion
) {
  if (!farmTaskCompletion || event.tasks.length === 0) {
    return { completed: 0, total: 0, allDone: false, hasSome: false };
  }
  const completed = event.tasks.filter((t) =>
    farmTaskCompletion.get(t.id)
  ).length;
  const total = event.tasks.length;
  return {
    completed,
    total,
    allDone: completed === total,
    hasSome: completed > 0 && completed < total,
  };
}

export default function Calendar({
  viewingSeasonIndex,
  selectedDay,
  changeSelectedDay,
  changeViewingSeasonIndex,
  farmTaskCompletion,
  selectedEvent,
  changeSelectedEvent,
  calendarEvents,
  viewingDay,
  changeViewingDay,
}: {
  viewingSeasonIndex: number;
  selectedDay: Day | null;
  changeSelectedDay: (day: Day) => void;
  changeViewingSeasonIndex: (seasonIndex: number) => void;
  farmTaskCompletion?: FarmTaskCompletion;
  selectedEvent: CalendarEventWithTasks | null;
  changeSelectedEvent: (event: CalendarEventWithTasks | null) => void;
  calendarEvents?: CalendarEventData;
  viewingDay: Day;
  changeViewingDay: (newDay: Day) => void;
}) {
  const [taskSectionExpanded, setTaskSectionExpanded] = useState(true);
  const [yearRoundSectionExpanded, setYearRoundSectionExpanded] =
    useState(true);
  const [selectedTaskTypes, setSelectedTaskTypes] = useState<Set<TaskType>>(
    new Set(TASK_TYPE_LIST)
  );

  const toggleTaskType = (type: TaskType) => {
    setSelectedTaskTypes((prev: Set<TaskType>) => {
      const newTaskTypes = new Set(prev);

      if (newTaskTypes.has(type)) {
        newTaskTypes.delete(type);
      } else {
        newTaskTypes.add(type);
      }

      return newTaskTypes;
    });
  };

  // filtered calendar data
  function filterCalendarData(
    data: CalendarEventData,
    selected: Set<TaskType>
  ): CalendarEventData {
    if (selected.size === 0) return data;

    const filterList = (events: CalendarEventWithTasks[]) =>
      events.filter((event: CalendarEventWithTasks) =>
        selected.has((event.type as TaskType) ?? 'other')
      );

    return {
      daily: new Map(
        Array.from(data.daily.entries()).map(([day, events]) => [
          day,
          filterList(events),
        ])
      ),
      seasonal: new Map(
        Array.from(data.seasonal.entries()).map(([season, events]) => [
          season,
          filterList(events),
        ])
      ),
      yearRound: filterList(data.yearRound),
    };
  }
  const filteredCalendarData = useMemo(
    () =>
      calendarEvents
        ? filterCalendarData(calendarEvents, selectedTaskTypes)
        : calendarEvents,
    [calendarEvents, selectedTaskTypes]
  );

  const renderEventLabel = (ce: CalendarEventWithTasks) => {
    const { allDone, hasSome, completed, total } = getEventCompletion(
      ce,
      farmTaskCompletion
    );

    const taskType = (ce.type as TaskType) ?? 'other';
    return (
      <Badge
        key={ce.id}
        variant="secondary"
        color={allDone ? ashGray : TASK_CONFIG[taskType].color}
        onClick={(e) => {
          e.stopPropagation();
          changeSelectedEvent(selectedEvent ? null : ce);
        }}
        style={{
          textDecoration: `${allDone ? 'line-through' : 'none'}`,
          opacity: `${allDone ? '0.5' : '1'}`,
        }}
      >
        {`${ce.name} ${farmTaskCompletion && total > 0 && !allDone && hasSome ? `(${completed}/${total})` : ''}`}
      </Badge>
    );
  };

  return (
    <Flex direction="column" gap="4">
      {/* Season Header */}
      <CardWrapper variant="outline" color={sage10}>
        <Flex direction="row" gap="1" justify="between" align="center">
          <Text size="4" weight="bold" style={{ color: sageDark }}>
            {SEASONS_LIST[viewingSeasonIndex]}
          </Text>
          <Flex gap="2" align="center">
            {/* Day selector */}
            <Popover.Root>
              <Popover.Trigger>
                <ButtonUI size="sm" color={sageMist} textColor={sageDark}>
                  {selectedDay}
                  <CalendarIcon />
                </ButtonUI>
              </Popover.Trigger>
              <Popover.Content size="2" maxWidth="400px">
                <Text as="p" trim="both" size="2">
                  Select Day
                </Text>
                <Flex direction="row" gap="1" pt="2">
                  <Select.Root
                    size="1"
                    value={selectedDay?.split(' ')[0]?.toString() ?? 'Spring'}
                    onValueChange={(newSeason) => {
                      const currentDay = parseInt(
                        selectedDay?.split(' ')[1] ?? '1'
                      );
                      changeSelectedDay(`${newSeason} ${currentDay}` as Day);
                      changeViewingSeasonIndex(
                        SEASONS_LIST.indexOf(newSeason) ?? 0
                      );
                    }}
                  >
                    <Select.Trigger />
                    <Select.Content position="popper">
                      {SEASONS_LIST.map((season) => (
                        <Select.Item key={season} value={season}>
                          {season}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                  <Select.Root
                    size="1"
                    value={selectedDay?.split(' ')[1]?.toString() ?? '1'}
                    onValueChange={(value) =>
                      changeSelectedDay(
                        `${SEASONS_LIST[viewingSeasonIndex]} ${Number(value)}`
                      )
                    }
                  >
                    <Select.Trigger />
                    <Select.Content position="popper">
                      {DAYS.map((day) => (
                        <Select.Item key={day} value={day.toString()}>
                          {day}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                </Flex>
              </Popover.Content>
            </Popover.Root>

            {/* Month Nav */}
            <IconButton
              title={SEASONS_LIST[viewingSeasonIndex - 1]}
              size="1"
              color="gray"
              variant="surface"
              highContrast
              disabled={viewingSeasonIndex < 1}
              onClick={() => changeViewingSeasonIndex(viewingSeasonIndex - 1)}
            >
              <ChevronLeftIcon width="20" height="20" />
            </IconButton>
            <IconButton
              title={SEASONS_LIST[viewingSeasonIndex + 1]}
              size="1"
              color="gray"
              variant="surface"
              highContrast
              disabled={viewingSeasonIndex + 1 >= SEASONS_LIST.length}
              onClick={() => changeViewingSeasonIndex(viewingSeasonIndex + 1)}
            >
              <ChevronRightIcon width="20" height="20" />
            </IconButton>
          </Flex>
        </Flex>
      </CardWrapper>

      {/* Task Filtering section */}
      <CardWrapper variant="outline" color={sage10} padding="sm">
        <TaskBar
          direction="row"
          align="center"
          gap="1"
          $isExpanded={taskSectionExpanded}
          onClick={() => setTaskSectionExpanded(!taskSectionExpanded)}
        >
          <Chevron $isExpanded={taskSectionExpanded}>
            <TriangleRightIcon width="14" height="14" />
          </Chevron>
          <Text size="2" weight="medium">
            {'Filter Tasks'.toUpperCase()}
          </Text>
        </TaskBar>
        <ExpandedContent $isExpanded={taskSectionExpanded}>
          {TASK_TYPE_LIST.map((type: TaskType) => (
            // TODO: Fix styles for the badges
            <Badge
              key={type}
              variant={selectedTaskTypes.has(type) ? 'primary' : 'secondary'}
              color={
                selectedTaskTypes.has(type)
                  ? TASK_CONFIG[type].color
                  : '#64748B'
              }
              onClick={() => toggleTaskType(type)}
            >
              {type.toUpperCase()}
            </Badge>
          ))}
        </ExpandedContent>
      </CardWrapper>

      {/* Calendar Grid section */}
      <CalendarWrapper variant="outline" color={sage10} padding="none">
        <Grid
          columns="7"
          rows="1"
          py="4"
          style={{
            backgroundColor: sage10,
          }}
        >
          {DAYS_OF_WEEK.map((day) => {
            return (
              <Text
                key={day}
                size="1"
                weight="bold"
                align="center"
                m="auto"
                style={{ color: sageDark }}
              >
                {day.toUpperCase()}
              </Text>
            );
          })}
        </Grid>
        <DaysGrid columns="7" rows="4">
          {DAYS.map((day) => {
            const calEvents =
              filteredCalendarData?.daily.get(
                `${SEASONS_LIST[viewingSeasonIndex]} ${day}` as Day
              ) ?? [];
            const isSelected =
              `${SEASONS_LIST[viewingSeasonIndex]} ${day}` === selectedDay;
            return (
              <DayBox
                key={day}
                onClick={() =>
                  changeViewingDay(
                    `${SEASONS_LIST[viewingSeasonIndex]} ${day}` as Day
                  )
                }
                $isSelected={isSelected}
                $isViewing={
                  `${SEASONS_LIST[viewingSeasonIndex]} ${day}` === viewingDay
                }
              >
                <Text
                  size="2"
                  weight="bold"
                  style={{ color: `${isSelected ? sageDark : sageGreen}` }}
                >
                  {day}
                </Text>
                {isSelected && (
                  <Text weight="bold" size="1" style={{ color: sageDark }}>
                    TODAY
                  </Text>
                )}
                {calEvents?.map((ce) => renderEventLabel(ce))}
              </DayBox>
            );
          })}
        </DaysGrid>
      </CalendarWrapper>

      {/* Anytime in Year section */}
      {filteredCalendarData && filteredCalendarData.yearRound?.length > 0 && (
        <CardWrapper variant="outline" color={sage10} padding="sm">
          <TaskBar
            direction="row"
            align="center"
            gap="1"
            $isExpanded={yearRoundSectionExpanded}
            onClick={() =>
              setYearRoundSectionExpanded(!yearRoundSectionExpanded)
            }
          >
            <Chevron $isExpanded={yearRoundSectionExpanded}>
              <TriangleRightIcon width="14" height="14" />
            </Chevron>
            <Text size="2" weight="medium">
              {'Anytime in Year'.toUpperCase()}
            </Text>
          </TaskBar>
          <ExpandedContent $isExpanded={yearRoundSectionExpanded}>
            {filteredCalendarData.yearRound.map((ce) => renderEventLabel(ce))}
          </ExpandedContent>
        </CardWrapper>
      )}
    </Flex>
  );
}
