'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { TASK_CONFIG, TASK_TYPE_LIST, TaskType } from '@/constants/taskTypes';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface TaskTypeColorsShowcaseProps {}

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

const TaskTypesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 1rem;
  }
`;

const TaskTypeCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 10px;
  border: 2px solid var(--season-border);
  background: var(--season-background);
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateX(4px);
    box-shadow: 0 4px 12px var(--season-shadow);
  }
`;

const ColorDot = styled.div<{ $color: string }>`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background-color: ${(props) => props.$color};
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border: 2px solid var(--season-border);
`;

const TaskInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
  min-width: 0;
`;

const TaskName = styled.span`
  font-weight: 600;
  color: var(--season-text);
  font-size: 0.95rem;
  text-transform: capitalize;
`;

const TaskCode = styled.span`
  font-family: 'Courier New', monospace;
  color: var(--season-text-muted);
  font-size: 0.8rem;
  background: transparent;
  word-break: break-all;
`;

const getTaskEmoji = (taskType: TaskType): string => {
  const emojiMap: Record<TaskType, string> = {
    foraging: '🌲',
    fishing: '🎣',
    mining: '⛏️',
    farming: '🌾',
    animals: '🐓',
    cooking: '🍳',
    calendar: '📅',
    other: '📌',
  };
  return emojiMap[taskType];
};

const TaskTypeColorsShowcase: React.FC<TaskTypeColorsShowcaseProps> = () => {
  const [copiedColor, setCopiedColor] = useState<TaskType | null>(null);

  const handleTaskTypeClick = (taskType: TaskType, hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(taskType);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <SectionContainer>
      <SectionHeader>
        <div>
          <SectionTitle>Task Type Colors</SectionTitle>
          <SectionSubtitle>
            All 8 task types - Click to copy hex code
          </SectionSubtitle>
        </div>
      </SectionHeader>

      <TaskTypesGrid>
        {TASK_TYPE_LIST.map((taskType) => {
          const color = TASK_CONFIG[taskType].color;
          const isCopied = copiedColor === taskType;

          return (
            <TaskTypeCard
              key={taskType}
              onClick={() => handleTaskTypeClick(taskType, color)}
              title="Click to copy hex code"
            >
              <ColorDot $color={color} />
              <TaskInfo>
                <TaskName>
                  {getTaskEmoji(taskType)} {taskType}
                </TaskName>
                <TaskCode>{color}</TaskCode>
              </TaskInfo>
            </TaskTypeCard>
          );
        })}
      </TaskTypesGrid>
    </SectionContainer>
  );
};

export default TaskTypeColorsShowcase;
