'use client';

import { FarmTaskCompletion, RoomId } from '@/types/tasks';
import { Card } from '@radix-ui/themes';
import { Accordion } from 'radix-ui';
import BundleDrawer from './BundleDrawer';
import * as Styled from './TrackerComonents.styled';

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
    <Card
      key={room.roomId}
      size="4"
      variant="surface"
      style={{ margin: '1rem 0' }}
    >
      <Styled.DropdownHeader>
        <h2>{room.roomName}</h2>
      </Styled.DropdownHeader>
      <Accordion.Root type="multiple">
        {room.bundleIds.map((bundle) => (
          <BundleDrawer
            key={bundle.bundleId}
            bundle={bundle}
            farmTaskCompletion={farmTaskCompletion}
            updateTask={updateTask}
          />
        ))}
      </Accordion.Root>
    </Card>
  );
}
