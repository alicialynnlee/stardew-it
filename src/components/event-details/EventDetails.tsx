'use client';

import { Cross2Icon } from '@radix-ui/react-icons';
import * as Styled from './EventDetails.styled';
import { Text, Dialog, Separator, Button } from '@radix-ui/themes';
import { useState } from 'react';
import { CalendarEventWithTasks } from '@/types/calendar';

export default function EventDetails({
  event,
  changeSelectedEvent,
}: {
  event: CalendarEventWithTasks;
  changeSelectedEvent: (event: CalendarEventWithTasks | null) => void;
}) {
  const [isOpen, setIsOpen] = useState(true);
  // const { getEventDetails } = useTasks(null);
  // const {
  //   calendarEvents,
  //   isLoading: calendarLoading,
  //   error: calendarError,
  // } = useCalendarEventsForTask(task.taskId);

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
        <Dialog.Title>{event.date}</Dialog.Title>
        <Dialog.Description>
          <Text size="3" weight="bold">
            {event.name}
          </Text>
          {event.description && (
            <Text size="2" color="gray" as="p">
              {event.description}
            </Text>
          )}
          {event.tasks && event.tasks.length > 0 && (
            <>
              <Separator my="3" size="4" />
              <Text size="3" weight="bold">
                Associated Tasks
              </Text>
              {event.tasks.map((task) => (
                <Text size="2" color="gray" as="p" key={task.id}>
                  {task.name}
                </Text>
              ))}
            </>
          )}
        </Dialog.Description>
        <Dialog.Close>
          <Button my="3">Close</Button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  );
}
