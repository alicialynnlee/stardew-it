'use client';

import { BundleId, FarmTaskCompletion } from '@/types/tasks';
import {
  Card,
  Flex,
  Heading,
  Progress,
  ScrollArea,
  Text,
} from '@radix-ui/themes';
import TaskDetails from '../task-details/TaskDetails';
import { BUNDLE_CONFIG, DEFAULT_BUNDLE_CONFIG } from '@/constants/bundleConfig';

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
        <Flex direction="column" p="3" style={{ backgroundColor: config.color }}>
          <Heading size="3" style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Icon size={18} style={{ flexShrink: 0 }} />
            {bundle.name} {bundle.tasksRequired && ` (${bundle.tasksRequired})`}
          </Heading>
          <Text size="1" style={{ color: 'rgba(255,255,255,0.85)' }}>Reward: {bundle.reward}</Text>
          <Flex direction="row" gap="1">
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
          <Flex direction="column" p="3" gap="1">
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
