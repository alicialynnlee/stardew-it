import { dustySage, lighterGreen, lightRed } from '@/styles/colors';
import styled from 'styled-components';

export const CalendarWrapper = styled.div`
  padding: 2rem;
  display: grid;
  gap: 0.5rem;
`;

export const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
`;

export const DayIndex = styled.button<{ $isSelected?: boolean }>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  background-color: ${({ $isSelected }) =>
    $isSelected ? `var(--accent-9)` : `var(--background)`};
  color: ${({ $isSelected }) => $isSelected && `var(--background)`};
`;

export const DayBox = styled.div<{ $isSelected?: boolean }>`
  border: 1px solid #eee;
  padding: 0.5rem;
  min-height: 60px;
  border-radius: 8px;
  background-color: #f9f9f9;
  font-size: 0.85rem;
  position: relative;
  ${({ $isSelected }) => $isSelected && `background-color: ${lighterGreen};`}
`;

export const TaskLabel = styled.div<{ $isMonthTask?: boolean }>`
  margin-top: 0.3rem;
  background-color: #cce5ff;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.75rem;
  ${({ $isMonthTask }) => $isMonthTask && `background-color: ${lightRed};`}
`;
