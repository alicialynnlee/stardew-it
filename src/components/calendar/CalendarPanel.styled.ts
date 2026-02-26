import { lighterGreen } from '@/styles/colors';
import { Card, Flex } from '@radix-ui/themes';
import styled from 'styled-components';

export const PanelWrapper = styled.div<{ $isOpen: boolean }>`
  height: 100%;
  width: ${({ $isOpen }) => ($isOpen ? '18rem' : '2rem')};
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease-in-out;

  .panel-toggle {
    transform: ${({ $isOpen }) =>
      $isOpen ? 'rotate(0deg)' : 'rotate(180deg)'};
    transition: transform 0.3s ease-in-out;
    width: fit-content;
    flex-shrink: 0;
  }
`;

export const PanelContent = styled(Flex)<{ $isOpen: boolean }>`
  height: 100%;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  transition: opacity 0.2s ease-in-out;
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
`;

export const ScrollablePanelCard = styled(Card)`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto;
`;

export const EventCard = styled(Card)<{ $isCompleted?: boolean }>`
  cursor: pointer;

  ${({ $isCompleted }) =>
    $isCompleted &&
    `
    opacity: 0.6;
    background-color: ${lighterGreen};
    text-decoration: line-through;
  `}
`;
