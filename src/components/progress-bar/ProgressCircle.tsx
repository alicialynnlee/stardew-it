'use client';

import { CheckIcon } from '@radix-ui/react-icons';
import { Flex } from '@radix-ui/themes';
import styled from 'styled-components';

const Svg = styled.svg`
  transform: rotate(-90deg); // rotate so progress starts at top
`;

const CircleBackground = styled.circle`
  fill: none;
  stroke: var(--gray-4);
`;

const CircleProgress = styled.circle<{ color: string }>`
  fill: none;
  stroke: ${({ color }) => color};
  stroke-linecap: round;
  transition: stroke-dashoffset 0.5s ease;
`;

const CheckMark = styled(CheckIcon)<{ color: string }>`
  position: absolute;
  margin: 3px;
  color: ${({ color }) => color};
`;

export default function ProgressCircle({
  size,
  percentage,
}: {
  size: number;
  percentage: number;
}) {
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const calcPercentage = percentage > 100 ? 100 : percentage;
  const offset = circumference * (1 - calcPercentage / 100);

  return (
    <Flex>
      <Svg width={size} height={size}>
        <g transform={`translate(${size / 2}, ${size / 2})`}>
          <CircleBackground r={radius} strokeWidth={strokeWidth} />
          <CircleProgress
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            color={'var(--accent-9)'}
          ></CircleProgress>
        </g>
      </Svg>
      <CheckMark
        width={size - 6}
        height={size - 6}
        color={percentage >= 100 ? `var(--accent-9)` : `var(--gray-4)`}
      />
    </Flex>
  );
}
