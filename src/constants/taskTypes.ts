import { IconType } from 'react-icons';
import {
  PiAxeLight,
  PiCalendarDotsLight,
  PiCookingPotLight,
  PiDotsThreeLight,
  PiFishLight,
  PiLeafLight,
  PiPawPrintLight,
  PiPlantLight,
} from 'react-icons/pi';
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
 * Task config for each task type. Contains color and icon
 */
export interface TaskConfig {
  color: string;
  icon: IconType;
}

export const TASK_CONFIG: Record<TaskType, TaskConfig> = {
  [TASK_TYPES.FORAGING]: {
    color: '#A8D86F',
    icon: PiLeafLight,
  }, // Fresh green - nature/plants (Jumino brand green)
  [TASK_TYPES.FARMING]: {
    color: '#D4A574', // Warm brown - crops/farm work
    icon: PiPlantLight,
  },
  [TASK_TYPES.FISHING]: {
    color: '#87CEEB', // Sky blue - water/tranquility
    icon: PiFishLight,
  },
  [TASK_TYPES.MINING]: {
    color: '#B8A5D6', // Soft purple - earth/mystery
    icon: PiAxeLight,
  },
  [TASK_TYPES.ANIMALS]: {
    color: '#F4B6D9', // Soft pink - nurture/care
    icon: PiPawPrintLight,
  },
  [TASK_TYPES.COOKING]: {
    color: '#F5B766', // Warm orange - creativity/warmth
    icon: PiCookingPotLight,
  },
  [TASK_TYPES.CALENDAR]: {
    color: '#FFD166', // Warm festive gold - festivals/events
    icon: PiCalendarDotsLight,
  },
  [TASK_TYPES.OTHER]: {
    color: '#C4C4C4', // Soft gray - neutral/flexible
    icon: PiDotsThreeLight,
  },
};
