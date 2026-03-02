'use client';

import React from 'react';
import styled, { css } from 'styled-components';
import { Button as RadixButton } from '@radix-ui/themes';
import {
  pumpkinOrange,
  mainCreamDark,
  mainBlack,
  mainWhite,
} from '@/styles/colors';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'ghost'
  | 'icon';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: string;
  textColor?: string;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const sizeStyles: Record<ButtonSize, ReturnType<typeof css>> = {
  sm: css`
    padding: 8px 16px;
    font-size: 13px;
    border-radius: 50px;
    gap: 6px;
  `,
  md: css`
    padding: 12px 24px;
    font-size: 14px;
    border-radius: 50px;
    gap: 8px;
  `,
  lg: css`
    padding: 14px 28px;
    font-size: 16px;
    border-radius: 50px;
    gap: 8px;
  `,
};

function getVariantStyles(
  variant: ButtonVariant,
  color: string,
  textColor: string
) {
  switch (variant) {
    case 'primary':
      return css`
        background: ${color};
        color: ${textColor};
        border: none;
        box-shadow:
          0 4px 6px -1px rgba(0, 0, 0, 0.1),
          0 2px 4px -2px rgba(0, 0, 0, 0.1);

        &:hover:not(:disabled) {
          background: color-mix(in oklab, ${color}, black 10%);
        }
      `;

    case 'secondary':
      return css`
        background: ${mainCreamDark};
        color: ${mainBlack};
        border: 1px solid ${mainCreamDark};
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

        &:hover:not(:disabled) {
          background: #e8ddd6;
          border-color: #e8ddd6;
        }
      `;

    case 'tertiary':
      return css`
        background: transparent;
        color: ${color};
        border: 1.5px solid ${color};
        box-shadow: none;

        &:hover:not(:disabled) {
          background: color-mix(in oklab, ${color}, white 10%);
          color: ${textColor};
        }
      `;

    case 'ghost':
      return css`
        background: none;
        color: ${color};
        border: none;
        box-shadow: none;

        &:hover:not(:disabled) {
          color: ${color};
        }
      `;

    case 'icon':
      return css`
        background: ${mainWhite};
        color: ${mainBlack};
        border: 1px solid ${mainCreamDark};
        border-radius: 50% !important;
        padding: 0;
        width: 40px;
        height: 40px;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

        &:hover:not(:disabled) {
          background: ${mainCreamDark};
        }
      `;
  }
}

const StyledButton = styled(RadixButton)<{
  $variant: ButtonVariant;
  $size: ButtonSize;
  $color: string;
  $textColor: string;
  $fullWidth: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  cursor: pointer;
  transition:
    background 0.15s ease,
    color 0.15s ease,
    box-shadow 0.15s ease;
  white-space: nowrap;
  line-height: 1.25;
  height: unset;

  ${({ $fullWidth }) => $fullWidth && 'width: 100%;'}
  ${({ $size }) => sizeStyles[$size]}
  ${({ $variant, $color, $textColor }) =>
    getVariantStyles($variant, $color, $textColor)}

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }
`;

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  color = pumpkinOrange,
  textColor = mainWhite,
  fullWidth = false,
  children,
  ...props
}) => {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $color={color}
      $textColor={textColor}
      $fullWidth={fullWidth}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
