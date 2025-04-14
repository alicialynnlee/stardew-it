'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  getFarmTasks,
  getRooms,
  updateFarmTask,
} from '@/app/actions/taskActions';
import type { Room } from '@prisma/client';

export function useTasks(farmId: string | null) {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllRooms = async () => {
      try {
        const result = await getRooms();
        setRooms(result.rooms);
        if (farmId && result.rooms && result.rooms.length > 0) {
          const result = await getFarmTasks(farmId);
          for (const room of rooms) {
            for (const bundle of room.bundles) {
              for (const task of bundle.tasks) {
                const farmTask = result.farmTasks.find(
                  (ft) => ft.taskId === task.id
                );
                if (farmTask) {
                  task.completed = farmTask.completed;
                }
              }
            }
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllRooms();
  }, []);

  const updateTask = useCallback(
    async (
      taskId: string,
      completed: boolean
    ): Promise<{
      success: boolean;
      error?: string;
    }> => {
      if (!farmId) {
        setError('No farm selected');
        return { success: false, error: 'No farm selected' };
      }
      const result = await updateFarmTask(taskId, completed);
      if (!result.success) {
        setError(result.error ?? 'Failed to update task.');
        return { success: false, error: result.error };
      }
      return { success: true };
    },
    [farmId]
  );

  return { rooms, isLoading, error };
}
