'use client';

import type { CalendarEvent } from '@prisma/client';
import { useCalendarEvents } from '@/hooks/useCalendarEvents';
import * as Styled from './Calendar.styled';
import {
  Box,
  Card,
  Flex,
  Grid,
  IconButton,
  Spinner,
  Text,
} from '@radix-ui/themes';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { DAYS, DAYS_OF_WEEK, MONTHS } from '@/constants/calendar';
import { Day } from '@/types/calendar';
import { FarmTaskCompletion } from '@/types/tasks';

export default function Calendar({
  selectedMonth,
  selectedDay,
  changeSelectedDay,
  changeSelectedMonth,
  farmTaskCompletion,
}: {
  selectedMonth: number;
  selectedDay: Day | null;
  changeSelectedDay: (day: Day | null) => void;
  changeSelectedMonth: (monthIndex: number) => void;
  farmTaskCompletion?: FarmTaskCompletion;
}) {
  const { calendarEvents, isLoading, error } = useCalendarEvents();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const getTaskForDate = (
    month: string,
    day: number
  ): Array<CalendarEvent> | null => {
    const monthArray = calendarEvents.get(month);
    const dayArray = monthArray?.[day];
    if (!dayArray) {
      return null;
    }
    return dayArray.filter((day) => !farmTaskCompletion?.get(day.taskId));
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
          const tasks = getTaskForDate(MONTHS[selectedMonth], day);
          const monthTasks =
            day === 28 ? getTaskForDate(MONTHS[selectedMonth], 29) : null;
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
              {tasks &&
                tasks.map((t) => (
                  <Styled.TaskLabel key={t.id}>{t.name}</Styled.TaskLabel>
                ))}
              {monthTasks?.map((t) => (
                <Styled.TaskLabel key={t.id} $isMonthTask>
                  {t.name}
                </Styled.TaskLabel>
              ))}
            </Styled.DayBox>
          );
        })}
      </Styled.DaysGrid>
    </Styled.CalendarWrapper>
  );
}
