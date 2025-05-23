'use client';

import { BundleId, FarmTaskCompletion } from '@/types/tasks';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import * as Styled from './TrackerComponents.styled';
import { Flex, Text } from '@radix-ui/themes';
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
  const getPercentageComplete = () => {
    const required = bundle.tasksRequired;
    const completed = bundle.taskIds.filter((taskId) =>
      farmTaskCompletion.get(taskId.taskId)
    ).length;
    return (completed / required) * 100;
  };

  const [isOpen, setIsOpen] = useState(true);
  return (
    <Styled.BundleContainer key={bundle.bundleId}>
      <Styled.DropdownHeader>
        <ChevronRightIcon
          className={`chevron ${isOpen && 'open'}`}
          aria-hidden
          onClick={() => setIsOpen(!isOpen)}
        />
        <Flex direction="column" width="100%">
          <Text size="4">
            {bundle.name} {bundle.tasksRequired && ` (${bundle.tasksRequired})`}
          </Text>
          <ProgressBar width={getPercentageComplete()} />
          <Styled.TaskContainer $isOpen={isOpen}>
            {bundle.taskIds.map((task) => (
              <TaskDetails
                key={task.taskId}
                task={task}
                farmTaskCompletion={farmTaskCompletion}
                updateTask={updateTask}
              />
            ))}
          </Styled.TaskContainer>
        </Flex>
      </Styled.DropdownHeader>
    </Styled.BundleContainer>
  );
}
