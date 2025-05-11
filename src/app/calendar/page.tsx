'use client';

import { Calendar } from '@/components';
import { useState } from 'react';
import { Flex, IconButton, Text } from '@radix-ui/themes';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

const months: Array<string> = ['Spring', 'Summer', 'Fall', 'Winter'];

export default function CalendarPage() {
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(0);
  const [selectedDay, setSelectedDay] = useState(1);

  return (
    <div>
      <Flex justify="center" align="center" gap="3">
        {selectedMonthIndex > 0 && (
          <IconButton
            title={months[selectedMonthIndex - 1]}
            variant="ghost"
            onClick={() => setSelectedMonthIndex(selectedMonthIndex - 1)}
          >
            <ChevronLeftIcon width="20" height="20" />
          </IconButton>
        )}
        <Text size="4" weight="bold">
          {months[selectedMonthIndex]}
        </Text>
        {selectedMonthIndex + 1 < months.length && (
          <IconButton
            title={months[selectedMonthIndex + 1]}
            variant="ghost"
            onClick={() => setSelectedMonthIndex(selectedMonthIndex + 1)}
          >
            <ChevronRightIcon width="20" height="20" />
          </IconButton>
        )}
      </Flex>
      <Calendar
        selectedMonth={months[selectedMonthIndex] || ''}
        selectedDay={selectedDay}
        changeSelectedDay={(dayIndex) => setSelectedDay(dayIndex)}
      />
    </div>
  );
}
