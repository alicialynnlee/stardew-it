'use client';

import React from 'react';
import styled, { css } from 'styled-components';
import { Button as RadixButton } from '@radix-ui/themes';
import { pumpkinOrange, mainWhite } from '@/styles/colors';

export type BadgeVariant = 'primary' | 'secondary' | 'tertiary' | 'active';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: BadgeVariant;
  color?: string;
}

export function getBadgeVariantStyles(
  variant: BadgeVariant,
  color: string,
  hasOnClick: boolean
) {
  switch (variant) {
    case 'primary':
      return css`
        background: ${color};
        color: ${mainWhite};
        border-color: ${color};

        &:hover:not(:disabled) {
          ${hasOnClick && `background-color: ${color}80;`}
        }
      `;

    case 'secondary':
      return css`
        background: ${color}1A;
        color: ${color};
        border-color: transparent;

        &:hover:not(:disabled) {
          ${hasOnClick && `background: ${color}4D;`}
        }
      `;

    case 'tertiary':
      return css`
        background: transparent;
        color: ${color};
        border-color: ${color};

        &:hover:not(:disabled) {
          ${hasOnClick && `background: ${color}33;`}
        }
      `;

    case 'active':
      return css`
        background: ${color}1A;
        color: ${color};
        border: 1px solid ${color};

        &:hover:not(:disabled) {
          ${hasOnClick && `background: ${color}4D;`}
        }
      `;
  }
}

const StyledButton = styled(RadixButton)<{
  $variant: BadgeVariant;
  $color: string;
  $hasOnClick: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  transition:
    background 0.15s ease,
    color 0.15s ease;
  white-space: nowrap;
  line-height: 1;
  height: unset;
  padding: 4px 10px;
  border: 1px solid;

  ${({ $hasOnClick }) => ($hasOnClick ? 'cursor: pointer;' : 'cursor: unset;')}
  ${({ $variant, $color, $hasOnClick }) =>
    getBadgeVariantStyles($variant, $color, $hasOnClick)}
`;

export const Badge: React.FC<ButtonProps> = ({
  variant = 'primary',
  color = pumpkinOrange,
  children,
  ...props
}) => {
  return (
    <StyledButton
      $variant={variant}
      $color={color}
      $hasOnClick={props.onClick !== undefined}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Badge;
