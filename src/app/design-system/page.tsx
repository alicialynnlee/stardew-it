'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { Season, SEASONAL_PALETTES } from '@/styles/seasonal';
import { TASK_TYPE_PALETTE } from '@/styles/tasks';
import { TASK_TYPE_LIST } from '@/constants/taskTypes';
import { Jumino } from '@/components/jumino/Jumino';
import { TaskLabel, Button, Card, ChecklistItem } from '@/components';
import { Text } from '@radix-ui/themes';
import { TASK_TYPES } from '@/constants/taskTypes';

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: #f9f9f9;
  min-height: 100vh;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: #2d2d2d;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #6b6b6b;
  margin-bottom: 2rem;
`;

const SeasonToggle = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const SeasonButton = styled.button<{ $active: boolean; $season: Season }>`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border: 2px solid;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;

  ${(props) => {
    const palette = SEASONAL_PALETTES[props.$season];
    return `
      border-color: ${palette.primary};
      color: ${props.$active ? '#fff' : palette.primary};
      background: ${props.$active ? palette.primary : '#fff'};
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }
    `;
  }}
`;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #2d2d2d;
  border-bottom: 3px solid #ddd;
  padding-bottom: 0.5rem;
`;

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const ColorSwatch = styled.div<{ $color: string }>`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ColorBox = styled.div<{ $color: string }>`
  width: 100%;
  height: 100px;
  background-color: ${(props) => props.$color};
  border: 1px solid #ddd;
`;

const ColorLabel = styled.div`
  padding: 0.75rem;
  background: white;
  font-size: 0.85rem;
  font-weight: 600;
  color: #2d2d2d;
  text-align: center;
  word-break: break-all;
  font-family: 'Courier New', monospace;
`;

const TaskColorGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(8, 1fr);
  gap: 1rem;
`;

const TaskColorRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`;

const TaskColorItem = styled.div<{ $color: string }>`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const TypographyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const TypographySample = styled.div`
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const JuminoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const JuminoStateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
`;

const JuminoStateItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const JuminoLabel = styled.p`
  font-size: 0.9rem;
  color: #6b6b6b;
  font-weight: 600;
`;

