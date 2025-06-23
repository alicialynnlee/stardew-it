import { lightRed } from '@/styles/colors';
import { Card } from '@radix-ui/themes';
import styled from 'styled-components';

export const CalendarWrapper = styled(Card)`
  padding: 0;
  flex: 1;
`;

export const MonthHeader = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  height: 3rem;

  .hide {
    visibility: hidden;
  }

  span {
    min-width: 6rem;
    text-align: center;
  }
`;

export const DayLabelGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background-color: var(--gray-a2);
  box-shadow: var(--shadow-2);
  height: 2rem;

  span {
    text-align: center;
    padding: 0.5rem;
  }
`;

export const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(4, 1fr);
  background-color: var(--gray-4);
  gap: 1px;
  height: calc(100vh - 14rem);
`;

export const DayBox = styled.div`
  padding: 0.5rem;
  background-color: var(--gray-1);
  overflow-y: auto;
`;

export const DayIndex = styled.button<{ $isSelected?: boolean }>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  background-color: ${({ $isSelected }) =>
    $isSelected ? `var(--accent-9)` : `transparent`};
  color: ${({ $isSelected }) => $isSelected && `var(--background)`};
`;

export const TaskLabel = styled.div<{ $isMonthTask?: boolean }>`
  margin-top: 0.3rem;
  background-color: #cce5ff;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.75rem;
  cursor: pointer;

  ${({ $isMonthTask }) => $isMonthTask && `background-color: ${lightRed};`}
`;
