'use server';

import { prisma } from '@/lib/prisma';

import type { Room } from '@prisma/client';
import type { ResponseData } from '@/types/response';

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
