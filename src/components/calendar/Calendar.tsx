'use client';

import * as Styled from './Calendar.styled';
import { IconButton, Text } from '@radix-ui/themes';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { DAYS, DAYS_OF_WEEK, MONTHS } from '@/constants/calendar';
import {
  Day,
  CalendarEventWithTasks,
  CalendarEventData,
} from '@/types/calendar';
import { FarmTaskCompletion } from '@/types/tasks';

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
  selectedMonth,
  selectedDay,
  changeSelectedDay,
  changeSelectedMonth,
  farmTaskCompletion,
  selectedEvent,
  changeSelectedEvent,
  calendarEvents,
}: {
  selectedMonth: number;
  selectedDay: Day | null;
  changeSelectedDay: (day: Day | null) => void;
  changeSelectedMonth: (monthIndex: number) => void;
  farmTaskCompletion?: FarmTaskCompletion;
  selectedEvent: CalendarEventWithTasks | null;
  changeSelectedEvent: (event: CalendarEventWithTasks | null) => void;
  calendarEvents?: CalendarEventData;
}) {
  const getCalendarEventsForDate = (
    month: string,
    day: number
  ): Array<CalendarEventWithTasks> | null => {
    const monthArray = calendarEvents?.get(month);
    const dayArray = monthArray?.[day];
    if (!dayArray) {
      return null;
    }
    return dayArray;
  };

  const renderEventLabel = (
    ce: CalendarEventWithTasks
  ) => {
    const { allDone, hasSome, completed, total } = getEventCompletion(
      ce,
      farmTaskCompletion
    );
    
    // Get the task type from the first task in the event (they should all be the same type)
    const taskType = ce.tasks && ce.tasks.length > 0 ? ce.tasks[0].type : 'other';

    return (
      <Styled.TaskLabel
        key={ce.id}
        $taskType={taskType}
        $isCompleted={allDone}
        $isPartial={hasSome}
        onClick={() => changeSelectedEvent(selectedEvent ? null : ce)}
      >
        {ce.name}{' '}
        {ce.name === 'Plant' &&
          (ce.tasks && ce.tasks.length > 1
            ? `(${ce.tasks.length})`
            : ce.tasks[0]?.name)}
        {ce.name === 'Forage' &&
          (ce.tasks && ce.tasks.length > 1
            ? `(${ce.tasks.length})`
            : ce.tasks[0]?.name)}
        {farmTaskCompletion && total > 0 && !allDone && hasSome && (
          <>
            {' '}
            ({completed}/{total})
          </>
        )}
      </Styled.TaskLabel>
    );
  };

  return (
    <Styled.CalendarWrapper>
      <Styled.MonthHeader>
        <IconButton
          title={MONTHS[selectedMonth - 1]}
          size="1"
          color="gray"
          variant="surface"
          highContrast
          className={selectedMonth > 0 ? '' : 'hide'}
          onClick={() => changeSelectedMonth(selectedMonth - 1)}
        >
          <ChevronLeftIcon width="20" height="20" />
        </IconButton>
        <Text size="4" weight="bold">
          {MONTHS[selectedMonth]}
        </Text>
        <IconButton
          title={MONTHS[selectedMonth + 1]}
          size="1"
          color="gray"
          variant="surface"
          highContrast
          className={selectedMonth + 1 < MONTHS.length ? '' : `hide`}
          onClick={() => changeSelectedMonth(selectedMonth + 1)}
        >
          <ChevronRightIcon width="20" height="20" />
        </IconButton>
      </Styled.MonthHeader>
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
          const calEvents = getCalendarEventsForDate(
            MONTHS[selectedMonth],
            day
          );
          const monthEvents =
            day === 28
              ? getCalendarEventsForDate(MONTHS[selectedMonth], 29)
              : null;
          return (
            <Styled.DayBox key={day}>
              <Styled.DayIndex
                onClick={() =>
                  changeSelectedDay(`${MONTHS[selectedMonth]} ${day}`)
                }
                $isSelected={`${MONTHS[selectedMonth]} ${day}` === selectedDay}
              >
                {day}
              </Styled.DayIndex>
              {calEvents?.map((ce) => renderEventLabel(ce))}
              {monthEvents?.map((ce) => renderEventLabel(ce))}
            </Styled.DayBox>
          );
        })}
      </Styled.DaysGrid>
    </Styled.CalendarWrapper>
  );
}
