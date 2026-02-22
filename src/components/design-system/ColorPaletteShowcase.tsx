'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { Season, SEASONAL_PALETTES } from '@/styles/seasonal';

interface ColorPaletteShowcaseProps {
  season: Season;
}

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  color: var(--season-text);
  margin: 0;
  font-weight: 700;
`;

const SectionSubtitle = styled.p`
  color: var(--season-text-muted);
  margin: 0.5rem 0 0 0;
  font-size: 0.95rem;
`;

const PaletteGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 1rem;
  }
`;

const ColorSwatch = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  cursor: pointer;
`;

const ColorBox = styled.div<{ $color: string }>`
  width: 100%;
  aspect-ratio: 1;
  background-color: ${props => props.$color};
  border-radius: 12px;
  border: 2px solid var(--season-border);
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px var(--season-shadow);
  position: relative;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px var(--season-shadow);
  }

  &:after {
    content: '✓';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 2rem;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  &.copied:after {
    opacity: 1;
  }
`;

const ColorInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const ColorName = styled.span`
  font-weight: 600;
  color: var(--season-text);
  font-size: 0.9rem;
  text-transform: capitalize;
`;

const ColorCode = styled.span`
  font-family: 'Courier New', monospace;
  color: var(--season-text-muted);
  font-size: 0.8rem;
  background: var(--season-background);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  border: 1px solid var(--season-border);
`;

interface ColorItem {
  name: string;
  key: keyof typeof SEASONAL_PALETTES['spring'];
}

const ColorPaletteShowcase: React.FC<ColorPaletteShowcaseProps> = ({ season }) => {
  const palette = SEASONAL_PALETTES[season];
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const colorItems: ColorItem[] = [
    { name: 'Primary', key: 'primary' },
    { name: 'Secondary', key: 'secondary' },
    { name: 'Accent', key: 'accent' },
    { name: 'Background', key: 'background' },
    { name: 'Border', key: 'border' },
    { name: 'Text', key: 'text' },
  ];

  const handleColorClick = (hex: string, name: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(name);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <SectionContainer>
      <SectionHeader>
        <div>
          <SectionTitle>Color Palette</SectionTitle>
          <SectionSubtitle>
            {palette.name} seasonal colors - Click any swatch to copy hex code
          </SectionSubtitle>
        </div>
      </SectionHeader>

      <PaletteGrid>
        {colorItems.map(item => {
          const color = palette[item.key] as string;
          const isCopied = copiedColor === item.name;

          return (
            <ColorSwatch
              key={item.key}
              onClick={() => handleColorClick(color, item.name)}
            >
              <ColorBox
                $color={color}
                className={isCopied ? 'copied' : ''}
              />
              <ColorInfo>
                <ColorName>{item.name}</ColorName>
                <ColorCode title="Click to copy">{color}</ColorCode>
              </ColorInfo>
            </ColorSwatch>
          );
        })}
      </PaletteGrid>
    </SectionContainer>
  );
};

export default ColorPaletteShowcase;
