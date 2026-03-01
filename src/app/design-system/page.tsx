'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { Season, SEASONAL_PALETTES } from '@/styles/seasonal';
import { TASK_TYPE_PALETTE } from '@/styles/tasks';
import { TASK_TYPE_LIST } from '@/constants/taskTypes';
import { Jumino } from '@/components/jumino/Jumino';
import { TaskLabel, Badge, Modal, Toast, Button } from '@/components';
import { Text } from '@radix-ui/themes';

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

const BadgeSection = styled(Section)``;
const ModalSection = styled(Section)``;
const ToastSection = styled(Section)``;

const ComponentCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
`;

const ComponentSubtitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  color: #2d2d2d;
  font-weight: 600;
`;

const BadgeGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const BadgeVariantRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ModalDemoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const ModalPreviewBox = styled.div`
  background: #f9f9f9;
  border: 1px dashed #ddd;
  border-radius: 8px;
  overflow: hidden;
`;

const ModalPreviewContent = styled.div`
  background: white;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
  max-width: 400px;
  margin: 0 auto;
`;

const ModalHeader = styled.div<{ $isPreview?: boolean }>`
  padding: 1.5rem 1.75rem;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  color: #2d2d2d;
`;

const ModalBody = styled.div<{ $isPreview?: boolean }>`
  padding: 1.5rem 1.75rem;
  color: #6b6b6b;
  font-size: 0.9rem;
  line-height: 1.6;
`;

const ModalFooter = styled.div<{ $isPreview?: boolean }>`
  padding: 1rem 1.75rem;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
`;

