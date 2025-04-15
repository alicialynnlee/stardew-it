'use server';

import { prisma } from '@/lib/prisma';

import type { FarmTask, Room } from '@prisma/client';
import type { ResponseData, ResponseNoData } from '@/types/response';

export async function getRooms(): Promise<ResponseData<Room[]>> {
  try {
    const rooms = await prisma.room.findMany({
      include: {
        bundles: {
          include: {
            tasks: true,
          },
          orderBy: {
            name: 'asc',
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });
    return { success: true, data: rooms };
  } catch (error) {
    console.error('Failed to fetch rooms:', error);
    return { success: false, error: 'Failed to fetch rooms' };
  }
}

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
