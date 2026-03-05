'use client';

import { useEffect, useMemo, useState } from 'react';
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
} from '@radix-ui/themes';
import { Card } from '@/components';
import { ToggleGroup } from 'radix-ui';
import {
  mainCreamDark,
  mainDarkText,
  mainWhite,
  pumpkinOrange,
} from '@/styles/colors';
import styled from 'styled-components';
import { getCardVariantStyles } from '@/components/ui/Card';

const BundleButton = styled(ToggleGroup.Item)<{
  $isSelected: boolean;
}>`
  height: 100px;
  ${({ $isSelected }) =>
    getCardVariantStyles(
      $isSelected ? 'featured' : 'tinted',
      pumpkinOrange,
      mainWhite
    )}

  &:hover {
    ${({ $isSelected }) =>
      !$isSelected &&
      `
        background: color-mix(in oklab, ${mainCreamDark}, black 10%);
      `}
  }
`;

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

  const [activeRoom, setActiveRoom] = useState<RoomId | undefined>(undefined);

  useEffect(() => {
    if (roomCollection.length > 0 && !activeRoom) {
      setActiveRoom(roomCollection[0]);
    }
  }, [roomCollection, activeRoom]);

  const { totalCompleted, totalTasks } = useMemo(() => {
    let completed = 0;
    let total = 0;
    roomCollection.forEach((room) =>
      room.bundleIds.forEach((bundle) => {
        total += bundle.tasksRequired;
        completed += Math.min(
          bundle.taskIds.filter((taskId) =>
            farmTaskCompletion.get(taskId.taskId)
          ).length,
          bundle.tasksRequired
        );
      })
    );
    return { totalCompleted: completed, totalTasks: total };
  }, [roomCollection, farmTaskCompletion]);

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
      <Card variant="tinted">
        <Flex direction="column" gapY="2">
          <Heading weight="bold">Restore the Valley</Heading>
          <Heading
            size="2"
            style={{ color: mainDarkText }}
          >{`${totalCompleted} / ${totalTasks} Items Donated`}</Heading>
          <ProgressBar
            value={Math.floor((totalCompleted / totalTasks) * 100)}
          />
        </Flex>
      </Card>
      <ToggleGroup.Root
        type="single"
        defaultValue={activeRoom?.roomId ?? ''}
        value={activeRoom?.roomId}
        aria-label="Room Selector"
      >
        <Grid
          columns={{ initial: '2', sm: '2', md: '3', lg: '6' }}
          gap={{ initial: '2', sm: '2', md: '3', lg: '3' }}
        >
          {roomCollection.map((room) => (
            <BundleButton
              value={room.roomId}
              key={`trigger-${room.roomId}`}
              onClick={() => setActiveRoom(room)}
              aria-label={room.roomName}
              $isSelected={
                activeRoom ? activeRoom.roomId === room.roomId : false
              }
            >
              <Flex
                align="center"
                justify="center"
                p="3"
                gap="1"
                direction="column"
              >
                <Text weight="bold">{room.roomName}</Text>
                <Text size="1">{getBundleCompleteLabel(room)}</Text>
              </Flex>
            </BundleButton>
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
