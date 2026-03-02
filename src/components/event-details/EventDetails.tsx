'use client';

import { Cross2Icon } from '@radix-ui/react-icons';
import * as Styled from './EventDetails.styled';
import { Text, Dialog, Separator, Button, Badge, Flex } from '@radix-ui/themes';
import { useState } from 'react';
import { CalendarEventWithTasks } from '@/types/calendar';
import { FarmTaskCompletion } from '@/types/tasks';

export default function EventDetails({
  event,
  changeSelectedEvent,
  farmTaskCompletion,
  updateTask,
}: {
  event: CalendarEventWithTasks;
  changeSelectedEvent: (event: CalendarEventWithTasks | null) => void;
  farmTaskCompletion?: FarmTaskCompletion;
  updateTask?: (taskId: string, completed: boolean) => void;
}) {
  const [isOpen, setIsOpen] = useState(true);

  const completedCount = farmTaskCompletion
    ? event.tasks.filter((t) => farmTaskCompletion.get(t.id)).length
    : 0;

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={() => {
        setIsOpen(!isOpen);
        changeSelectedEvent(isOpen ? null : event);
      }}
    >
      <Dialog.Content className="DialogContent">
        <Dialog.Close>
          <Styled.CloseButton
            radius="full"
            variant="soft"
            color="gray"
            aria-label="Close"
            onClick={() => {
              setIsOpen(false);
              changeSelectedEvent(null);
            }}
          >
            <Cross2Icon />
          </Styled.CloseButton>
        </Dialog.Close>
        <Dialog.Title>{event.name}</Dialog.Title>

        <Flex direction="row" gap="1">
          <Text size="3" weight="bold">
            {event.date === 'year-round' ? 'Year Round' : event.date}
          </Text>
          {/* TODO: vars not available because dialog renders outside. */}
          <Badge
            style={{
              backgroundColor: `var(--task-color-${event.type}, #D9D9D9)`,
              color: `color-mix(in oklab, var(--task-color-${event.type}), black 60%)`,
            }}
          >
            {event.type}
          </Badge>
        </Flex>
        {event.description && (
          <Dialog.Description>
            <br />
            {event.description}
          </Dialog.Description>
        )}
        {event.tasks && event.tasks.length > 0 && (
          <div>
            <Separator my="3" size="4" />
            <Text size="3" weight="bold">
              Associated Tasks
            </Text>
            {farmTaskCompletion && (
              <Text size="2" color="gray" as="p">
                {completedCount} / {event.tasks.length} completed
              </Text>
            )}
            {event.tasks.map((task) => {
              const isCompleted = farmTaskCompletion?.get(task.id) ?? false;

              if (farmTaskCompletion && updateTask) {
                return (
                  <Styled.TaskRow key={task.id}>
                    <input
                      type="checkbox"
                      checked={isCompleted}
                      onChange={(e) => updateTask(task.id, e.target.checked)}
                    />
                    <Styled.TaskName $isCompleted={isCompleted}>
                      <Text size="2" weight={'bold'}>
                        {task.name}
                        {task.description && ': '}
                      </Text>
                      {task.description && (
                        <Text size="2">{task.description}</Text>
                      )}
                    </Styled.TaskName>
                  </Styled.TaskRow>
                );
              }

              return (
                <Text size="2" color="gray" as="p" key={task.id}>
                  {task.name}
                </Text>
              );
            })}
          </div>
        )}
        <Dialog.Close>
          <Button my="3">Close</Button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  );
}
