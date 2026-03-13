import { mainBlack, mainWhite } from '@/styles/colors';
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
  textColor: string;
  icon: IconType;
}

export const TASK_CONFIG: Record<TaskType, TaskConfig> = {
  [TASK_TYPES.FORAGING]: {
    color: '#6B8E23',
    textColor: mainWhite,
    icon: PiLeafLight,
  },
  [TASK_TYPES.FARMING]: {
    color: '#A4C639',
    textColor: mainWhite,
    icon: PiPlantLight,
  },
  [TASK_TYPES.FISHING]: {
    color: '#5F9EA0',
    textColor: mainWhite,
    icon: PiFishLight,
  },
  [TASK_TYPES.MINING]: {
    color: '#708090', // Soft purple - earth/mystery
    textColor: mainBlack,
    icon: PiAxeLight,
  },
  [TASK_TYPES.ANIMALS]: {
    color: '#E9967A', // Soft pink - nurture/care
    textColor: mainBlack,
    icon: PiPawPrintLight,
  },
  [TASK_TYPES.COOKING]: {
    color: '#F5B766', // Warm orange - creativity/warmth
    textColor: mainBlack,
    icon: PiCookingPotLight,
  },
  [TASK_TYPES.CALENDAR]: {
    color: '#85523D', // Brown
    textColor: mainWhite,
    icon: PiCalendarDotsLight,
  },
  [TASK_TYPES.OTHER]: {
    color: '#707070', // Soft gray - neutral/flexible
    textColor: mainWhite,
    icon: PiDotsThreeLight,
  },
};
