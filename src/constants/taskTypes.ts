/**
 * Task type definitions
 */
export const TASK_TYPES = {
  FORAGING: 'foraging',
  FARMING: 'farming',
  FISHING: 'fishing',
  MINING: 'mining',
  ANIMALS: 'animals',
  COOKING: 'cooking',
  CALENDAR: 'calendar',
  OTHER: 'other',
} as const;
export const TASK_TYPE_LIST = Object.values(TASK_TYPES);
export type TaskType = (typeof TASK_TYPES)[keyof typeof TASK_TYPES];

/**
 * Color mapping for each task type
 * Uses Ivy's seasonal design system - colors adapt to current season
 * Spring: Fresh pastels, Summer: Bright warm, Fall: Harvest warm, Winter: Cool frost tones
 */
export const TASK_TYPE_COLORS: Record<TaskType, string> = {
  // Default colors (Spring - brand colors). Seasonal variants handled in seasonal.ts
  [TASK_TYPES.FORAGING]: '#A8D86F', // Fresh green - nature/plants (Jumino brand green)
  [TASK_TYPES.FARMING]: '#D4A574', // Warm brown - crops/farm work
  [TASK_TYPES.FISHING]: '#87CEEB', // Sky blue - water/tranquility
  [TASK_TYPES.MINING]: '#B8A5D6', // Soft purple - earth/mystery
  [TASK_TYPES.ANIMALS]: '#F4B6D9', // Soft pink - nurture/care
  [TASK_TYPES.COOKING]: '#F5B766', // Warm orange - creativity/warmth
  [TASK_TYPES.CALENDAR]: '#FFD166', // Warm festive gold - festivals/events
  [TASK_TYPES.OTHER]: '#C4C4C4', // Soft gray - neutral/flexible
};
