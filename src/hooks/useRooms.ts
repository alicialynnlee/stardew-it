'use client';

import { useState, useEffect, useCallback } from 'react';
import { getRooms } from '@/actions/roomActions';
import type { RoomIdCollection, RoomWithBundlesAndTasks } from '@/types/tasks';

export function useRooms() {
  const [roomCollection, setRoomCollection] = useState<RoomIdCollection>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllRooms = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getRooms();
      if (result.success && result.data) {
        const rooms = result.data;
        const roomCollection: RoomIdCollection = rooms.map(
          (room: RoomWithBundlesAndTasks) => ({
            roomId: room.id,
            roomName: room.name,
            bundleIds: room.bundles.map((bundle) => ({
              bundleId: bundle.id,
              name: bundle.name,
              tasksRequired: bundle.tasksRequired,
              reward: bundle?.reward,
              taskIds: bundle.tasks.map((task) => ({
                taskId: task.id,
                name: task.name,
              })),
            })),
          })
        );
        setRoomCollection(roomCollection);
      } else if (!result.success) {
        setError(result.error ?? 'Could not fetch rooms');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not fetch rooms');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllRooms();
  }, [fetchAllRooms]);

  return {
    roomCollection,
    isLoading,
    error,
  };
}
