'use client';

import React from 'react';
import styled from 'styled-components';
import { Season, SEASONAL_PALETTES } from '@/styles/seasonal';
import Link from 'next/link';

interface DesignSystemHeaderProps {
  selectedSeason: Season;
  onSeasonChange: (season: Season) => void;
}

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 2rem;
  border-bottom: 2px solid var(--season-border);
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const TitleContainer = styled.div`
  flex: 1;
`;

const BackLink = styled(Link)`
  color: var(--season-primary);
  text-decoration: none;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  color: var(--season-text);
  margin: 0;
  font-weight: 700;
  letter-spacing: -0.5px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Subtitle = styled.p`
  color: var(--season-text-muted);
  margin: 0.5rem 0 0 0;
  font-size: 0.95rem;
`;

const SeasonButtonsContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SeasonButton = styled.button<{ $isActive: boolean; $season: Season }>`
  padding: 0.75rem 1.5rem;
  border: 2px solid
    ${props => {
      const palette = SEASONAL_PALETTES[props.$season];
      return palette.primary;
    }};
  background: ${props => {
    if (props.$isActive) {
      const palette = SEASONAL_PALETTES[props.$season];
      return palette.primary;
    }
    return 'transparent';
  }};
  color: ${props => {
    if (props.$isActive) {
      return 'white';
    }
    const palette = SEASONAL_PALETTES[props.$season];
    return palette.primary;
  }};
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.95rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px
      ${props => {
        const palette = SEASONAL_PALETTES[props.$season];
        return palette.shadow;
      }};
  }

  &:active {
    transform: translateY(0);
  }
`;

const DesignSystemHeader: React.FC<DesignSystemHeaderProps> = ({
  selectedSeason,
  onSeasonChange,
}) => {
  const seasons: Season[] = ['spring', 'summer', 'fall', 'winter'];

  const getSeasonEmoji = (season: Season): string => {
    switch (season) {
      case 'spring':
        return '🌱';
      case 'summer':
        return '☀️';
      case 'fall':
        return '🍂';
      case 'winter':
        return '❄️';
    }
  };

  return (
    <HeaderContainer>
      <TitleContainer>
        <BackLink href="/">← Back to Home</BackLink>
        <Title>Design System</Title>
        <Subtitle>
          Explore Ivy&apos;s seasonal design work - all components, colors, and typography
          in one place.
        </Subtitle>
      </TitleContainer>
      <SeasonButtonsContainer>
        {seasons.map(season => (
          <SeasonButton
            key={season}
            $isActive={selectedSeason === season}
            $season={season}
            onClick={() => onSeasonChange(season)}
          >
            {getSeasonEmoji(season)} {SEASONAL_PALETTES[season].name}
          </SeasonButton>
        ))}
      </SeasonButtonsContainer>
    </HeaderContainer>
  );
};

export default DesignSystemHeader;
