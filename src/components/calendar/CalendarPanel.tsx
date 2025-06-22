'use client';

import type { CalendarEvent } from '@prisma/client';
import { useCalendarEvents } from '@/hooks/useCalendarEvents';
import * as Styled from './CalendarPanel.styled';
import { Card, Flex, IconButton, Select, Text } from '@radix-ui/themes';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import { DAYS, MONTHS } from '@/constants/calendar';
import { Day } from '@/types/calendar';
import { FarmTaskCompletion } from '@/types/tasks';
import { useState, useMemo } from 'react';

export default function CalendarPanel({
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
  const [isOpen, setIsOpen] = useState(true);
  const { calendarEvents, isLoading, error } = useCalendarEvents();

  // Calculate upcoming calendar events based on selected month and day
  const upcomingCalendarEvents = useMemo(() => {
    if (!selectedDay || !calendarEvents || calendarEvents.size === 0) {
      return [];
    }

    const selectedDayNumber = parseInt(selectedDay.split(' ')[1]);

    // Flatten all calendar events and filter for upcoming ones
    const filteredEvents: CalendarEvent[] = [];
    const filteredMonths = MONTHS.slice(selectedMonth);
    calendarEvents.forEach((monthEvents, monthName) => {
      if (filteredMonths.includes(monthName)) {
        const filteredDays = monthEvents.slice(selectedDayNumber);
        filteredDays.forEach((dayEvents) => {
          if (dayEvents) {
            filteredEvents.push(...dayEvents);
          }
        });
      }
    });

    return filteredEvents;
  }, [selectedDay, selectedMonth, calendarEvents]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
          <Text size="2" weight="bold">
            Select Day
          </Text>
          <Flex direction="row" gap="1" pt="2">
            <Select.Root
              size="1"
              defaultValue={selectedMonth.toString()}
              onValueChange={(value) => {
                const newMonth = MONTHS[Number(value)];
                const currentDay = parseInt(selectedDay?.split(' ')[1] ?? '1');
                changeSelectedDay(`${newMonth} ${currentDay}`);
                changeSelectedMonth(Number(value));
              }}
            >
              <Select.Trigger />
              <Select.Content position="popper">
                {MONTHS.map((month, index) => (
                  <Select.Item key={month} value={index.toString()}>
                    {month}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
            <Select.Root
              size="1"
              defaultValue={selectedDay?.split(' ')[1]?.toString() ?? '1'}
              onValueChange={(value) =>
                changeSelectedDay(`${MONTHS[selectedMonth]} ${Number(value)}`)
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
        </Styled.PanelCard>
        <Styled.ScrollablePanelCard>
          <Text size="2" weight="bold" as="div">
            Upcoming Events
          </Text>
          {upcomingCalendarEvents.length > 0 ? (
            <Styled.ScrollableContent>
              {upcomingCalendarEvents.map((event) => (
                <Card key={event.id} size="1" mt="2">
                  <Text size="2" weight="medium" as="div">
                    {event.date}: {event.name}
                  </Text>
                  {event.description && (
                    <Text size="1" color="gray" as="p">
                      {event.description}
                    </Text>
                  )}
                </Card>
              ))}
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
