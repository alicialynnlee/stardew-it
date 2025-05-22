'use client';

import { FarmTaskCompletion, TaskId } from '@/types/tasks';
import { Cross2Icon } from '@radix-ui/react-icons';
import * as Styled from './TaskDetails.styled';
import { Text, Dialog } from '@radix-ui/themes';
import { useState } from 'react';
import { useTasks } from '@/hooks/useTasks';
import { Task } from '@prisma/client';

export default function TaskDetails({
  task,
  farmTaskCompletion,
  updateTask,
}: {
  task: TaskId;
  farmTaskCompletion: FarmTaskCompletion;
  updateTask: (taskId: string, completed: boolean) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [taskDetails, setTaskDetails] = useState<Task | null>(null);
  const { getTaskDetails } = useTasks(null);

  const handleToggle = async () => {
    if (!isOpen) {
      try {
        const result = await getTaskDetails(task.taskId);
        if (result.success && result.data) {
          setTaskDetails(result.data);
          setIsOpen(true);
        }
      } catch {
        setTaskDetails(null);
      }
    } else {
      setIsOpen(false);
      setTaskDetails(null);
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Styled.TaskLabel
          key={task.taskId}
          variant="outline"
          color="gray"
          onClick={() => setIsOpen(!isOpen)}
        >
          <input
            type="checkbox"
            checked={farmTaskCompletion.get(task.taskId)}
            onChange={(e) => updateTask(task.taskId, e.target.checked)}
          />
          <Text size="2">{task.name}</Text>
        </Styled.TaskLabel>
      </Dialog.Trigger>
      <Dialog.Content className="DialogContent">
        <Dialog.Close>
          <Styled.CloseButton
            radius="full"
            variant="soft"
            color="gray"
            aria-label="Close"
          >
            <Cross2Icon />
          </Styled.CloseButton>
        </Dialog.Close>
        <Dialog.Title>{task.name}</Dialog.Title>
        <Dialog.Description>bundle: {taskDetails?.bundleId}</Dialog.Description>
      </Dialog.Content>
    </Dialog.Root>
  );
}
