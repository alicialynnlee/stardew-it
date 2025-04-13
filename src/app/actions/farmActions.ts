'use server';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import type { Farm } from '@prisma/client';

// --- Action to Fetch Current User's Farms ---
export async function getFarms(): Promise<{ success: boolean; farms?: Farm[]; error?: string }> {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: 'Unauthorized: User not logged in.' };
  }
  const userId = session.user.id;

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
    formData: FormData
): Promise<{ success: boolean; farm?: Farm; error?: string; fieldErrors?: { name?: string[] } }> {
    const session = await auth();
    if (!session?.user?.id) {
        return { success: false, error: 'Unauthorized: User not logged in.' };
    }
    const userId = session.user.id;

    const rawFormData = {
      name: formData.get('newFarmName'),
    };

    // Validate input is string and not empty
    if (typeof rawFormData.name !== 'string' || rawFormData.name.trim() === '') {
        return {
            success: false,
            error: 'Invalid input.',
            fieldErrors: { name: ['Farm name cannot be empty.'] },
        };
    }

    try {
        const newFarm = await prisma.farm.create({
            data: {
                name: rawFormData.name,
                userId: userId,
            },
        });
        console.log('New farm created:', newFarm);
        return { success: true, farm: newFarm };
    } catch (error) {
        console.error('Error adding farm:', error);
        return { success: false, error: 'Failed to add farm.' };
    }
}

export async function deleteFarm(farmId: string) {
    const session = await auth();
    if (!session?.user?.id) {
        return { success: false, error: 'Unauthorized: User not logged in.' };
    }
    const userId = session.user.id;

    try {
        await prisma.farm.delete({
            where: { id: farmId, userId: userId },
        });
        console.log('Farm deleted:', farmId);
        return { success: true };
    } catch (error) {
        console.error('Error deleting farm:', error);
        return { success: false, error: 'Failed to delete farm.' };
    }
}
