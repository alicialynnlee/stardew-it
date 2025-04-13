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
    const newFarm = await prisma.farm.create({
      data: {
        name: farmName,
        userId: userId,
      },
    });
    console.info('New farm created:', newFarm);
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
