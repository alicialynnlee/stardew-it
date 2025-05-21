'use client';

import { Calendar, WarningBanner } from '@/components';
import { useTasks } from '@/hooks/useTasks';
// import { getCurrentUser } from '@/lib/auth';
import { Day } from '@/types/calendar';
import { Box } from '@radix-ui/themes';
import { useState } from 'react';

export default function CalendarClient({
  userId,
  selectedFarmId,
}: {
  userId: string | null;
  selectedFarmId: string | null;
}) {
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(0);
  const [selectedDay, setSelectedDay] = useState<Day | null>('Spring 1');
  const { farmTaskCompletion } = useTasks(selectedFarmId);

  return (
    <div>
      <Box py="3">
        {(!userId || (userId && !selectedFarmId)) && (
          <WarningBanner
            text={
              userId
                ? 'Please select a farm from the navigation bar to track your progress.'
                : 'You must be <Link href="/auth">signed in</Link> and have a farm selected to save your progress.'
            }
          />
        )}
      </Box>
      <Calendar
        farmTaskCompletion={selectedFarmId ? farmTaskCompletion : undefined}
        selectedMonth={selectedMonthIndex}
        selectedDay={selectedDay}
        changeSelectedDay={(dayIndex) => setSelectedDay(dayIndex)}
        changeSelectedMonth={(monthIndex) => setSelectedMonthIndex(monthIndex)}
      />
    </div>
  );
}
