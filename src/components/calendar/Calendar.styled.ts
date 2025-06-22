import { lightRed } from '@/styles/colors';
import { Card } from '@radix-ui/themes';
import styled from 'styled-components';

export const CalendarWrapper = styled(Card)`
  padding: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const MonthHeader = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  padding: 1rem;

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

  span {
    text-align: center;
    padding: 0.5rem;
  }
`;

export const DaysGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(4, minmax(0, 1fr));
  background-color: var(--gray-4);
  gap: 1px;
`;

export const DayBox = styled.div`
  padding: 0.5rem;
  background-color: var(--gray-1);
  overflow-y: scroll;
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

export const TaskLabel = styled.div<{ $isMonthTask?: boolean }>`
  margin-top: 0.3rem;
  background-color: #cce5ff;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.75rem;
  ${({ $isMonthTask }) => $isMonthTask && `background-color: ${lightRed};`}
`;
