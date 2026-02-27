'use client';

import { FarmTaskCompletion, RoomId } from '@/types/tasks';
import { Grid, Text } from '@radix-ui/themes';
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
    <Grid key={room.roomId} columns="3" gap="3">
      {room.bundleIds.map((bundle) => (
        <BundleDrawer
          key={bundle.bundleId}
          bundle={bundle}
          farmTaskCompletion={farmTaskCompletion}
          updateTask={updateTask}
        />
      ))}
    </Grid>
  );
}
