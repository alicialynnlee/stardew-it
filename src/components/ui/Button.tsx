'use client';

import React from 'react';
import styled, { css } from 'styled-components';
import {
  pumpkinOrange,
  pumpkinRust,
  pumpkinCream,
  mainCreamDark,
  mainBlack,
  mainWhite,
  sageGreen,
  sageDark,
  sageMist,
} from '@/styles/colors';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'sage' | 'icon';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const sizeStyles: Record<ButtonSize, ReturnType<typeof css>> = {
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

const variantStyles: Record<ButtonVariant, ReturnType<typeof css>> = {
  // Main action — pumpkin orange, pill shape, shadow
  primary: css`
    background: ${pumpkinOrange};
    color: white;
    border: none;
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -2px rgba(0, 0, 0, 0.1);

    &:hover:not(:disabled) {
      background: ${pumpkinRust};
    }
  `,
  // Quiet secondary — cream bg, dark text
  secondary: css`
    background: ${mainCreamDark};
    color: ${mainBlack};
    border: 1px solid ${mainCreamDark};
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

    &:hover:not(:disabled) {
      background: #e8ddd6;
      border-color: #e8ddd6;
    }
  `,
  // Text / link style — no bg, orange text
  ghost: css`
    background: none;
    color: ${pumpkinOrange};
    border: none;
    padding-left: 0;
    padding-right: 0;
    box-shadow: none;

    &:hover:not(:disabled) {
      color: ${pumpkinRust};
    }
  `,
  // Sage / nature — soft green, used for secondary nature actions
  sage: css`
    background: rgba(141, 163, 153, 0.2);
    color: ${sageDark};
    border: none;
    box-shadow: none;

    &:hover:not(:disabled) {
      background: ${sageMist};
    }
  `,
  // Icon-only circular button
  icon: css`
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
  `,
};

const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-publicSans), sans-serif;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease, box-shadow 0.15s ease;
  white-space: nowrap;
  line-height: 1.25;

  ${({ $fullWidth }) => $fullWidth && 'width: 100%;'}
  ${({ $size }) => sizeStyles[$size]}
  ${({ $variant }) => variantStyles[$variant]}

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
  fullWidth = false,
  children,
  ...props
}) => {
  return (
    <StyledButton $variant={variant} $size={size} $fullWidth={fullWidth} {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;
