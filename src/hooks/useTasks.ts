'use client';

import { useState, useEffect, useCallback, useTransition } from 'react';
import {
  getFarmTasks,
  updateFarmTask,
  getTaskDetails as getTaskDetailsAction,
} from '@/actions/taskActions';
import type { FarmTaskCompletion, TaskDetails } from '@/types/tasks';
import { ResponseData, ResponseNoData } from '@/types/response';

export function useTasks(selectedFarmId: string | null) {
  const [farmTaskCompletion, setFarmTaskCompletion] =
    useState<FarmTaskCompletion>(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

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
    if (selectedFarmId) {
      fetchFarmTasks();
    }
  }, [selectedFarmId, fetchFarmTasks]);

  const updateTask = useCallback(
    async (taskId: string, completed: boolean): Promise<ResponseNoData> => {
      if (!selectedFarmId) {
        return {
          success: false,
          error: 'No farm selected',
        };
      }

      // Optimistic update — flip the checkbox instantly without waiting for the server
      setFarmTaskCompletion((prev) => new Map(prev).set(taskId, completed));

      let result: ResponseNoData = {
        success: false,
        error: 'Failed to update task',
      };

      await new Promise<void>((resolve) => {
        startTransition(async () => {
          result = await updateFarmTask(selectedFarmId, taskId, completed);
          if (!result.success) {
            // Revert to the previous value if the server call failed
            setFarmTaskCompletion((prev) =>
              new Map(prev).set(taskId, !completed)
            );
            setError(result.error ?? 'Failed to update task.');
          }
          resolve();
        });
      });

      return result;
    },
    [selectedFarmId]
  );

  const getTaskDetails = useCallback(
    async (taskId: string): Promise<ResponseData<TaskDetails>> => {
      const result = await getTaskDetailsAction(taskId);
      return result;
    },
    []
  );

  return {
    farmTaskCompletion,
    isLoading,
    isPending,
    error,
    updateTask,
    getTaskDetails,
  };
}
