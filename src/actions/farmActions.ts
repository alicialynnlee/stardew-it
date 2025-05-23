/* eslint-disable no-console */
'use server';

import { prisma } from '@/lib/prisma';
import type { Farm } from '@prisma/client';

// --- Action to Fetch Current User's Farms ---
export async function getFarms(
  userId: string
): Promise<{ success: boolean; farms?: Farm[]; error?: string }> {
  if (!userId) {
    return { success: false, error: 'Unauthorized: User not found.' };
  }
  try {
    const farms = await prisma.farm.findMany({
      where: { userId: userId },
      orderBy: { name: 'asc' },
    });
    return { success: true, farms: farms };
  } catch (error) {
    console.error('Error fetching farms:', error);
    return { success: false, error: 'Failed to fetch farms.' };
  }
}

// --- Action to Add a New Farm for the Current User ---
export async function addFarm(
  farmName: string,
  userId: string
): Promise<{
  success: boolean;
  farm?: Farm;
  error?: string;
  fieldErrors?: { name?: string[] };
}> {
  if (!userId) {
    return { success: false, error: 'Unauthorized: User not found.' };
  }
  // Validate input is string and not empty
  if (typeof farmName !== 'string' || farmName.trim() === '') {
    return {
      success: false,
      error: 'Invalid input.',
      fieldErrors: { name: ['Farm name cannot be empty.'] },
    };
  }

  try {
    // add farm to database
    const newFarm = await prisma.farm.create({
      data: {
        name: farmName,
        userId: userId,
      },
    });
    console.info('New farm created:', newFarm);
    // get all tasks
    const tasks = await prisma.task.findMany({
      select: { id: true },
    });
    if (tasks.length > 0) {
      // add farmtasks
      const farmTasks = tasks.map((task) => ({
        taskId: task.id,
        farmId: newFarm.id,
        completed: false,
      }));
      await prisma.farmTask.createMany({
        data: farmTasks,
      });
    }
    return { success: true, farm: newFarm };
  } catch (error) {
    console.error('Error adding farm:', error);
    return { success: false, error: 'Failed to add farm.' };
  }
}

export async function deleteFarmAction(farmId: string, userId: string) {
  if (!userId) {
    return { success: false, error: 'Unauthorized: User not found.' };
  }
  try {
    await prisma.farm.delete({
      where: { id: farmId, userId: userId },
    });
    console.info('Farm deleted:', farmId);
    return { success: true };
  } catch (error) {
    console.error('Error deleting farm:', error);
    return { success: false, error: 'Failed to delete farm.' };
  }
}

export async function getSelectedFarm(userId: string): Promise<{
  success: boolean;
  farmId?: string;
  error?: string;
}> {
  if (!userId) {
    return { success: false, error: 'Unauthorized: User not found.' };
  }
  const farm = await prisma.user.findUnique({
    where: { id: userId },
    select: { selectedFarmId: true },
  });
  if (!farm || !farm.selectedFarmId) {
    return { success: false, error: 'Farm not found.' };
  }
  return { success: true, farmId: farm.selectedFarmId };
}

export async function setSelectedFarmAction(
  farmId: string,
  userId: string
): Promise<{
  success: boolean;
  error?: string;
}> {
  if (!userId) {
    return { success: false, error: 'Unauthorized: User not found.' };
  }
  if (typeof farmId !== 'string' || farmId.trim() === '' || farmId === null) {
    try {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { selectedFarmId: null },
      });
      console.info('Selected farm reset:', updatedUser);
      return { success: true };
    } catch (error) {
      console.error('Error resetting selected farm:', error);
      return { success: false, error: 'Failed to reset selected farm.' };
    }
  }

  // validate farmId is a valid farmId
  const farm = await prisma.farm.findUnique({
    where: { id: farmId, userId: userId },
  });
  if (!farm) {
    return { success: false, error: 'Invalid farm.' };
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { selectedFarmId: farmId },
    });
    console.info('Selected farm updated:', updatedUser);
    return { success: true };
  } catch (error) {
    console.error('Error updating selected farm:', error);
    return { success: false, error: 'Failed to update selected farm.' };
  }
}
