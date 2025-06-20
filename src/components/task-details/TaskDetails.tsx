'use client';

import {
  FarmTaskCompletion,
  TaskDetails as TaskDetailsType,
  TaskId,
} from '@/types/tasks';
import { CheckIcon, Cross2Icon } from '@radix-ui/react-icons';
import * as Styled from './TaskDetails.styled';
import { Text, Dialog, Separator, Button } from '@radix-ui/themes';
import { useState } from 'react';
import { useTasks } from '@/hooks/useTasks';
import { useCalendarEventsForTask } from '@/hooks/useCalendarEvents';

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
  const [taskDetails, setTaskDetails] = useState<TaskDetailsType | null>(null);
  const { getTaskDetails } = useTasks(null);
  const {
    calendarEvents,
    isLoading: calendarLoading,
    error: calendarError,
  } = useCalendarEventsForTask(task.taskId);

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
          onClick={handleToggle}
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
        <Dialog.Description>
          Bundle: {taskDetails?.bundle.name}
          <Separator my="3" size="4" />
          {calendarLoading ? (
            <Text size="2" color="gray">
              Loading calendar events...
            </Text>
          ) : calendarError ? (
            <Text size="2" color="red">
              Error loading calendar events: {calendarError}
            </Text>
          ) : calendarEvents.length > 0 ? (
            calendarEvents.map((ce) => (
              <div key={ce.id}>
                <Text size="2" weight="medium">
                  {ce.date}: {ce.name}
                </Text>
                {ce.description && (
                  <Text size="2" color="gray" as="p">
                    {ce.description}
                  </Text>
                )}
              </div>
            ))
          ) : (
            <Text size="2" color="gray">
              No calendar events associated with this task.
            </Text>
          )}
          <Separator my="3" size="4" />
        </Dialog.Description>
        <Dialog.Close>
          <Button
            my="3"
            onClick={() =>
              updateTask(task.taskId, !farmTaskCompletion.get(task.taskId))
            }
          >
            Mark{' '}
            {farmTaskCompletion.get(task.taskId) ? 'Uncompleted' : 'Completed'}
            {farmTaskCompletion.get(task.taskId) ? (
              <Cross2Icon />
            ) : (
              <CheckIcon />
            )}
          </Button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  );
}
