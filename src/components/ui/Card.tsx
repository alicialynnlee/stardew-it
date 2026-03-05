'use client';

import React from 'react';
import styled, { css } from 'styled-components';
import {
  mainWhite,
  mainCreamDark,
  mainBackground,
  pumpkinOrange,
} from '@/styles/colors';

export type CardVariant = 'default' | 'tinted' | 'featured' | 'flat';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

const paddingMap: Record<CardPadding, string> = {
  none: '0',
  sm: '16px',
  md: '25px',
  lg: '33px',
};

export function getCardVariantStyles(
  variant: CardVariant,
  color: string,
  textColor: string
) {
  switch (variant) {
    case 'default':
      // Standard white card — main workhorse
      return css`
        background: ${mainWhite};
        border: 1px solid ${mainCreamDark};
        border-radius: 32px;
        box-shadow: 0 4px 20px -2px rgba(27, 19, 13, 0.08);
      `;
    case 'tinted':
      // Warm cream tinted — for secondary/contextual areas
      return css`
        background: ${mainCreamDark};
        border: 1px solid ${mainCreamDark};
        border-radius: 32px;
        box-shadow: none;
      `;
    case 'featured':
      // Featured / call-to-action — given (or default) bg, white text
      return css`
        background: ${color};
        border: none;
        border-radius: 32px;
        box-shadow:
          0 10px 15px -3px rgba(0, 0, 0, 0.1),
          0 4px 6px -4px rgba(0, 0, 0, 0.1);
        color: ${textColor};
      `;
    case 'flat':
      // Flat / subtle — page bg color, light border
      return css`
        background: ${mainBackground};
        border: 1px solid ${mainCreamDark};
        border-radius: 24px;
        box-shadow: none;
      `;
  }
}

const StyledCard = styled.div<{
  $variant: CardVariant;
  $padding: CardPadding;
  $clickable: boolean;
  $color: string;
  $textColor: string;
}>`
  ${({ $variant, $color, $textColor }) =>
    getCardVariantStyles($variant, $color, $textColor)}
  padding: ${({ $padding }) => paddingMap[$padding]};
  position: relative;
  overflow: hidden;

  ${({ $clickable }) =>
    $clickable &&
    css`
      cursor: pointer;
      transition:
        transform 0.15s ease,
        box-shadow 0.15s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px -4px rgba(27, 19, 13, 0.12);
      }

      &:active {
        transform: translateY(0);
      }
    `}
`;

export default function Card({
  variant = 'default',
  padding = 'md',
  color = pumpkinOrange,
  textColor = mainWhite,
  className,
  onClick,
  children,
  ...props
}: {
  variant?: CardVariant;
  padding?: CardPadding;
  color?: string;
  textColor?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <StyledCard
      $variant={variant}
      $padding={padding}
      $color={color}
      $textColor={textColor}
      $clickable={!!onClick}
      className={className}
      onClick={onClick}
      {...props}
    >
      {children}
    </StyledCard>
  );
}
