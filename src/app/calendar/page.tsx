'use client';

import { Calendar } from '@/components';
import { Day } from '@/types/calendar';
import { useState } from 'react';

export default function CalendarPage() {
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(0);
  const [selectedDay, setSelectedDay] = useState<Day | null>(null);

  return (
    <div>
      <Calendar
        selectedMonth={selectedMonthIndex}
        selectedDay={selectedDay}
        changeSelectedDay={(dayIndex) => setSelectedDay(dayIndex)}
        changeSelectedMonth={(monthIndex) => setSelectedMonthIndex(monthIndex)}
      />
    </div>
  );
}
