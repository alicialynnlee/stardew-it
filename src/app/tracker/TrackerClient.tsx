'use client';

import { useTasks } from '@/hooks/useTasks';
import Link from 'next/link';
import * as Styled from './tracker.styled';

export default function TrackerClient({
  userId,
  selectedFarmId,
}: {
  userId: string | null;
  selectedFarmId: string | null;
}) {
  const { roomCollection, farmTaskCompletion, isLoading, error, updateTask } =
    useTasks(selectedFarmId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {!userId && (
        <Styled.WarningBanner>
          <span>
            ⚠️ You must be <Link href="/auth">signed in</Link> and have a farm
            selected to save your progress.
          </span>
        </Styled.WarningBanner>
      )}
      {userId && !selectedFarmId && (
        <Styled.WarningBanner>
          <span>
            ⚠️ Please select a farm from the navigation bar to track your
            progress.
          </span>
        </Styled.WarningBanner>
      )}

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
                    checked={farmTaskCompletion.get(taskId.taskId) || false}
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
