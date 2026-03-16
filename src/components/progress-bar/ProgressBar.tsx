'use client';

import { mainCreamDark, mainWhite, pumpkinOrange } from '@/styles/colors';
import styled from 'styled-components';

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 20px;
  border-radius: 12px;
  background: ${mainWhite};
  border: 1px solid ${mainCreamDark};
  display: flex;
  align-items: center;
  padding: 3px;
`;

const ProgressBarInside = styled.div<{
  $width?: number;
  $color?: string;
}>`
  width: ${({ $width }) => $width}%;
  height: 100%;
  border-radius: 8px;
  ${({ $color }) =>
    $color
      ? `background-color: ${$color}`
      : `background: linear-gradient(
    90deg,
    rgba(141, 163, 153, 1) 0%,
    rgba(154, 108, 76, 1) 50%,
    rgba(236, 109, 19, 1) 100%
  )`};
`;

export default function ProgressBar({
  value,
  color,
}: {
  value: number;
  color?: string;
}) {
  return (
    <ProgressBarContainer>
      <ProgressBarInside $width={value} $color={color} />
    </ProgressBarContainer>
  );
}
