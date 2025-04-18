import styled from 'styled-components';

export const CalendarWrapper = styled.div`
  padding: 2rem;
  display: grid;
  gap: 2rem;
`;

export const MonthSection = styled.div`
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
`;

export const MonthTitle = styled.h2`
  margin-bottom: 1rem;
`;

export const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
`;

export const DayBox = styled.div`
  border: 1px solid #eee;
  padding: 0.5rem;
  min-height: 60px;
  border-radius: 8px;
  background-color: #f9f9f9;
  font-size: 0.85rem;
  position: relative;
`;

export const TaskLabel = styled.div`
  margin-top: 0.3rem;
  background-color: #cce5ff;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.75rem;
`;
