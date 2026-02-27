import { lighterGreen, dustySage } from '@/styles/colors';
import { Card, Flex } from '@radix-ui/themes';
import styled from 'styled-components';

export const CalendarWrapper = styled(Card)`
  padding: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const SeasonHeader = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  height: 4rem;

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
  flex: 1;
  min-height: 0;
`;

export const DayBox = styled(Flex)`
  padding: 0.5rem;
  background-color: var(--gray-1);
  overflow-y: auto;
`;

export const DayIndex = styled.button<{
  $isSelected?: boolean;
  $isViewing?: boolean;
}>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: ${({ $isViewing }) =>
    $isViewing ? `1px solid var(--accent-9)` : `none`};
  background-color: ${({ $isSelected }) =>
    $isSelected ? `var(--accent-9)` : `transparent`};
  color: ${({ $isSelected }) => $isSelected && `var(--background)`};
`;

export const SectionBar = styled.div<{ $isExpanded?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 1rem;
  background-color: var(--gray-a2);
  cursor: pointer;
  border-top: 1px solid var(--gray-4);
  user-select: none;
  flex-shrink: 0;

  &:hover {
    background-color: var(--gray-a3);
  }
`;

export const SectionChevron = styled.span<{ $isExpanded?: boolean }>`
  display: inline-flex;
  align-items: center;
  transition: transform 0.2s ease;
  transform: ${({ $isExpanded }) =>
    $isExpanded ? 'rotate(90deg)' : 'rotate(0deg)'};
  font-size: 0.8rem;
  color: var(--gray-9);
`;

export const CountBadge = styled.span`
  font-size: 0.7rem;
  color: var(--gray-9);
  background-color: var(--gray-a3);
  border-radius: 10px;
  padding: 0.1rem 0.5rem;
  min-width: 1.2rem;
  text-align: center;
`;

export const SectionContent = styled.div<{ $isExpanded?: boolean }>`
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  padding: ${({ $isExpanded }) => ($isExpanded ? '0.5rem 1rem' : '0')};
  max-height: ${({ $isExpanded }) => ($isExpanded ? '10rem' : '0')};
  overflow-y: auto;
  transition:
    max-height 0.3s ease,
    padding 0.3s ease;
  border-top: ${({ $isExpanded }) =>
    $isExpanded ? '1px solid var(--gray-3)' : 'none'};
`;
