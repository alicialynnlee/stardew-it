import styled from 'styled-components';
import { IconButton } from '@radix-ui/themes';

export const CloseButton = styled(IconButton)`
  position: absolute;
  top: 10px;
  right: 10px;
`;

export const TaskRow = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0;
  cursor: pointer;

  input[type='checkbox'] {
    cursor: pointer;
  }
`;

export const TaskName = styled.span<{ $isCompleted?: boolean }>`
  ${({ $isCompleted }) =>
    $isCompleted &&
    `
    text-decoration: line-through;
    color: var(--gray-9);
  `}
`;
