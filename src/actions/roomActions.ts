'use server';

import { unstable_cache } from 'next/cache';
import { prisma } from '@/lib/prisma';
import type { ResponseData } from '@/types/response';
import type { RoomWithBundlesAndTasks } from '@/types/tasks';

/**
 * Rooms, bundles, and tasks are seeded once and never change at runtime.
 * Cache indefinitely so Postgres is only hit once per server process.
 * To bust the cache (e.g. after a reseed), restart the server or call
 * revalidateTag('rooms-all') from a server action.
 */
const getCachedRooms = unstable_cache(
  async () => {
    return prisma.room.findMany({
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
  },
  ['rooms-all'],
  { revalidate: false }
);

export async function getRooms(): Promise<
  ResponseData<RoomWithBundlesAndTasks[]>
> {
  try {
    const rooms = await getCachedRooms();
    return { success: true, data: rooms as RoomWithBundlesAndTasks[] };
  } catch (error) {
    console.error('Failed to fetch rooms:', error);
    return { success: false, error: 'Failed to fetch rooms' };
  }
}
