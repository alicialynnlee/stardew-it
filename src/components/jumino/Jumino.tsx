/**
 * Jumino Mascot Component
 * Cute, helpful farm spirit companion for Stardew-It
 */

'use client';

import React from 'react';
import styled from 'styled-components';
import { getSeasonalPalette } from '@/styles/seasonal';

export type JuminoState = 'idle' | 'celebrating' | 'thinking' | 'working' | 'relaxed';
export type JuminoSize = 'sm' | 'md' | 'lg';

interface JuminoProps {
  state?: JuminoState;
  size?: JuminoSize;
  animated?: boolean;
  className?: string;
  onClick?: () => void;
}

const sizeMap: Record<JuminoSize, number> = {
  sm: 32,
  md: 64,
  lg: 128,
};

const animationKeyframes = `
  @keyframes juminoIdle {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-4px); }
  }

  @keyframes juminoJump {
    0%, 100% { transform: translateY(0) rotate(0deg); opacity: 1; }
    50% { transform: translateY(-40px) rotate(180deg); opacity: 1; }
  }

  @keyframes juminoNod {
    0%, 100% { transform: translateY(0) rotateZ(0deg); }
    25% { transform: translateY(-2px) rotateZ(-3deg); }
    75% { transform: translateY(-2px) rotateZ(3deg); }
  }

  @keyframes juminoBob {
    0%, 100% { transform: scaleY(1) translateY(0); }
    50% { transform: scaleY(1.05) translateY(-2px); }
  }
`;

const JuminoSVGWrapper = styled.div<{
  $size: JuminoSize;
  $state: JuminoState;
  $animated: boolean;
}>`
  ${animationKeyframes}

  display: inline-block;
  user-select: none;

  svg {
    width: ${props => sizeMap[props.$size]}px;
    height: ${props => sizeMap[props.$size]}px;
    display: block;

    ${props => {
      switch (props.$state) {
        case 'idle':
          return props.$animated ? 'animation: juminoIdle 3s ease-in-out infinite;' : '';
        case 'celebrating':
          return 'animation: juminoJump 0.8s ease-in-out;';
        case 'thinking':
          return props.$animated ? 'animation: juminoNod 1.5s ease-in-out infinite;' : '';
        case 'working':
          return props.$animated ? 'animation: juminoBob 2s ease-in-out infinite;' : '';
        default:
          return '';
      }
    }}
  }

  &:hover {
    filter: brightness(1.1);
  }
`;

/**
 * Jumino SVG Component - Renders the cute mascot character
 */
const JuminoSVG = React.memo(({ size }: { size: JuminoSize }) => {
  const palette = getSeasonalPalette();
  
  return (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      {/* Body (rounded rectangle) */}
      <rect x="16" y="24" width="32" height="28" rx="4" fill={palette.primary} stroke="#2D2D2D" strokeWidth="1.5" />
      
      {/* Head (circle) */}
      <circle cx="32" cy="16" r="12" fill={palette.primary} stroke="#2D2D2D" strokeWidth="1.5" />
      
      {/* Left Eye */}
      <circle cx="27" cy="14" r="2.5" fill="#2D2D2D" />
      <circle cx="27" cy="13" r="1" fill="#FFFFFF" opacity="0.7" />
      
      {/* Right Eye */}
      <circle cx="37" cy="14" r="2.5" fill="#2D2D2D" />
      <circle cx="37" cy="13" r="1" fill="#FFFFFF" opacity="0.7" />
      
      {/* Left Glasses Frame */}
      <circle cx="27" cy="14" r="4.5" fill="none" stroke="#B8A574" strokeWidth="1.2" />
      
      {/* Right Glasses Frame */}
      <circle cx="37" cy="14" r="4.5" fill="none" stroke="#B8A574" strokeWidth="1.2" />
      
      {/* Glasses Bridge */}
      <line x1="31.5" y1="14" x2="32.5" y2="14" stroke="#B8A574" strokeWidth="1.2" strokeLinecap="round" />
      
      {/* Left Glasses Shine */}
      <circle cx="25" cy="12" r="1.5" fill="#E6C966" opacity="0.8" />
      
      {/* Right Glasses Shine */}
      <circle cx="39" cy="12" r="1.5" fill="#E6C966" opacity="0.8" />
      
      {/* Mouth (smile) */}
      <path d="M 27 21 Q 32 23 37 21" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      
      {/* Optional cheek blush */}
      <circle cx="20" cy="18" r="2" fill="#FFB7C5" opacity="0.4" />
      <circle cx="44" cy="18" r="2" fill="#FFB7C5" opacity="0.4" />
      
      {/* Body detail - buttons */}
      <circle cx="32" cy="32" r="1.5" fill="#2D2D2D" opacity="0.3" />
      <circle cx="32" cy="40" r="1.5" fill="#2D2D2D" opacity="0.3" />
    </svg>
  );
});

JuminoSVG.displayName = 'JuminoSVG';

/**
 * Jumino Component
 * Displays an animated mascot with different states
 */
export const Jumino: React.FC<JuminoProps> = ({
  state = 'idle',
  size = 'md',
  animated = true,
  className,
  onClick,
}) => {
  return (
    <JuminoSVGWrapper
      $size={size}
      $state={state}
      $animated={animated}
      className={className}
      onClick={onClick}
      role="img"
      aria-label={`Jumino mascot - ${state} state`}
    >
      <JuminoSVG size={size} />
    </JuminoSVGWrapper>
  );
};

export default Jumino;
