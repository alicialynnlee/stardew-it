'use server';

import { prisma } from '@/lib/prisma';

import type { FarmTask } from '@prisma/client';
import type { TaskDetails } from '@/types/tasks';
import type { ResponseData, ResponseNoData } from '@/types/response';

export async function getFarmTasks(
  selectedFarmId: string
): Promise<ResponseData<FarmTask[]>> {
  try {
    // get user's selected farm
    if (!selectedFarmId) {
      return { success: false, error: 'Farm not found.' };
    }
    // get farm tasks
    const farmTasks = await prisma.farmTask.findMany({
      where: { farmId: selectedFarmId },
    });
    return { success: true, data: farmTasks };
  } catch (error) {
    console.error('Failed to fetch farm tasks:', error);
    return { success: false, error: 'Failed to fetch farm tasks' };
  }
}

export async function updateFarmTask(
  selectedFarmId: string,
  taskId: string,
  completed: boolean
): Promise<ResponseNoData> {
  try {
    if (!selectedFarmId) {
      return { success: false, error: 'Farm not found.' };
    }
    // update farm task
    await prisma.farmTask.update({
      where: { farmId_taskId: { farmId: selectedFarmId, taskId } },
      data: { completed },
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to update farm task:', error);
    return { success: false, error: 'Failed to update farm task' };
  }
}

export async function getTaskDetails(
  taskId: string
): Promise<ResponseData<TaskDetails>> {
  try {
    // get farm tasks
    const task = await prisma.task.findUnique({
      where: { id: taskId },
      include: {
        calendarEvents: true,
        bundle: true,
      },
    });
    if (!task) {
      return { success: false, error: 'No task found' };
    }
    return { success: true, data: task };
  } catch (error) {
    console.error('Failed to get task details:', error);
    return { success: false, error: 'Failed to get task details' };
  }
}
