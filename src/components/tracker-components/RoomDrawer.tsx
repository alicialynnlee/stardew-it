'use client';

import { FarmTaskCompletion, RoomId } from '@/types/tasks';
import { Box, Text } from '@radix-ui/themes';
import BundleDrawer from './BundleDrawer';

export default function RoomDrawer({
  room,
  farmTaskCompletion,
  updateTask,
}: {
  room: RoomId;
  farmTaskCompletion: FarmTaskCompletion;
  updateTask: (taskId: string, completed: boolean) => void;
}) {
  return (
    <Box key={room.roomId} my="4">
      <Text weight="bold" size="6">
        {room.roomName}
      </Text>
      {room.bundleIds.map((bundle) => (
        <BundleDrawer
          key={bundle.bundleId}
          bundle={bundle}
          farmTaskCompletion={farmTaskCompletion}
          updateTask={updateTask}
        />
      ))}
    </Box>
  );
}
