/**
 * Task type definitions and color mappings for the Stardew Valley task tracker.
 */

export const TASK_TYPES = {
  FORAGING: 'foraging',
  FARMING: 'farming',
  FISHING: 'fishing',
  MINING: 'mining',
  ANIMALS: 'animals',
  COOKING: 'cooking',
  SOCIALIZING: 'socializing',
  COMBAT: 'combat',
  OTHER: 'other',
} as const;

export type TaskType = typeof TASK_TYPES[keyof typeof TASK_TYPES];

/**
 * Color mapping for each task type
 * Uses distinct colors from the Stardew Valley aesthetic
 */
export const TASK_TYPE_COLORS: Record<TaskType, string> = {
  [TASK_TYPES.FORAGING]: '#90EE90', // Light Green - nature/plants
  [TASK_TYPES.FARMING]: '#F0E68C', // Khaki - crops/farm work
  [TASK_TYPES.FISHING]: '#87CEEB', // Sky Blue - water
  [TASK_TYPES.MINING]: '#D3D3D3', // Light Gray - stone/minerals
  [TASK_TYPES.ANIMALS]: '#FFB6C1', // Light Pink - pets/animals
  [TASK_TYPES.COOKING]: '#FFD700', // Gold - food/cooking
  [TASK_TYPES.SOCIALIZING]: '#DDA0DD', // Plum - people/socializing
  [TASK_TYPES.COMBAT]: '#DC143C', // Crimson - combat/danger
  [TASK_TYPES.OTHER]: '#D3D3D3', // Light Gray - miscellaneous
};

/**
 * Get color for a task type, with fallback to OTHER
 */
export function getTaskTypeColor(type?: string | null): string {
  if (!type || !(type in TASK_TYPE_COLORS)) {
    return TASK_TYPE_COLORS[TASK_TYPES.OTHER];
  }
  return TASK_TYPE_COLORS[type as TaskType];
}

/**
 * All available task types as an array
 */
export const TASK_TYPE_LIST = Object.values(TASK_TYPES);
