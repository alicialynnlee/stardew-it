'use client';

import { useState } from 'react';
import { ProgressBar, RoomDrawer, WarningBanner } from '@/components';
import { useTasks } from '@/hooks/useTasks';
import { useRooms } from '@/hooks/useRooms';
import { RoomId } from '@/types/tasks';
import {
  Box,
  Flex,
  Grid,
  Text,
  Link,
  Spinner,
  Heading,
  Card,
  Progress,
} from '@radix-ui/themes';
import { ToggleGroup } from 'radix-ui';

export default function TrackerClient({
  userId,
  selectedFarmId,
}: {
  userId: string | null;
  selectedFarmId: string | null;
}) {
  const {
    roomCollection,
    isLoading: roomsLoading,
    error: roomsError,
  } = useRooms();
  const {
    farmTaskCompletion,
    isLoading: tasksLoading,
    error: tasksError,
    updateTask,
  } = useTasks(selectedFarmId);

  const [activeRoom, setActiveRoom] = useState<RoomId>(roomCollection[0]);

  if (roomsLoading) return <Spinner />;
  if (roomsError) return <div>Error: {roomsError}</div>;

  const getBundleCompleteLabel = (room: RoomId) => {
    const required = room.bundleIds.length;
    const completed = room.bundleIds.filter(
      (bundle) =>
        bundle.taskIds.filter((taskId) => farmTaskCompletion.get(taskId.taskId))
          .length >= bundle.tasksRequired
    ).length;
    return `${completed}/${required}`;
  };

  return (
    <Flex direction="column" gap="5">
      {(!userId || (userId && !selectedFarmId)) && (
        <Box py="3">
          <WarningBanner
            content={
              userId ? (
                <>
                  Please select a farm from the navigation bar to track your
                  progress.
                </>
              ) : (
                <>
                  You must be <Link href="/auth">signed in</Link> and have a
                  farm selected to save your progress.
                </>
              )
            }
          />
        </Box>
      )}
      <Card>
        <Heading>Restore the Valley</Heading>
        <Text>75 / 100 Items</Text>
        <Progress value={75} size="3" />
      </Card>
      <ToggleGroup.Root
        type="single"
        defaultValue={activeRoom?.roomId ?? ''}
        value={activeRoom?.roomId}
        aria-label="Room Selector"
      >
        <Grid columns="6" gap="3">
          {roomCollection.map((room) => (
            <ToggleGroup.Item
              value={room.roomId}
              key={`trigger-${room.roomId}`}
              onClick={() => setActiveRoom(room)}
              aria-label={room.roomName}
            >
              <Flex
                align="center"
                justify="center"
                p="3"
                gap="1"
                direction="column"
              >
                <Text>
                  <strong>{room.roomName}</strong>
                </Text>
                <Text size="1">{getBundleCompleteLabel(room)}</Text>
              </Flex>
            </ToggleGroup.Item>
          ))}
        </Grid>
      </ToggleGroup.Root>
      <Flex gap="5" direction="column">
        {activeRoom && (
          <RoomDrawer
            room={activeRoom}
            farmTaskCompletion={farmTaskCompletion}
            updateTask={updateTask}
          />
        )}
      </Flex>
    </Flex>
  );
}
