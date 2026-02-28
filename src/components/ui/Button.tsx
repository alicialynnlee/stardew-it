'use client';

import React from 'react';
import styled, { css } from 'styled-components';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost';
export type ButtonColor = 'orange' | 'sage' | 'spring' | 'summer' | 'fall' | 'winter';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  fullWidth?: boolean;
  children: React.ReactNode;
}

// ---------------------------------------------------------------------------
// Color palettes
// Each entry covers what all four variants need.
// ---------------------------------------------------------------------------
interface ColorPalette {
  base: string;        // solid fill (primary)
  baseDark: string;    // hover on solid fill
  light: string;       // tinted fill (secondary)
  lightHover: string;  // hover on tinted fill
  border: string;      // border for tertiary
  textOnBase: string;  // text on solid background
  textOnLight: string; // text on tinted/transparent background
}

const COLOR_PALETTES: Record<ButtonColor, ColorPalette> = {
  orange: {
    base: '#EC6D13',
    baseDark: '#D55F0B',
    light: '#FCEDE2',
    lightHover: '#f5dcc9',
    border: '#EC6D13',
    textOnBase: '#FFFFFF',
    textOnLight: '#EC6D13',
  },
  sage: {
    base: '#8DA399',
    baseDark: '#6B7C74',
    light: '#E8EFEC',
    lightHover: '#d3e4de',
    border: '#8DA399',
    textOnBase: '#FFFFFF',
    textOnLight: '#6B7C74',
  },
  spring: {
    base: '#A8D86F',
    baseDark: '#8cbf4e',
    light: '#F5FCF0',
    lightHover: '#E6F3D4',
    border: '#A8D86F',
    textOnBase: '#1B130D',
    textOnLight: '#4e7a20',
  },
  summer: {
    base: '#FFD700',
    baseDark: '#e6c200',
    light: '#FFFEF5',
    lightHover: '#FFF9E6',
    border: '#FFD700',
    textOnBase: '#1B130D',
    textOnLight: '#7a6200',
  },
  fall: {
    base: '#E8944A',
    baseDark: '#d47d35',
    light: '#FEF8F3',
    lightHover: '#fde8d5',
    border: '#E8944A',
    textOnBase: '#FFFFFF',
    textOnLight: '#c47030',
  },
  winter: {
    base: '#B0D8F1',
    baseDark: '#90c3e0',
    light: '#F5F9FE',
    lightHover: '#E6F2FF',
    border: '#B0D8F1',
    textOnBase: '#1B130D',
    textOnLight: '#2d6e96',
  },
};

// ---------------------------------------------------------------------------
// Variant styles — depend on the resolved color palette
// ---------------------------------------------------------------------------
function getVariantStyles(variant: ButtonVariant, color: ButtonColor) {
  const c = COLOR_PALETTES[color];

  switch (variant) {
    case 'primary':
      return css`
        background: ${c.base};
        color: ${c.textOnBase};
        border: none;
        box-shadow:
          0 4px 6px -1px rgba(0, 0, 0, 0.1),
          0 2px 4px -2px rgba(0, 0, 0, 0.1);

        &:hover:not(:disabled) {
          background: ${c.baseDark};
        }
      `;

    case 'secondary':
      return css`
        background: ${c.light};
        color: ${c.textOnLight};
        border: 1px solid ${c.light};
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

        &:hover:not(:disabled) {
          background: ${c.lightHover};
          border-color: ${c.lightHover};
        }
      `;

    case 'tertiary':
      return css`
        background: transparent;
        color: ${c.textOnLight};
        border: 1.5px solid ${c.border};
        box-shadow: none;

        &:hover:not(:disabled) {
          background: ${c.light};
        }
      `;

    case 'ghost':
      return css`
        background: none;
        color: ${c.textOnLight};
        border: none;
        padding-left: 0;
        padding-right: 0;
        box-shadow: none;

        &:hover:not(:disabled) {
          color: ${c.baseDark};
        }
      `;
  }
}

// ---------------------------------------------------------------------------
// Size styles
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// Styled component
// ---------------------------------------------------------------------------
const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $color: ButtonColor;
  $size: ButtonSize;
  $fullWidth: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-publicSans), sans-serif;
  font-weight: 700;
  cursor: pointer;
  transition:
    background 0.15s ease,
    color 0.15s ease,
    box-shadow 0.15s ease;
  white-space: nowrap;
  line-height: 1.25;

  ${({ $fullWidth }) => $fullWidth && 'width: 100%;'}
  ${({ $size }) => sizeStyles[$size]}
  ${({ $variant, $color }) => getVariantStyles($variant, $color)}

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }
`;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  color = 'orange',
  size = 'md',
  fullWidth = false,
  children,
  ...props
}) => {
  return (
    <StyledButton
      $variant={variant}
      $color={color}
      $size={size}
      $fullWidth={fullWidth}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
