'use client';

import * as Styled from './Calendar.styled';

export default function Calendar() {
  const mockTasks = [
    { date: 'Spring 5', title: 'Plant seeds' },
    { date: 'Summer 10', title: 'Water garden' },
    { date: 'Fall 14', title: 'Harvest crops' },
    { date: 'Winter 1', title: 'Plan next year' },
  ];

  const months = ['Spring', 'Summer', 'Fall', 'Winter'];

  const Calendar: React.FC = () => {
    const getTaskForDate = (month: string, day: number) => {
      return mockTasks.find((task) => task.date === `${month} ${day}`);
    };

    return (
      <Styled.CalendarWrapper>
        <Styled.MonthSection key={months[0]}>
          <Styled.MonthTitle>{months[0]}</Styled.MonthTitle>
          <Styled.DaysGrid>
            {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => {
              const task = getTaskForDate(months[0], day);
              return (
                <Styled.DayBox key={day}>
                  <strong>{day}</strong>
                  {task && <Styled.TaskLabel>{task.title}</Styled.TaskLabel>}
                </Styled.DayBox>
              );
            })}
          </Styled.DaysGrid>
        </Styled.MonthSection>
      </Styled.CalendarWrapper>
    );
  };
}
