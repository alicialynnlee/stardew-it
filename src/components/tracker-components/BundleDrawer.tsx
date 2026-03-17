'use client';

import { BundleId, FarmTaskCompletion } from '@/types/tasks';
import {
  Card,
  Flex,
  Heading,
  IconButton,
  Progress,
  ScrollArea,
  Text,
} from '@radix-ui/themes';
import TaskDetails from '../task-details/TaskDetails';
import { BUNDLE_CONFIG, DEFAULT_BUNDLE_CONFIG } from '@/constants/bundleConfig';
import { mainBlack, mainWhite } from '@/styles/colors';
import styled from 'styled-components';
import { useState } from 'react';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { BREAKPOINTS } from '@/styles/responsive';
import { Button } from '../ui';
import { PiCheckCircleLight } from 'react-icons/pi';

const IconContainer = styled(IconButton)<{ $bundleColor: string }>`
  cursor: unset;
  background-color: ${mainWhite};
  box-shadow: none;

  svg {
    stroke: ${({ $bundleColor }) => $bundleColor ?? mainBlack};
    fill: ${({ $bundleColor }) => $bundleColor ?? mainBlack};
  }
`;

const ToggleButton = styled(Button).attrs({
  variant: 'icon',
  size: 'sm',
})`
  transition: transform 0.3s ease-in-out;

  &[aria-expanded='true'] {
    transform: rotate(0deg);
  }

  &[aria-expanded='false'] {
    transform: rotate(-90deg);
  }

  @media (min-width: ${BREAKPOINTS.sm}px) {
    display: none;
  }
`;

const TasksContainer = styled.div<{ $isExpanded: boolean }>`
  max-height: ${({ $isExpanded }) => ($isExpanded ? '1000px' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
`;

export default function BundleDrawer({
  bundle,
  farmTaskCompletion,
  updateTask,
}: {
  bundle: BundleId;
  farmTaskCompletion: FarmTaskCompletion;
  updateTask: (taskId: string, completed: boolean) => void;
}) {
  const doneTasks = bundle.taskIds.filter((taskId) =>
    farmTaskCompletion.get(taskId.taskId)
  ).length;
  const isCompleted = doneTasks >= bundle.tasksRequired;
  const config = BUNDLE_CONFIG[bundle.name] ?? DEFAULT_BUNDLE_CONFIG;
  const Icon = config.icon;

  // Auto-collapse when completed, but allow user to expand
  const [isExpanded, setIsExpanded] = useState(!isCompleted);

  return (
    <Card key={bundle.bundleId} style={{ padding: 0 }}>
      <Flex direction="column" width="100%">
        {/* Bundle Header */}
        <Flex
          direction="column"
          p="4"
          onClick={() => setIsExpanded(!isExpanded)}
          role="button"
          tabIndex={0}
          style={{
            backgroundColor: config.color,
            cursor: 'pointer',
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setIsExpanded(!isExpanded);
            }
          }}
        >
          <Flex direction="row" gap="3" align="center" justify="between">
            <Flex direction="row" gap="3" align="center">
              <IconContainer
                radius="full"
                variant="outline"
                $bundleColor={config.color}
              >
                <Icon width="18" height="18" />
              </IconContainer>
              <div>
                <Flex direction="row" gap="2" align="center">
                  <Heading
                    size="3"
                    style={{
                      color: mainWhite,
                    }}
                  >
                    {bundle.name}{' '}
                    {bundle.tasksRequired && ` (${bundle.tasksRequired})`}
                  </Heading>
                  {isCompleted && (
                    <PiCheckCircleLight color={mainWhite} size="20px" />
                  )}
                </Flex>
                <Text size="1" style={{ color: mainWhite }}>
                  Reward: {bundle.reward}
                </Text>
              </div>
            </Flex>
            <ToggleButton
              aria-expanded={isExpanded}
              aria-label={isExpanded ? 'Collapse bundle' : 'Expand bundle'}
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
            >
              <ChevronDownIcon />
            </ToggleButton>
          </Flex>

          <Flex direction="row" gap="1" mt="4">
            {Array.from({
              length: Math.min(doneTasks, bundle.tasksRequired),
            }).map((_, i) => (
              <Progress key={`done-${i}`} value={100} />
            ))}
            {Array.from({
              length: bundle.tasksRequired - doneTasks,
            }).map((_, i) => (
              <Progress key={`empty-${i}`} value={0} />
            ))}
          </Flex>
        </Flex>

        {/* Task Container */}
        <TasksContainer $isExpanded={isExpanded}>
          <ScrollArea type="auto" scrollbars="vertical" style={{ height: 150 }}>
            <Flex direction="column" p="4" gap="1">
              {bundle.taskIds.map((task) => (
                <TaskDetails
                  key={task.taskId}
                  task={task}
                  farmTaskCompletion={farmTaskCompletion}
                  updateTask={updateTask}
                />
              ))}
            </Flex>
          </ScrollArea>
        </TasksContainer>
      </Flex>
    </Card>
  );
}
