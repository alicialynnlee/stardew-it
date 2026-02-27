'use client';

import { TASK_TYPE_PALETTE } from '@/styles/tasks';
import { FarmTaskCompletion, TaskId } from '@/types/tasks';
import { TaskType } from '@/constants/taskTypes';
import styled, { ThemeProvider } from 'styled-components';
import { Button } from '@radix-ui/themes';

const StyledTaskLabel = styled(Button)<{
  $baseColor?: string;
  $textColor?: string;
  $isOff?: boolean;
  $isCompleted?: boolean;
}>`
  background-color: ${({ $baseColor }) => $baseColor};
  color: ${({ $textColor }) => $textColor};
  border: 1px solid ${({ $baseColor }) => $baseColor};
  display: inline;
  max-width: 100%;

  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${({ $isOff, $baseColor }) =>
    $isOff &&
    `
    background-color: transparent;
    color: ${$baseColor};
  `}
  ${({ $isCompleted }) =>
    $isCompleted &&
    `
    text-decoration: line-through;
    opacity: 0.6;
  `}
`;

export default function TaskLabel({
  text,
  type,
  isOff,
  isCompleted,
  onClickHandler,
}: {
  text: string;
  type: TaskType;
  isOff?: boolean;
  isCompleted?: boolean;
  onClickHandler?: () => void;
}) {
  const palette = TASK_TYPE_PALETTE[type];
  return (
    <StyledTaskLabel
      $baseColor={palette.base}
      $textColor={palette.text}
      $isOff={isOff}
      $isCompleted={isCompleted}
      {...(onClickHandler && { onClick: onClickHandler })}
    >
      {text}
    </StyledTaskLabel>
  );
}
