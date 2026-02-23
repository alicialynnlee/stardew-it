/**
 * Seasonal Calendar Wrapper
 * Wraps the calendar with seasonal theming, borders, and animations
 */

'use client';

import React from 'react';
import styled from 'styled-components';
import { useSeasonalPalette } from '@/contexts/SeasonalContext';

interface SeasonalCalendarWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const StyledWrapper = styled.div<{ $palette: any }>`
  position: relative;
  border: 3px solid ${(props) => props.$palette.calendarBorder};
  border-radius: 8px;
  transition: all 0.6s ease;
  background: linear-gradient(
    135deg,
    ${(props) => props.$palette.background} 0%,
    ${(props) => props.$palette.secondary} 100%
  );
  box-shadow:
    0 4px 12px ${(props) => props.$palette.shadow},
    inset 0 0 20px ${(props) => props.$palette.shadow};

  /* Seasonal glow effects */
  ${(props) => {
    switch (props.$palette.season) {
      case 'spring':
        return `
          animation: springGlow 4s ease-in-out infinite;
        `;
      case 'summer':
        return `
          animation: summerGlow 4s ease-in-out infinite;
        `;
      case 'fall':
        return `
          animation: fallGlow 4s ease-in-out infinite;
        `;
      case 'winter':
        return `
          animation: winterGlow 4s ease-in-out infinite;
        `;
      default:
        return '';
    }
  }}

  @keyframes springGlow {
    0%,
    100% {
      box-shadow:
        0 4px 12px ${(props) => props.$palette.shadow},
        inset 0 0 20px ${(props) => props.$palette.shadow};
    }
    50% {
      box-shadow:
        0 6px 16px ${(props) => props.$palette.shadow},
        inset 0 0 30px ${(props) => props.$palette.shadow};
    }
  }

  @keyframes summerGlow {
    0%,
    100% {
      box-shadow:
        0 4px 12px ${(props) => props.$palette.shadow},
        inset 0 0 15px ${(props) => props.$palette.shadow};
    }
    50% {
      box-shadow:
        0 8px 20px ${(props) => props.$palette.shadow},
        inset 0 0 25px ${(props) => props.$palette.shadow};
    }
  }

  @keyframes fallGlow {
    0%,
    100% {
      box-shadow:
        0 4px 12px ${(props) => props.$palette.shadow},
        inset 0 0 20px ${(props) => props.$palette.shadow};
    }
    50% {
      box-shadow:
        0 6px 16px ${(props) => props.$palette.shadow},
        inset 0 0 30px ${(props) => props.$palette.shadow};
    }
  }

  @keyframes winterGlow {
    0%,
    100% {
      box-shadow:
        0 4px 12px ${(props) => props.$palette.shadow},
        inset 0 0 15px ${(props) => props.$palette.shadow};
    }
    50% {
      box-shadow:
        0 6px 18px ${(props) => props.$palette.shadow},
        inset 0 0 25px ${(props) => props.$palette.shadow};
    }
  }

  /* Seasonal corner decorations */
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    background: ${(props) => props.$palette.accent};
    opacity: 0.3;
    border-radius: 50%;
    animation: float 3s ease-in-out infinite;
  }

  &::before {
    top: -10px;
    left: 20px;
    animation-delay: 0s;
  }

  &::after {
    bottom: -10px;
    right: 20px;
    animation-delay: 1.5s;
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0) rotate(0deg);
      opacity: 0.2;
    }
    50% {
      transform: translateY(-10px) rotate(180deg);
      opacity: 0.4;
    }
  }
`;

const SeasonLabel = styled.div<{ $season: string }>`
  position: absolute;
  top: 8px;
  right: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 4px 8px;
  background: ${(props) => {
    switch (props.$season) {
      case 'spring':
        return 'rgba(168, 216, 111, 0.2)';
      case 'summer':
        return 'rgba(255, 215, 0, 0.2)';
      case 'fall':
        return 'rgba(232, 148, 74, 0.2)';
      case 'winter':
        return 'rgba(176, 216, 241, 0.2)';
      default:
        return 'rgba(0, 0, 0, 0.1)';
    }
  }};
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: ${(props) => {
    switch (props.$season) {
      case 'spring':
        return '#6B9E3F';
      case 'summer':
        return '#CC8800';
      case 'fall':
        return '#A85C2D';
      case 'winter':
        return '#5B7FA6';
      default:
        return '#666';
    }
  }};
`;

/**
 * Seasonal Calendar Wrapper - Adds seasonal theming to calendar
 */
export const SeasonalCalendarWrapper: React.FC<
  SeasonalCalendarWrapperProps
> = ({ children, className }) => {
  const palette = useSeasonalPalette();
  const season = 'spring'; // TODO: figure out the season

  return (
    <StyledWrapper $palette={palette} className={className}>
      <SeasonLabel $season={season}>{palette.name}</SeasonLabel>
      {children}
    </StyledWrapper>
  );
};

export default SeasonalCalendarWrapper;
