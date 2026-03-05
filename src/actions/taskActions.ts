'use server';

import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

import type { FarmTask } from '@prisma/client';
import type { TaskDetails } from '@/types/tasks';
import type { ResponseData, ResponseNoData } from '@/types/response';

export async function getFarmTasks(
  selectedFarmId: string
): Promise<ResponseData<FarmTask[]>> {
  const user = await getCurrentUser();
  if (!user?.id) {
    return { success: false, error: 'Unauthorized.' };
  }
  try {
    if (!selectedFarmId) {
      return { success: false, error: 'Farm not found.' };
    }
    // Verify farm belongs to user
    const farm = await prisma.farm.findUnique({
      where: { id: selectedFarmId, userId: user.id },
    });
    if (!farm) {
      return { success: false, error: 'Unauthorized: Farm not found.' };
    }
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
  const user = await getCurrentUser();
  if (!user?.id) {
    return { success: false, error: 'Unauthorized.' };
  }
  try {
    if (!selectedFarmId) {
      return { success: false, error: 'Farm not found.' };
    }
    // Verify farm belongs to user
    const farm = await prisma.farm.findUnique({
      where: { id: selectedFarmId, userId: user.id },
    });
    if (!farm) {
      return { success: false, error: 'Unauthorized: Farm not found.' };
    }
    await prisma.farmTask.upsert({
      where: { farmId_taskId: { farmId: selectedFarmId, taskId } },
      update: { completed },
      create: { farmId: selectedFarmId, taskId, completed },
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
