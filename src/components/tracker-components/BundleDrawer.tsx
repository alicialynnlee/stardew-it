'use client';

import { BundleId, FarmTaskCompletion } from '@/types/tasks';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import * as Styled from './TrackerComonents.styled';
import { Text } from '@radix-ui/themes';
import ProgressBar from '../progress-bar/ProgressBar';

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
    <div key={bundle.bundleId}>
      <Styled.DropdownHeader onClick={() => setIsOpen(!isOpen)}>
        <Text size="4">
          {bundle.name} {bundle.tasksRequired && ` (${bundle.tasksRequired})`}
        </Text>
        <ChevronDownIcon
          className={`chevron ${isOpen && 'open'}`}
          aria-hidden
        />
      </Styled.DropdownHeader>
      <Styled.TaskContainer $isOpen={isOpen}>
        <ProgressBar width={getPercentageComplete()} />
        {bundle.taskIds.map((task) => (
          <Styled.TaskLabel key={task.taskId}>
            <input
              type="checkbox"
              checked={farmTaskCompletion.get(task.taskId)}
              onChange={(e) => updateTask(task.taskId, e.target.checked)}
            />
            <Text size="2">{task.name}</Text>
          </Styled.TaskLabel>
        ))}
      </Styled.TaskContainer>
    </div>
  );
}
