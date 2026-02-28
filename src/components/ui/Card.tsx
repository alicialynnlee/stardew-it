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

export interface CardProps {
  variant?: CardVariant;
  padding?: CardPadding;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const paddingMap: Record<CardPadding, string> = {
  none: '0',
  sm: '16px',
  md: '25px',
  lg: '33px',
};

const variantStyles: Record<CardVariant, ReturnType<typeof css>> = {
  // Standard white card — main workhorse
  default: css`
    background: ${mainWhite};
    border: 1px solid ${mainCreamDark};
    border-radius: 32px;
    box-shadow: 0 4px 20px -2px rgba(27, 19, 13, 0.08);
  `,
  // Warm cream tinted — for secondary/contextual areas
  tinted: css`
    background: ${mainCreamDark};
    border: 1px solid ${mainCreamDark};
    border-radius: 32px;
    box-shadow: none;
  `,
  // Featured / call-to-action — orange bg, white text
  featured: css`
    background: ${pumpkinOrange};
    border: none;
    border-radius: 32px;
    box-shadow:
      0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -4px rgba(0, 0, 0, 0.1);
    color: white;
  `,
  // Flat / subtle — page bg color, light border
  flat: css`
    background: ${mainBackground};
    border: 1px solid ${mainCreamDark};
    border-radius: 24px;
    box-shadow: none;
  `,
};

const StyledCard = styled.div<{
  $variant: CardVariant;
  $padding: CardPadding;
  $clickable: boolean;
}>`
  ${({ $variant }) => variantStyles[$variant]}
  padding: ${({ $padding }) => paddingMap[$padding]};
  position: relative;
  overflow: hidden;

  ${({ $clickable }) =>
    $clickable &&
    css`
      cursor: pointer;
      transition: transform 0.15s ease, box-shadow 0.15s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px -4px rgba(27, 19, 13, 0.12);
      }

      &:active {
        transform: translateY(0);
      }
    `}
`;

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  padding = 'md',
  className,
  children,
  onClick,
}) => {
  return (
    <StyledCard
      $variant={variant}
      $padding={padding}
      $clickable={!!onClick}
      className={className}
      onClick={onClick}
    >
      {children}
    </StyledCard>
  );
};

export default Card;
