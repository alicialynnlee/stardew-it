'use client';

import { mainWhite, pumpkinOrange } from '@/styles/colors';
import styled from 'styled-components';

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 20px;
  border-radius: 12px;
  background: ${mainWhite};
  display: flex;
  align-items: center;
  padding: 3px;
`;

const ProgressBarInside = styled.div<{
  $width?: number;
}>`
  width: ${({ $width }) => $width}%;
  height: 100%;
  border-radius: 8px;
  background: linear-gradient(
    90deg,
    rgba(141, 163, 153, 1) 0%,
    rgba(154, 108, 76, 1) 50%,
    rgba(236, 109, 19, 1) 100%
  );
`;

export default function ProgressBar({ value }: { value: number }) {
  return (
    <ProgressBarContainer>
      <ProgressBarInside $width={value} />
    </ProgressBarContainer>
  );
}
