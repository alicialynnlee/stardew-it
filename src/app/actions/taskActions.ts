'use server';

import { prisma } from '@/lib/prisma';
import type { FarmTask, Room } from '@prisma/client';

export async function getRooms(): Promise<{
  rooms: Room[];
  error: string | null;
}> {
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
    return { rooms, error: null };
  } catch (error) {
    console.error('Failed to fetch rooms:', error);
    return { rooms: [], error: 'Failed to fetch rooms' };
  }
}

export async function getFarmTasks(farmId: string): Promise<{
  farmTasks: FarmTask[];
  error: string | null;
}> {
  try {
    const farmTasks = await prisma.farmTask.findMany({
      where: { farmId },
    });
    return { farmTasks, error: null };
  } catch (error) {
    console.error('Failed to fetch farm tasks:', error);
    return { farmTasks: [], error: 'Failed to fetch farm tasks' };
  }
}

export async function updateFarmTask(
  farmTaskId: string,
  completed: boolean
): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    const updatedFarmTask = await prisma.farmTask.update({
      where: { id: farmTaskId },
      data: { completed },
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to update farm task:', error);
    return { success: false, error: 'Failed to update farm task' };
  }
}
