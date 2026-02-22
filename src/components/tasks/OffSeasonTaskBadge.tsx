/**
 * Off-Season Task Badge Component
 * Indicates when a task is outside the current season
 */

'use client';

import React from 'react';
import styled from 'styled-components';
import { OFF_SEASON_TASK_STYLES } from '@/styles/seasonal';

interface OffSeasonTaskBadgeProps {
  isOffSeason: boolean;
  className?: string;
  children: React.ReactNode;
}

const OffSeasonWrapper = styled.div<{ $isOffSeason: boolean }>`
  position: relative;
  opacity: ${props => (props.$isOffSeason ? OFF_SEASON_TASK_STYLES.opacity : 1)};
  filter: ${props => (props.$isOffSeason ? OFF_SEASON_TASK_STYLES.filter : 'none')};
  transition: all 0.2s ease;

  ${props => props.$isOffSeason && `
    text-decoration: ${OFF_SEASON_TASK_STYLES.textDecoration};
  `}

  &:hover {
    opacity: ${props => (props.$isOffSeason ? 0.75 : 1)};
  }
`;

const OffSeasonIndicator = styled.span`
  display: inline-block;
  font-size: 0.75em;
  margin-left: 4px;
  opacity: 0.8;
  animation: pulse 2s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% {
      opacity: 0.6;
    }
    50% {
      opacity: 1;
    }
  }
`;

/**
 * Off-Season Task Badge - Wrapper component that dims off-season tasks
 */
export const OffSeasonTaskBadge: React.FC<OffSeasonTaskBadgeProps> = ({
  isOffSeason,
  className,
  children,
}) => {
  return (
    <OffSeasonWrapper $isOffSeason={isOffSeason} className={className}>
      <span>{children}</span>
      {isOffSeason && (
        <OffSeasonIndicator title="This task is outside the current season">
          ❄️
        </OffSeasonIndicator>
      )}
    </OffSeasonWrapper>
  );
};

export default OffSeasonTaskBadge;