const DemoButton = styled.button<{ $secondary?: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: none;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;

  ${(props) =>
    props.$secondary
      ? `
      background: #f0f0f0;
      color: #2d2d2d;
      &:hover {
        background: #e0e0e0;
      }
    `
      : `
      background: #8da399;
      color: white;
      &:hover {
        background: #6b7c74;
      }
    `}
`;

const ToastDemoGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ToastPreviewBox = styled.div`
  background: #f9f9f9;
  border: 1px dashed #ddd;
  border-radius: 8px;
  padding: 1.5rem;
  overflow: hidden;
`;

const ToastPreviewContent = styled.div<{ $type: string }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid;

  ${(props) => {
    switch (props.$type) {
      case 'success':
        return `
          background: #dcfce7;
          border-color: #bbf7d0;
          color: #15803d;
        `;
      case 'error':
        return `
          background: #fee2e2;
          border-color: #fecaca;
          color: #b91c1c;
        `;
      case 'warning':
        return `
          background: #fef3c7;
          border-color: #fde68a;
          color: #92400e;
        `;
      default:
        return `
          background: #dbeafe;
          border-color: #bfdbfe;
          color: #0e7490;
        `;
    }
  }}
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  color: #6b6b6b;
  font-size: 0.95rem;
  line-height: 1.5;
`;

const FeatureBullet = styled.span`
  color: #8da399;
  font-weight: bold;
  flex-shrink: 0;
`;

const FeatureText = styled.span`
  color: #6b6b6b;
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

      {/* Badge/Tag Component */}
      <BadgeSection>
        <SectionTitle>Badges &amp; Tags</SectionTitle>
        <ComponentCard>
          <ComponentSubtitle>Size Variants</ComponentSubtitle>
          <BadgeGrid>
            <BadgeVariantRow>
              <Badge size="sm">Small Badge</Badge>
              <Badge size="md">Medium Badge</Badge>
              <Badge size="lg">Large Badge</Badge>
            </BadgeVariantRow>
          </BadgeGrid>
        </ComponentCard>

        <ComponentCard>
          <ComponentSubtitle>Task Type Badges</ComponentSubtitle>
          <BadgeGrid>
            {TASK_TYPE_LIST.map((taskType) => (
              <BadgeVariantRow key={taskType}>
                <Badge variant="taskType" taskType={taskType}>
                  {taskType}
                </Badge>
              </BadgeVariantRow>
            ))}
          </BadgeGrid>
        </ComponentCard>

        <ComponentCard>
          <ComponentSubtitle>Status Badges</ComponentSubtitle>
          <BadgeGrid>
            <BadgeVariantRow>
              <Badge variant="status" statusType="pending">
                Pending
              </Badge>
              <Badge variant="status" statusType="in-progress">
                In Progress
              </Badge>
              <Badge variant="status" statusType="completed">
                Completed
              </Badge>
              <Badge variant="status" statusType="failed">
                Failed
              </Badge>
            </BadgeVariantRow>
          </BadgeGrid>
        </ComponentCard>

        <ComponentCard>
          <ComponentSubtitle>Variants</ComponentSubtitle>
          <BadgeGrid>
            <BadgeVariantRow>
              <Badge variant="default">Default</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="reward">Reward</Badge>
            </BadgeVariantRow>
          </BadgeGrid>
        </ComponentCard>
      </BadgeSection>

      {/* Modal/Dialog Component */}
      <ModalSection>
        <SectionTitle>Modal &amp; Dialog</SectionTitle>
        <ComponentCard>
          <ComponentSubtitle>Modal States</ComponentSubtitle>
          <ModalDemoGrid>
            <ModalPreviewBox>
              <ModalPreviewContent>
                <ModalHeader $isPreview>
                  <div>Create Task</div>
                  <div style={{ fontSize: '18px', cursor: 'pointer' }}>×</div>
                </ModalHeader>
                <ModalBody $isPreview>
                  <p>
                    A composable modal component with header, body, and footer
                    sections.
                  </p>
                </ModalBody>
                <ModalFooter $isPreview>
                  <DemoButton $secondary>Cancel</DemoButton>
                  <DemoButton>Create</DemoButton>
                </ModalFooter>
              </ModalPreviewContent>
            </ModalPreviewBox>
          </ModalDemoGrid>
        </ComponentCard>

        <ComponentCard>
          <ComponentSubtitle>Modal Features</ComponentSubtitle>
          <FeatureList>
            <FeatureItem>
              <FeatureBullet>•</FeatureBullet>
              <FeatureText>Close on Escape key</FeatureText>
            </FeatureItem>
            <FeatureItem>
              <FeatureBullet>•</FeatureBullet>
              <FeatureText>Close on backdrop click</FeatureText>
            </FeatureItem>
            <FeatureItem>
              <FeatureBullet>•</FeatureBullet>
              <FeatureText>Customizable title and footer</FeatureText>
            </FeatureItem>
            <FeatureItem>
              <FeatureBullet>•</FeatureBullet>
              <FeatureText>Size variants: sm, md, lg</FeatureText>
            </FeatureItem>
            <FeatureItem>
              <FeatureBullet>•</FeatureBullet>
              <FeatureText>Smooth animations</FeatureText>
            </FeatureItem>
          </FeatureList>
        </ComponentCard>
      </ModalSection>

      {/* Toast/Alert Component */}
      <ToastSection>
        <SectionTitle>Toast &amp; Notifications</SectionTitle>
        <ComponentCard>
          <ComponentSubtitle>Toast Types</ComponentSubtitle>
          <ToastDemoGrid>
            <ToastPreviewBox>
              <ToastPreviewContent $type="success">
                <span style={{ fontSize: '18px' }}>✓</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, marginBottom: '2px' }}>
                    Success!
                  </div>
                  <div style={{ fontSize: '13px' }}>
                    Task created successfully
                  </div>
                </div>
                <span style={{ cursor: 'pointer', fontSize: '20px' }}>×</span>
              </ToastPreviewContent>
            </ToastPreviewBox>

            <ToastPreviewBox>
              <ToastPreviewContent $type="error">
                <span style={{ fontSize: '18px' }}>✕</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, marginBottom: '2px' }}>
                    Error
                  </div>
                  <div style={{ fontSize: '13px' }}>
                    Failed to save changes
                  </div>
                </div>
                <span style={{ cursor: 'pointer', fontSize: '20px' }}>×</span>
              </ToastPreviewContent>
            </ToastPreviewBox>

            <ToastPreviewBox>
              <ToastPreviewContent $type="warning">
                <span style={{ fontSize: '18px' }}>⚠</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, marginBottom: '2px' }}>
                    Warning
                  </div>
                  <div style={{ fontSize: '13px' }}>
                    This action cannot be undone
                  </div>
                </div>
                <span style={{ cursor: 'pointer', fontSize: '20px' }}>×</span>
              </ToastPreviewContent>
            </ToastPreviewBox>

            <ToastPreviewBox>
              <ToastPreviewContent $type="info">
                <span style={{ fontSize: '18px' }}>ⓘ</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, marginBottom: '2px' }}>
                    Info
                  </div>
                  <div style={{ fontSize: '13px' }}>
                    New tasks available
                  </div>
                </div>
                <span style={{ cursor: 'pointer', fontSize: '20px' }}>×</span>
              </ToastPreviewContent>
            </ToastPreviewBox>
          </ToastDemoGrid>
        </ComponentCard>

        <ComponentCard>
          <ComponentSubtitle>Toast Features</ComponentSubtitle>
          <FeatureList>
            <FeatureItem>
              <FeatureBullet>•</FeatureBullet>
              <FeatureText>Auto-dismiss after configurable duration</FeatureText>
            </FeatureItem>
            <FeatureItem>
              <FeatureBullet>•</FeatureBullet>
              <FeatureText>Position variants (9 positions)</FeatureText>
            </FeatureItem>
            <FeatureItem>
              <FeatureBullet>•</FeatureBullet>
              <FeatureText>Type variants: success, error, warning, info</FeatureText>
            </FeatureItem>
            <FeatureItem>
              <FeatureBullet>•</FeatureBullet>
              <FeatureText>Progress bar showing remaining time</FeatureText>
            </FeatureItem>
            <FeatureItem>
              <FeatureBullet>•</FeatureBullet>
              <FeatureText>Smooth slide animations</FeatureText>
            </FeatureItem>
            <FeatureItem>
              <FeatureBullet>•</FeatureBullet>
              <FeatureText>Dismissible by user</FeatureText>
            </FeatureItem>
          </FeatureList>
        </ComponentCard>
      </ToastSection>
    </Container>
  );
}
