'use client';

import {
  Button,
  Flex,
  IconButton,
  Text,
  Popover,
  Select,
} from '@radix-ui/themes';
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TriangleRightIcon,
} from '@radix-ui/react-icons';
import { DAYS, DAYS_OF_WEEK, SEASONS } from '@/constants/calendar';
import {
  Day,
  CalendarEventWithTasks,
  CalendarEventData,
} from '@/types/calendar';
import { FarmTaskCompletion } from '@/types/tasks';
import { useState, useMemo } from 'react';
import { TaskType, TASK_TYPE_LIST } from '@/constants/taskTypes';
import { TaskLabel } from '@/components';
import * as Styled from './Calendar.styled';

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
    useState(false);
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
    /*
    TODO: partial designs?
    $isPartial={hasSome}
    */
    return (
      <TaskLabel
        key={ce.id}
        text={`${ce.name} ${farmTaskCompletion && total > 0 && !allDone && hasSome ? `(${completed}/${total})` : ''}`}
        type={taskType}
        isCompleted={allDone}
        onClickHandler={() => changeSelectedEvent(selectedEvent ? null : ce)}
      />
    );
  };

  return (
    <Styled.CalendarWrapper>
      <Styled.SeasonHeader>
        <Text size="4" weight="bold">
          {SEASONS[viewingSeasonIndex]}
        </Text>
        <Flex gap={'2'} align={'center'}>
          <Popover.Root>
            <Popover.Trigger>
              <Button variant="soft">
                {selectedDay}
                <CalendarIcon />
              </Button>
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
                    changeViewingSeasonIndex(SEASONS.indexOf(newSeason) ?? 0);
                  }}
                >
                  <Select.Trigger />
                  <Select.Content position="popper">
                    {SEASONS.map((season) => (
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
                      `${SEASONS[viewingSeasonIndex]} ${Number(value)}`
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
          <IconButton
            title={SEASONS[viewingSeasonIndex - 1]}
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
            title={SEASONS[viewingSeasonIndex + 1]}
            size="1"
            color="gray"
            variant="surface"
            highContrast
            disabled={viewingSeasonIndex + 1 >= SEASONS.length}
            onClick={() => changeViewingSeasonIndex(viewingSeasonIndex + 1)}
          >
            <ChevronRightIcon width="20" height="20" />
          </IconButton>
        </Flex>
      </Styled.SeasonHeader>
      <Styled.DayLabelGrid>
        {DAYS_OF_WEEK.map((day) => {
          return (
            <Text key={day} size="1" weight="medium">
              {day}
            </Text>
          );
        })}
      </Styled.DayLabelGrid>
      <Styled.DaysGrid>
        {DAYS.map((day) => {
          const calEvents =
            filteredCalendarData?.daily.get(
              `${SEASONS[viewingSeasonIndex]} ${day}` as Day
            ) ?? [];
          return (
            <Styled.DayBox key={day} direction="column" align="start" gap="1">
              <Styled.DayIndex
                onClick={() =>
                  changeViewingDay(
                    `${SEASONS[viewingSeasonIndex]} ${day}` as Day
                  )
                }
                $isSelected={
                  `${SEASONS[viewingSeasonIndex]} ${day}` === selectedDay
                }
                $isViewing={
                  `${SEASONS[viewingSeasonIndex]} ${day}` === viewingDay
                }
              >
                {day}
              </Styled.DayIndex>
              {calEvents?.map((ce) => renderEventLabel(ce))}
            </Styled.DayBox>
          );
        })}
      </Styled.DaysGrid>

      {/* Task Filtering section */}
      <Styled.SectionBar
        $isExpanded={taskSectionExpanded}
        onClick={() => setTaskSectionExpanded(!taskSectionExpanded)}
      >
        <Styled.SectionChevron $isExpanded={taskSectionExpanded}>
          <TriangleRightIcon width="14" height="14" />
        </Styled.SectionChevron>
        <Text size="2" weight="medium">
          Task Filters
        </Text>
        <Styled.CountBadge>{TASK_TYPE_LIST.length}</Styled.CountBadge>
      </Styled.SectionBar>
      <Styled.SectionContent $isExpanded={taskSectionExpanded}>
        {TASK_TYPE_LIST.map((type: TaskType) => (
          <TaskLabel
            key={type}
            type={type}
            text={type}
            isOff={!selectedTaskTypes.has(type)}
            onClickHandler={() => toggleTaskType(type)}
          />
        ))}
      </Styled.SectionContent>
      {/* Anytime in Year section */}
      {filteredCalendarData && filteredCalendarData.yearRound?.length > 0 && (
        <>
          <Styled.SectionBar
            $isExpanded={yearRoundSectionExpanded}
            onClick={() =>
              setYearRoundSectionExpanded(!yearRoundSectionExpanded)
            }
          >
            <Styled.SectionChevron $isExpanded={yearRoundSectionExpanded}>
              <TriangleRightIcon width="14" height="14" />
            </Styled.SectionChevron>
            <Text size="2" weight="medium">
              Anytime in Year
            </Text>
            <Styled.CountBadge>
              {filteredCalendarData.yearRound.length}
            </Styled.CountBadge>
          </Styled.SectionBar>
          <Styled.SectionContent $isExpanded={yearRoundSectionExpanded}>
            {filteredCalendarData.yearRound.map((ce) => renderEventLabel(ce))}
          </Styled.SectionContent>
        </>
      )}
    </Styled.CalendarWrapper>
  );
}
