'use client';

import type { CalendarEvent } from '@prisma/client';
import { useCalendarEvents } from '@/hooks/useCalendarEvents';
import * as Styled from './Calendar.styled';
import { Box, Button, Card, Grid, Text } from '@radix-ui/themes';

export default function Calendar({
  selectedMonth,
  selectedDay,
  changeSelectedDay,
}: {
  selectedMonth: string;
  selectedDay: number;
  changeSelectedDay: (dayIndex: number) => {};
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
    return dayArray;
  };

  return (
    <Styled.CalendarWrapper>
      <Grid columns="7" rows="1">
        {Array.from([
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday  ',
        ]).map((day) => {
          return (
            <Text key={day} size="1" weight="medium">
              {day}
            </Text>
          );
        })}
      </Grid>
      <Grid columns="7" rows="4" style={{ border: '0.1px solid' }}>
        {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => {
          const tasks = getTaskForDate(selectedMonth, day);
          return (
            <Box key={day} style={{ border: '0.1px solid' }}>
              <Styled.DayIndex
                onClick={() => changeSelectedDay(day)}
                $isSelected={day === selectedDay}
              >
                {day}
              </Styled.DayIndex>
              {tasks &&
                tasks.map((t) => (
                  <Styled.TaskLabel key={t.id}>{t.name}</Styled.TaskLabel>
                ))}
              {day === 28 &&
                getTaskForDate(selectedMonth, 29)?.map((t) => (
                  <Styled.TaskLabel key={t.id} $isMonthTask>
                    {`${t.name}`}
                  </Styled.TaskLabel>
                ))}
            </Box>
          );
        })}
      </Grid>
    </Styled.CalendarWrapper>
  );
}
