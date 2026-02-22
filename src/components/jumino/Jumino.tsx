/**
 * Jumino Mascot Component
 * Uses the custom favicon image as the mascot with animations
 */

'use client';

import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

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

  @keyframes juminoPulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.8; }
  }
`;

const JuminoImageWrapper = styled.div<{
  $size: JuminoSize;
  $state: JuminoState;
  $animated: boolean;
}>`
  ${animationKeyframes}

  display: inline-flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  width: ${props => sizeMap[props.$size]}px;
  height: ${props => sizeMap[props.$size]}px;

  img {
    width: 100%;
    height: 100%;
    display: block;
    image-rendering: pixelated;
    image-rendering: crisp-edges;

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
        case 'relaxed':
          return props.$animated ? 'animation: juminoPulse 2.5s ease-in-out infinite;' : '';
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
 * Jumino Component
 * Displays the cute mascot character with animated states
 */
export const Jumino: React.FC<JuminoProps> = ({
  state = 'idle',
  size = 'md',
  animated = true,
  className,
  onClick,
}) => {
  const pixelSize = sizeMap[size];

  return (
    <JuminoImageWrapper
      $size={size}
      $state={state}
      $animated={animated}
      className={className}
      onClick={onClick}
      role="img"
      aria-label={`Jumino mascot - ${state} state`}
    >
      <Image
        src="/favicon.png"
        alt="Jumino mascot"
        width={pixelSize}
        height={pixelSize}
        priority
        unoptimized // Preserve pixelated aesthetic
      />
    </JuminoImageWrapper>
  );
};

export default Jumino;
