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

const IconContainer = styled(IconButton)<{ $bundleColor: string }>`
  cursor: unset;
  background-color: ${mainWhite};
  box-shadow: none;

  svg {
    stroke: ${({ $bundleColor }) => $bundleColor ?? mainBlack};
    fill: ${({ $bundleColor }) => $bundleColor ?? mainBlack};
  }
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
  const config = BUNDLE_CONFIG[bundle.name] ?? DEFAULT_BUNDLE_CONFIG;
  const Icon = config.icon;
  return (
    <Card key={bundle.bundleId} style={{ padding: 0 }}>
      <Flex direction="column" width="100%">
        <Flex
          direction="column"
          p="4"
          style={{
            backgroundColor: config.color,
          }}
        >
          <Flex direction="row" gap="3" align="center">
            <IconContainer
              radius="full"
              variant="outline"
              $bundleColor={config.color}
            >
              <Icon width="18" height="18" />
            </IconContainer>
            <div>
              <Heading
                size="3"
                style={{
                  color: mainWhite,
                }}
              >
                {bundle.name}{' '}
                {bundle.tasksRequired && ` (${bundle.tasksRequired})`}
              </Heading>
              <Text size="1" style={{ color: mainWhite }}>
                Reward: {bundle.reward}
              </Text>
            </div>
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
      </Flex>
    </Card>
  );
}
