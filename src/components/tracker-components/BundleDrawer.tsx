'use client';

import { BundleId, FarmTaskCompletion } from '@/types/tasks';
import {
  Card,
  Checkbox,
  Flex,
  Heading,
  Progress,
  ScrollArea,
  Text,
} from '@radix-ui/themes';
import ProgressBar from '../progress-bar/ProgressBar';
import TaskDetails from '../task-details/TaskDetails';

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
  );
  return (
    <Card key={bundle.bundleId} style={{ padding: 0 }}>
      <Flex direction="column" width="100%">
        <Flex direction="column" p="3" style={{ backgroundColor: 'orange' }}>
          <Heading size="3">
            {bundle.name} {bundle.tasksRequired && ` (${bundle.tasksRequired})`}
          </Heading>
          <Text size="1">Reward: {bundle.reward}</Text>
          <Flex direction="row" gap="1">
            {doneTasks.map(() => (
              <Progress value={100} />
            ))}
            {Array.from({
              length: bundle.tasksRequired - doneTasks.length,
            }).map(() => (
              <Progress value={0} />
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
