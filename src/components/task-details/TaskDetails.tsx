'use client';

import {
  FarmTaskCompletion,
  TaskDetails as TaskDetailsType,
  TaskId,
} from '@/types/tasks';
import { CheckIcon, Cross2Icon } from '@radix-ui/react-icons';
import {
  Text,
  Dialog,
  Separator,
  Button,
  Flex,
  IconButton,
} from '@radix-ui/themes';
import { useState } from 'react';
import { getTaskDetails as getTaskDetailsAction } from '@/actions/taskActions';
import { getCalendarEventsForTask } from '@/actions/calendarActions';
import type { CalendarEventWithTasks } from '@/types/calendar';
import { ChecklistItem } from '../ui';

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
  const [calendarEvents, setCalendarEvents] = useState<
    CalendarEventWithTasks[]
  >([]);
  const [calendarLoading, setCalendarLoading] = useState(false);
  const [calendarError, setCalendarError] = useState<string | null>(null);

  const handleToggle = async () => {
    if (!isOpen) {
      try {
        setCalendarLoading(true);
        const [detailsResult, calendarResult] = await Promise.all([
          getTaskDetailsAction(task.taskId),
          getCalendarEventsForTask(task.taskId),
        ]);
        if (detailsResult.success && detailsResult.data) {
          setTaskDetails(detailsResult.data);
          setIsOpen(true);
        }
        if (calendarResult.success && calendarResult.data) {
          setCalendarEvents(calendarResult.data as CalendarEventWithTasks[]);
        } else if (!calendarResult.success) {
          setCalendarError(
            calendarResult.error ?? 'Could not fetch calendar events'
          );
        }
      } catch {
        setTaskDetails(null);
      } finally {
        setCalendarLoading(false);
      }
    } else {
      setIsOpen(false);
      setTaskDetails(null);
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button
          key={task.taskId}
          variant="ghost"
          color="gray"
          onClick={handleToggle}
          style={{ justifyContent: 'flex-start' }}
        >
          <ChecklistItem
            onToggle={(completed) => updateTask(task.taskId, completed)}
            isCompleted={farmTaskCompletion.get(task.taskId) ?? false}
            label={task.name}
          />
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="DialogContent">
        <Flex justify="between">
          <Dialog.Title>{task.name}</Dialog.Title>
          <Dialog.Close>
            <IconButton
              radius="full"
              variant="soft"
              color="gray"
              aria-label="Close"
            >
              <Cross2Icon />
            </IconButton>
          </Dialog.Close>
        </Flex>

        <Dialog.Description>
          Bundle: {taskDetails?.bundle.name}
        </Dialog.Description>
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
