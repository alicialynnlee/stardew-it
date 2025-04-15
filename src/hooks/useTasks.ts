'use client';

import { useState, useEffect, useCallback, useTransition, useRef } from 'react';
import debounce from 'lodash/debounce';
import { getFarmTasks, getRooms, updateFarmTask } from '@/actions/taskActions';
import type { RoomIdCollection, FarmTaskCompletion } from '@/types/tasks';

export function useTasks(selectedFarmId: string | null) {
  const [roomCollection, setRoomCollection] = useState<RoomIdCollection>([]);
  const [farmTaskCompletion, setFarmTaskCompletion] =
    useState<FarmTaskCompletion>(new Map());
  const pendingUpdatesRef = useRef<FarmTaskCompletion>(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const fetchAllRooms = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getRooms();
      if (result.success && result.data) {
        const rooms = result.data;
        const roomCollection: RoomIdCollection = rooms.map((room) => ({
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
        }));
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

  const fetchFarmTasks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    if (!selectedFarmId) {
      setError('No farm selected');
      setIsLoading(false);
      return;
    }
    try {
      const result = await getFarmTasks(selectedFarmId);
      if (result.success && result.data) {
        const farmTasks = result.data;
        setFarmTaskCompletion(
          new Map(farmTasks.map((task) => [task.taskId, task.completed]))
        );
      } else if (!result.success) {
        setError(result.error ?? 'Could not fetch farm tasks');
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Could not fetch farm tasks'
      );
    } finally {
      setIsLoading(false);
    }
  }, [selectedFarmId]);

  useEffect(() => {
    fetchAllRooms();
  }, []);

  useEffect(() => {
    if (selectedFarmId) {
      fetchFarmTasks();
    }
  }, [selectedFarmId]);

  // Debounced sync function
  const debouncedTaskUpdate = useCallback(
    debounce(async () => {
      if (!selectedFarmId) {
        return;
      }
      const updates = Array.from(pendingUpdatesRef.current.entries());

      // Reset pending updates before sending
      pendingUpdatesRef.current.clear();

      await Promise.all(
        updates.map(([taskId, completed]) =>
          updateFarmTask(selectedFarmId, taskId, completed)
        )
      );
    }, 1000), // debounce interval in ms
    []
  );

  const updateTask = (taskId: string, completed: boolean) => {
    setFarmTaskCompletion((prev) => {
      const newMap = new Map(prev);
      newMap.set(taskId, completed);

      // Store pending update
      pendingUpdatesRef.current.set(taskId, completed);

      // Trigger debounced sync
      debouncedTaskUpdate();

      return newMap;
    });
  };

  return {
    roomCollection,
    farmTaskCompletion,
    isLoading,
    isPending,
    error,
    updateTask,
  };
}
