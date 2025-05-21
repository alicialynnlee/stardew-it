'use client';

import { WarningBanner } from '@/components';
import { useTasks } from '@/hooks/useTasks';
import { useRooms } from '@/hooks/useRooms';
import { Box } from '@radix-ui/themes';
import * as Styled from './tracker.styled';

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

  if (roomsLoading) return <div>Loading...</div>;
  if (roomsError) return <div>Error: {roomsError}</div>;
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

      <h1>Tracker</h1>
      {roomCollection.map((room) => (
        <Styled.RoomContainer key={room.roomId}>
          <h2>{room.roomName}</h2>
          {room.bundleIds.map((bundle) => (
            <div key={bundle.bundleId}>
              <h3>
                {bundle.name}
                {bundle.tasksRequired && ` (${bundle.tasksRequired})`}
              </h3>
              {bundle.taskIds.map((taskId) => (
                <Styled.TaskContainer key={taskId.taskId}>
                  <input
                    type="checkbox"
                    checked={farmTaskCompletion.get(taskId.taskId)}
                    onChange={(e) =>
                      updateTask(taskId.taskId, e.target.checked)
                    }
                  />
                  <h4>{taskId.name}</h4>
                </Styled.TaskContainer>
              ))}
            </div>
          ))}
        </Styled.RoomContainer>
      ))}
    </div>
  );
}
