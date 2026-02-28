'use client';

import React from 'react';
import styled, { css } from 'styled-components';
import { TaskType } from '@/constants/taskTypes';
import { TASK_TYPE_PALETTE } from '@/styles/tasks';
import {
  mainBlack,
  mainDarkText,
  mainCreamDark,
  mainWhite,
  pumpkinOrange,
} from '@/styles/colors';

export interface ChecklistItemProps {
  label: string;
  isCompleted?: boolean;
  isDisabled?: boolean;
  taskType?: TaskType;
  onToggle?: (completed: boolean) => void;
  className?: string;
}

const ItemRow = styled.div<{
  $isDisabled: boolean;
  $interactive: boolean;
}>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 4px;
  border-radius: 12px;
  transition: background 0.12s ease;

  ${({ $isDisabled }) =>
    $isDisabled &&
    css`
      opacity: 0.5;
      cursor: default;
    `}

  ${({ $isDisabled, $interactive }) =>
    !$isDisabled &&
    $interactive &&
    css`
      cursor: pointer;

      &:hover {
        background: rgba(243, 236, 231, 0.6);
      }
    `}
`;

const CheckboxUnchecked = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 16px;
  border: 2px solid ${mainCreamDark};
  background: ${mainWhite};
  flex-shrink: 0;
  transition: border-color 0.12s ease;

  ${ItemRow}:hover & {
    border-color: ${pumpkinOrange};
  }
`;

const CheckboxChecked = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 16px;
  background: ${pumpkinOrange};
  border: 1px solid ${pumpkinOrange};
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

const CheckboxDisabled = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 16px;
  background: ${mainCreamDark};
  border: 2px solid ${mainCreamDark};
  flex-shrink: 0;
`;

const CheckIcon = () => (
  <svg
    width="11"
    height="8"
    viewBox="0 0 11 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 4L4 7L10 1"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LabelText = styled.span<{
  $isCompleted: boolean;
}>`
  font-family: var(--font-roboto), sans-serif;
  font-size: 14px;
  line-height: 20px;
  flex: 1;
  transition: all 0.12s ease;

  ${({ $isCompleted }) =>
    $isCompleted
      ? css`
          color: ${mainDarkText};
          text-decoration: line-through;
        `
      : css`
          color: ${mainBlack};
        `}
`;

const TaskTypePill = styled.span<{ $bg: string; $color: string }>`
  font-family: var(--font-roboto), sans-serif;
  font-size: 11px;
  font-weight: 500;
  padding: 2px 10px;
  border-radius: 50px;
  background: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  flex-shrink: 0;
  text-transform: capitalize;
  letter-spacing: 0.02em;
`;

export const ChecklistItem: React.FC<ChecklistItemProps> = ({
  label,
  isCompleted = false,
  isDisabled = false,
  taskType,
  onToggle,
  className,
}) => {
  const palette = taskType ? TASK_TYPE_PALETTE[taskType] : null;

  const handleClick = () => {
    if (!isDisabled && onToggle) {
      onToggle(!isCompleted);
    }
  };

  const renderCheckbox = () => {
    if (isDisabled) return <CheckboxDisabled />;
    if (isCompleted)
      return (
        <CheckboxChecked>
          <CheckIcon />
        </CheckboxChecked>
      );
    return <CheckboxUnchecked />;
  };

  return (
    <ItemRow
      $isDisabled={isDisabled}
      $interactive={!!onToggle && !isDisabled}
      className={className}
      onClick={handleClick}
      role="checkbox"
      aria-checked={isCompleted}
      aria-label={label}
    >
      {renderCheckbox()}
      <LabelText $isCompleted={isCompleted}>{label}</LabelText>
      {taskType && palette && (
        <TaskTypePill $bg={palette.base} $color={palette.text}>
          {taskType}
        </TaskTypePill>
      )}
    </ItemRow>
  );
};

export default ChecklistItem;
