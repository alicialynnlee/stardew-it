'use client';

import { Cross2Icon } from '@radix-ui/react-icons';
import * as Styled from './EventDetails.styled';
import { Text, Dialog, Separator, Flex, Heading } from '@radix-ui/themes';
import { useState } from 'react';
import { CalendarEventWithTasks } from '@/types/calendar';
import { FarmTaskCompletion } from '@/types/tasks';
import {
  ashGray,
  mainBackground,
  mainDarkText,
  sageDark,
  sageGreen,
} from '@/styles/colors';
import { Badge, Card, ChecklistItem, ProgressBar, Button } from '@/components';
import styled from 'styled-components';
import { TASK_CONFIG, TaskType } from '@/constants/taskTypes';
import { SEASONS_CONFIG, SeasonType } from '@/constants/calendar';

const SectionTitle = styled(Text).attrs({
  size: '1',
  weight: 'bold',
})`
  text-transform: uppercase;
  color: ${mainDarkText};
  letter-spacing: 5%;
`;

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

  const eventSeason = (event.date.split(' ')[0] ?? 'Spring') as SeasonType;

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={() => {
        setIsOpen(!isOpen);
        changeSelectedEvent(isOpen ? null : event);
      }}
    >
      <Dialog.Content style={{ backgroundColor: mainBackground }}>
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
        <Dialog.Title style={{ color: mainDarkText }}>
          Task Details
        </Dialog.Title>
        <Flex direction="row" gap="1" my="3">
          {event.date === 'year-round' ? (
            <Badge variant={'primary'} color={ashGray}>
              Year Round
            </Badge>
          ) : (
            <Badge
              variant={'primary'}
              color={SEASONS_CONFIG[eventSeason].backgroundColor}
              style={{
                borderColor: SEASONS_CONFIG[eventSeason].primaryColor,
                color: SEASONS_CONFIG[eventSeason].primaryColor,
              }}
            >
              {event.date}
            </Badge>
          )}

          <Badge
            variant="tertiary"
            color={TASK_CONFIG[(event.type as TaskType) ?? 'other'].color}
          >
            {event.type.toUpperCase()}
          </Badge>
        </Flex>
        <Flex direction="column" gap="1" my="4">
          <SectionTitle>Task</SectionTitle>
          <Heading>{event.name}</Heading>
        </Flex>

        {event.description && (
          <Flex direction="column" gap="1" my="4">
            <SectionTitle>Description</SectionTitle>
            <Dialog.Description>
              <Text size="2">
                <em>{event.description}</em>
              </Text>
            </Dialog.Description>
          </Flex>
        )}
        {event.tasks && event.tasks.length > 0 && (
          <Flex direction="column" gap="1" my="4">
            <Separator my="3" size="4" />

            <Flex direction="row" justify="between">
              <SectionTitle>Associated Tasks</SectionTitle>
              {farmTaskCompletion && (
                <SectionTitle style={{ color: sageDark }}>
                  {completedCount} / {event.tasks.length} tasks completed
                </SectionTitle>
              )}
            </Flex>
            {farmTaskCompletion && (
              <ProgressBar
                value={Math.floor((completedCount / event.tasks.length) * 100)}
                color={sageGreen}
              />
            )}

            {event.tasks.map((task) => {
              const isCompleted = farmTaskCompletion?.get(task.id) ?? false;
              if (farmTaskCompletion && updateTask) {
                return (
                  <ChecklistItem
                    key={task.id}
                    isCompleted={isCompleted}
                    onToggle={(completed) => updateTask(task.id, completed)}
                    label={`${task.name}${task.description ? `: ${task.description}` : ''}`}
                  />
                );
              }

              return (
                <Text size="2" color="gray" as="p" key={task.id}>
                  {task.name}
                </Text>
              );
            })}
          </Flex>
        )}
        <Dialog.Close>
          <Button size="sm">Close</Button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  );
}
