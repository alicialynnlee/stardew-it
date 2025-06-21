import { Bundle, CalendarEvent, Room, Task } from '@prisma/client';

// Types for entities with relations included
type RoomWithBundlesAndTasks = Room & {
  bundles: (Bundle & {
    tasks: Task[];
  })[];
};

type BundleWithTasks = Bundle & {
  tasks: Task[];
};

/**
 * Defines the FarmTaskCompletion type.
 * key: taskId
 * value: completed
 */
type FarmTaskCompletion = Map<string, boolean>;

/**
 * Defines the structure for task identifiers.
 */
interface TaskId {
  taskId: string;
  name: string;
}

/**
 * Defines the structure for task details.
 */
interface TaskDetails {
  id: string;
  name: string;
  bundle: Bundle;
  calendarEvents: CalendarEvent[];
}

/**
 * Defines the structure for bundle identifiers, including the task IDs associated with it.
 */
interface BundleId {
  bundleId: string;
  name: string;
  tasksRequired: number;
  reward: string | null;
  taskIds: TaskId[];
}

/**
 * Defines the structure for room identifiers, including the bundle IDs associated with each room.
 */
interface RoomId {
  roomId: string;
  roomName: string;
  bundleIds: BundleId[];
}

/**
 * A type that represents a collection of RoomIds
 */
type RoomIdCollection = RoomId[];

export type {
  RoomIdCollection,
  RoomId,
  BundleId,
  TaskId,
  FarmTaskCompletion,
  TaskDetails,
  RoomWithBundlesAndTasks,
  BundleWithTasks,
};
