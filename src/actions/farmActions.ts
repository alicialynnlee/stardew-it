/* eslint-disable no-console */
'use server';

import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import type { Farm } from '@prisma/client';

// --- Action to Fetch Current User's Farms ---
export async function getFarms(): Promise<{
  success: boolean;
  farms?: Farm[];
  error?: string;
}> {
  const user = await getCurrentUser();
  if (!user?.id) {
    return { success: false, error: 'Unauthorized: User not found.' };
  }
  try {
    const farms = await prisma.farm.findMany({
      where: { userId: user.id },
      orderBy: { name: 'asc' },
    });
    return { success: true, farms };
  } catch (error) {
    console.error('Error fetching farms:', error);
    return { success: false, error: 'Failed to fetch farms.' };
  }
}

// --- Action to Add a New Farm for the Current User ---
export async function addFarm(farmName: string): Promise<{
  success: boolean;
  farm?: Farm;
  error?: string;
  fieldErrors?: { name?: string[] };
}> {
  const user = await getCurrentUser();
  if (!user?.id) {
    return { success: false, error: 'Unauthorized: User not found.' };
  }

  if (typeof farmName !== 'string' || farmName.trim() === '') {
    return {
      success: false,
      error: 'Invalid input.',
      fieldErrors: { name: ['Farm name cannot be empty.'] },
    };
  }

  try {
    const newFarm = await prisma.farm.create({
      data: {
        name: farmName,
        userId: user.id,
      },
    });
    console.info('New farm created:', newFarm);

    const tasks = await prisma.task.findMany({
      select: { id: true },
    });
    if (tasks.length > 0) {
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

export async function deleteFarmAction(farmId: string) {
  const user = await getCurrentUser();
  if (!user?.id) {
    return { success: false, error: 'Unauthorized: User not found.' };
  }
  try {
    await prisma.farm.delete({
      where: { id: farmId, userId: user.id },
    });
    console.info('Farm deleted:', farmId);
    return { success: true };
  } catch (error) {
    console.error('Error deleting farm:', error);
    return { success: false, error: 'Failed to delete farm.' };
  }
}

export async function getSelectedFarm(): Promise<{
  success: boolean;
  farmId?: string;
  error?: string;
}> {
  const user = await getCurrentUser();
  if (!user?.id) {
    return { success: false, error: 'Unauthorized: User not found.' };
  }
  const userRecord = await prisma.user.findUnique({
    where: { id: user.id },
    select: { selectedFarmId: true },
  });
  if (!userRecord || !userRecord.selectedFarmId) {
    return { success: false, error: 'Farm not found.' };
  }
  return { success: true, farmId: userRecord.selectedFarmId };
}

export async function setSelectedFarmAction(farmId: string): Promise<{
  success: boolean;
  error?: string;
}> {
  const user = await getCurrentUser();
  if (!user?.id) {
    return { success: false, error: 'Unauthorized: User not found.' };
  }

  if (typeof farmId !== 'string' || farmId.trim() === '' || farmId === null) {
    try {
      const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: { selectedFarmId: null },
      });
      console.info('Selected farm reset:', updatedUser);
      return { success: true };
    } catch (error) {
      console.error('Error resetting selected farm:', error);
      return { success: false, error: 'Failed to reset selected farm.' };
    }
  }

  // Verify the farm belongs to this user
  const farm = await prisma.farm.findUnique({
    where: { id: farmId, userId: user.id },
  });
  if (!farm) {
    return { success: false, error: 'Invalid farm.' };
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { selectedFarmId: farmId },
    });
    console.info('Selected farm updated:', updatedUser);
    return { success: true };
  } catch (error) {
    console.error('Error updating selected farm:', error);
    return { success: false, error: 'Failed to update selected farm.' };
  }
}