export default function DesignSystemPage() {
  const [season, setSeason] = useState<Season>('spring');
  const palette = SEASONAL_PALETTES[season];

  const paletteEntries = Object.entries(palette).filter(
    ([key, val]) =>
      !key.startsWith('season') &&
      !key.startsWith('calendar') &&
      key !== 'name' &&
      key !== 'radixAccent' &&
      typeof val === 'string'
  ) as Array<[string, string]>;

  return (
    <Container>
      <Header>
        <Title>🎨 Design System Showcase</Title>
        <Subtitle>Stardew-It Seasonal Design System</Subtitle>
      </Header>

      {/* Season Toggle */}
      <SeasonToggle>
        {(['spring', 'summer', 'fall', 'winter'] as Season[]).map((s) => (
          <SeasonButton
            key={s}
            $season={s}
            $active={season === s}
            onClick={() => setSeason(s)}
          >
            {SEASONAL_PALETTES[s].name}
          </SeasonButton>
        ))}
      </SeasonToggle>

      {/* Main Palette */}
      <Section>
        <SectionTitle>{palette.name} Palette</SectionTitle>
        <ColorGrid>
          {paletteEntries.map(([name, color]) => (
            <ColorSwatch key={name} $color={color}>
              <ColorBox $color={color} />
              <ColorLabel>
                <div>{name}</div>
                <div>{color}</div>
              </ColorLabel>
            </ColorSwatch>
          ))}
        </ColorGrid>
      </Section>

      {/* Task Type Colors */}
      <Section>
        <SectionTitle>Task Type Colors (8 Types)</SectionTitle>
        <TaskColorGrid>
          {TASK_TYPE_LIST.map((taskType) => (
            <TaskColorRow key={taskType}>
              <TaskLabel
                type={taskType}
                text={`${taskType}: ${TASK_TYPE_PALETTE[taskType].base} regular`}
              />
              <TaskLabel
                type={taskType}
                text={`${taskType}: ${TASK_TYPE_PALETTE[taskType].base} off`}
                isOff
              />
              <TaskLabel
                type={taskType}
                text={`${taskType}: ${TASK_TYPE_PALETTE[taskType].base} completed`}
                isCompleted
              />
            </TaskColorRow>
          ))}
        </TaskColorGrid>
      </Section>

      {/* Typography */}
      <Section>
        <SectionTitle>Typography</SectionTitle>
        <TypographyGrid>
          <TypographySample>
            <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
              Heading 1
            </h1>
            <p style={{ color: '#6b6b6b' }}>Large primary heading</p>
          </TypographySample>
          <TypographySample>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
              Heading 2
            </h2>
            <p style={{ color: '#6b6b6b' }}>Section heading</p>
          </TypographySample>
          <TypographySample>
            <p
              style={{
                fontSize: '1rem',
                marginBottom: '0.5rem',
                fontWeight: 600,
              }}
            >
              Body Text
            </p>
            <p style={{ color: '#6b6b6b' }}>Regular body text paragraph</p>
          </TypographySample>
          <TypographySample>
            <p style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              Small Text
            </p>
            <p style={{ color: '#6b6b6b' }}>Secondary or muted information</p>
          </TypographySample>
        </TypographyGrid>
      </Section>

      {/* Jumino Component */}
      <Section>
        <SectionTitle>Jumino Mascot</SectionTitle>
        <JuminoSection>
          <p>Meet Jumino - the mascot of Stardew-It!</p>
          <JuminoStateGrid>
            <JuminoStateItem>
              <Jumino state="idle" size="lg" />
              <JuminoLabel>Idle</JuminoLabel>
            </JuminoStateItem>
            <JuminoStateItem>
              <Jumino state="celebrating" size="lg" />
              <JuminoLabel>Celebrating</JuminoLabel>
            </JuminoStateItem>
            <JuminoStateItem>
              <Jumino state="thinking" size="lg" />
              <JuminoLabel>Thinking</JuminoLabel>
            </JuminoStateItem>
            <JuminoStateItem>
              <Jumino state="working" size="lg" />
              <JuminoLabel>Working</JuminoLabel>
            </JuminoStateItem>
            <JuminoStateItem>
              <Jumino state="relaxed" size="lg" />
              <JuminoLabel>Relaxed</JuminoLabel>
            </JuminoStateItem>
          </JuminoStateGrid>
        </JuminoSection>
      </Section>

      {/* UI Components */}
      <Section>
        <SectionTitle>UI Components</SectionTitle>

        {/* Buttons */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem', color: '#2d2d2d' }}>Button — variants (orange)</h3>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '0.75rem' }}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="tertiary">Tertiary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="primary" disabled>Disabled</Button>
          </div>
          <h3 style={{ margin: '1rem 0', fontSize: '1.1rem', color: '#2d2d2d' }}>Button — colors (primary)</h3>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '0.75rem' }}>
            <Button color="orange">Orange</Button>
            <Button color="sage">Sage</Button>
            <Button color="spring">Spring</Button>
            <Button color="summer">Summer</Button>
            <Button color="fall">Fall</Button>
            <Button color="winter">Winter</Button>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <Button size="sm" variant="primary">Small</Button>
            <Button size="md" variant="primary">Medium</Button>
            <Button size="lg" variant="primary">Large</Button>
          </div>
        </div>

        {/* Cards */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem', color: '#2d2d2d' }}>Card — variants</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <Card variant="default">
              <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Default</p>
              <p style={{ fontSize: '0.875rem', color: '#9a6c4c' }}>White bg, soft border & shadow</p>
            </Card>
            <Card variant="tinted">
              <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Tinted</p>
              <p style={{ fontSize: '0.875rem', color: '#9a6c4c' }}>Warm cream bg</p>
            </Card>
            <Card variant="featured">
              <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Featured</p>
              <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)' }}>Orange CTA card</p>
            </Card>
            <Card variant="flat">
              <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Flat</p>
              <p style={{ fontSize: '0.875rem', color: '#9a6c4c' }}>Page bg, subtle border</p>
            </Card>
          </div>
        </div>

        {/* Checklist Items */}
        <div>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem', color: '#2d2d2d' }}>ChecklistItem — states</h3>
          <Card variant="default" padding="sm">
            <ChecklistItem label="Harvest Parsnips" taskType={TASK_TYPES.FARMING} />
            <ChecklistItem label="Go Fishing at the mountain lake" taskType={TASK_TYPES.FISHING} isCompleted />
            <ChecklistItem label="Collect Spring Onions (off-season)" taskType={TASK_TYPES.FORAGING} isDisabled />
            <ChecklistItem label="Cook a Fried Egg" taskType={TASK_TYPES.COOKING} />
            <ChecklistItem label="Check animals and pet them" taskType={TASK_TYPES.ANIMALS} isCompleted />
          </Card>
        </div>
      </Section>
    </Container>
  );
}
