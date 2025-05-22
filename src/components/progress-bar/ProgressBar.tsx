'use client';

import { Flex, Text } from '@radix-ui/themes';
import styled from 'styled-components';

export const ContainerBar = styled.div`
  margin: 1rem 0;
  width: 100%;
  height: 8px;
  background-color: var(--gray-a3);
  border-radius: var(--radius-3);
  position: relative;
`;

export const FillBar = styled.div<{ width: number }>`
  width: ${({ width }) => `${width}%`};
  height: 100%;
  background-color: var(--accent-9);
  border-radius: var(--radius-3);
  transition: width 0.3s ease;
`;

export default function ProgressBar({ width }: { width: number }) {
  return (
    <Flex direction="row" align="center" gap="2">
      <ContainerBar>
        <FillBar width={width > 100 ? 100 : width} />
      </ContainerBar>
      <Text wrap="nowrap" size="2">
        {width >= 100 ? 'Completed!' : `Progress: ${Math.floor(width)}%`}
      </Text>
    </Flex>
  );
}
