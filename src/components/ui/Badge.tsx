'use client';

import React from 'react';
import styled, { css } from 'styled-components';
import { TaskType, TASK_TYPES } from '@/constants/taskTypes';
import { TASK_TYPE_PALETTE } from '@/styles/tasks';
import {
  mainBlack,
  mainWhite,
  mainCreamDark,
  pumpkinOrange,
  sageGreen,
} from '@/styles/colors';

export type BadgeSize = 'sm' | 'md' | 'lg';
export type BadgeVariant =
  | 'default'
  | 'taskType'
  | 'status'
  | 'reward'
  | 'outline';

export interface BadgeProps {
  size?: BadgeSize;
  variant?: BadgeVariant;
  taskType?: TaskType;
  statusType?: 'pending' | 'in-progress' | 'completed' | 'failed';
  color?: string;
  textColor?: string;
  children: React.ReactNode;
  className?: string;
}

const sizeStyles: Record<BadgeSize, ReturnType<typeof css>> = {
  sm: css`
    padding: 4px 10px;
    font-size: 12px;
    border-radius: 12px;
    font-weight: 600;
    line-height: 16px;
  `,
  md: css`
    padding: 6px 14px;
    font-size: 13px;
    border-radius: 14px;
    font-weight: 600;
    line-height: 18px;
  `,
  lg: css`
    padding: 8px 18px;
    font-size: 14px;
    border-radius: 16px;
    font-weight: 700;
    line-height: 20px;
  `,
};

function getVariantStyles(
  variant: BadgeVariant,
  color: string,
  textColor: string
) {
  switch (variant) {
    case 'default':
      return css`
        background: ${color};
        color: ${textColor};
        border: none;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      `;

    case 'taskType':
      return css`
        background: ${color};
        color: ${textColor};
        border: none;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
      `;

    case 'status':
      return css`
        background: ${color};
        color: ${textColor};
        border: none;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
      `;

    case 'reward':
      return css`
        background: ${color};
        color: ${textColor};
        border: none;
        box-shadow:
          0 4px 6px -1px rgba(0, 0, 0, 0.1),
          0 2px 4px -2px rgba(0, 0, 0, 0.1);
      `;

    case 'outline':
      return css`
        background: transparent;
        color: ${color};
        border: 1.5px solid ${color};
        box-shadow: none;
      `;
  }
}

const StyledBadge = styled.span<{
  $size: BadgeSize;
  $variant: BadgeVariant;
  $color: string;
  $textColor: string;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-publicSans), sans-serif;
  white-space: nowrap;
  transition: all 0.15s ease;

  ${({ $size }) => sizeStyles[$size]}
  ${({ $variant, $color, $textColor }) =>
    getVariantStyles($variant, $color, $textColor)}

  &:hover {
    transform: translateY(-1px);
  }
`;

export const Badge: React.FC<BadgeProps> = ({
  size = 'md',
  variant = 'default',
  taskType,
  statusType,
  color = pumpkinOrange,
  textColor = mainWhite,
  children,
  className,
}) => {
  let finalColor = color;
  let finalTextColor = textColor;

  // If taskType is specified, use task type colors
  if (taskType && variant === 'taskType') {
    const palette = TASK_TYPE_PALETTE[taskType];
    finalColor = palette.base;
    finalTextColor = palette.text;
  }

  // If statusType is specified, use status colors
  if (statusType && variant === 'status') {
    switch (statusType) {
      case 'pending':
        finalColor = mainCreamDark;
        finalTextColor = '#6b7c74';
        break;
      case 'in-progress':
        finalColor = '#fef3c7';
        finalTextColor = '#92400e';
        break;
      case 'completed':
        finalColor = '#dcfce7';
        finalTextColor = '#15803d';
        break;
      case 'failed':
        finalColor = '#fee2e2';
        finalTextColor = '#b91c1c';
        break;
    }
  }

  return (
    <StyledBadge
      $size={size}
      $variant={variant}
      $color={finalColor}
      $textColor={finalTextColor}
      className={className}
      role="status"
    >
      {children}
    </StyledBadge>
  );
};

export default Badge;
