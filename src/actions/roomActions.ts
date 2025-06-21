'use server';

import { prisma } from '@/lib/prisma';
import type { ResponseData } from '@/types/response';
import type { RoomWithBundlesAndTasks } from '@/types/tasks';

export async function getRooms(): Promise<
  ResponseData<RoomWithBundlesAndTasks[]>
> {
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
    return { success: true, data: rooms as RoomWithBundlesAndTasks[] };
  } catch (error) {
    console.error('Failed to fetch rooms:', error);
    return { success: false, error: 'Failed to fetch rooms' };
  }
}
