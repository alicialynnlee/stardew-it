'use client';

import { useState } from 'react';
import { ProgressCircle, RoomDrawer, WarningBanner } from '@/components';
import { useTasks } from '@/hooks/useTasks';
import { useRooms } from '@/hooks/useRooms';
import { BundleId } from '@/types/tasks';
import { Box, Button, Flex, Grid, Tabs, Text } from '@radix-ui/themes';
import { ChevronRightIcon } from '@radix-ui/react-icons';

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

  const [activeRoom, setActiveRoom] = useState('all');

  if (roomsLoading) return <div>Loading...</div>;
  if (roomsError) return <div>Error: {roomsError}</div>;

  const getPercentageComplete = (bundle: BundleId) => {
    const required = bundle.tasksRequired;
    const completed = bundle.taskIds.filter((taskId) =>
      farmTaskCompletion.get(taskId.taskId)
    ).length;
    return (completed / required) * 100;
  };

  return (
    <div>
      <Box py="3">
        {(!userId || (userId && !selectedFarmId)) && (
          <WarningBanner
            text={
              userId
                ? 'Please select a farm from the navigation bar to track your progress.'
                : 'You must be <Link href="/auth">signed in</Link> and have a farm selected to save your progress.'
            }
          />
        )}
      </Box>

      {roomsLoading && <div>Loading...</div>}
      {roomsError && <div>Error: {roomsError}</div>}
      <h1>My Task Tracker</h1>
      <Tabs.Root defaultValue="all" value={activeRoom}>
        <Tabs.List>
          <Tabs.Trigger
            value="all"
            key="trigger-all"
            onClick={() => setActiveRoom('all')}
          >
            All Rooms
          </Tabs.Trigger>
          {roomCollection.map((room) => (
            <Tabs.Trigger
              value={room.roomId}
              key={`trigger-${room.roomId}`}
              onClick={() => setActiveRoom(room.roomId)}
            >
              {room.roomName}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <Flex gap="5" direction="column">
          <Tabs.Content value="all" key="content-all">
            {roomCollection.map((room) => (
              <Button
                key={room.roomId}
                size="4"
                variant="outline"
                color="gray"
                style={{
                  margin: '1rem 0',
                  width: '100%',
                  height: '96px',
                  justifyContent: 'start',
                }}
                onClick={() => setActiveRoom(room.roomId)}
              >
                <Text weight="bold" size="5" wrap="nowrap">
                  {room.roomName}
                </Text>
                <Grid
                  columns={room.bundleIds.length.toString()}
                  gap="1"
                  style={{ flexGrow: '1' }}
                >
                  {room.bundleIds.map((bundle) => (
                    <Flex
                      key={bundle.bundleId}
                      direction="column"
                      align="center"
                      style={{ textAlign: 'center' }}
                    >
                      <ProgressCircle
                        size={24}
                        percentage={getPercentageComplete(bundle)}
                      />
                      <Text size="1" weight="light" color="gray">
                        {bundle.name}
                      </Text>
                    </Flex>
                  ))}
                </Grid>
                <ChevronRightIcon />
              </Button>
            ))}
          </Tabs.Content>
          {roomCollection.map((room) => (
            <Tabs.Content value={room.roomId} key={`content-${room.roomId}`}>
              <RoomDrawer
                room={room}
                farmTaskCompletion={farmTaskCompletion}
                updateTask={updateTask}
              />
            </Tabs.Content>
          ))}
        </Flex>
      </Tabs.Root>
    </div>
  );
}
