'use client';

import { ComponentPropsWithoutRef } from 'react';
import { Box } from '@radix-ui/themes';
import { IconType } from 'react-icons';
import styled from 'styled-components';
import { sageGreen } from '@/styles/colors';

const StyledCircle = styled(Box)<{ $color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: color-mix(in oklab, ${({ $color }) => $color}, white 80%);
  color: ${({ $color }) => $color};
  flex-shrink: 0;
`;

export interface IconCircleProps
  extends Omit<ComponentPropsWithoutRef<typeof Box>, 'color'> {
  icon: IconType;
  color?: string;
  iconSize?: number;
}

export function IconCircle({
  icon: Icon,
  color = sageGreen,
  iconSize = 16,
  width = '36px',
  height = '36px',
  ...props
}: IconCircleProps) {
  return (
    <StyledCircle $color={color} width={width} height={height} {...props}>
      <Icon size={iconSize} />
    </StyledCircle>
  );
}

export default IconCircle;
