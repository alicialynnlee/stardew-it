import { TaskType, TASK_TYPES } from '@/constants/taskTypes';
import { whiteSmoke, charcoalBlack } from './colors';

/**
 * Task type colors — consistent across all seasons
 */
export const TASK_TYPE_PALETTE: Record<
  TaskType,
  { base: string; text: string }
> = {
  [TASK_TYPES.FORAGING]: {
    base: '#C8B359',
    text: charcoalBlack,
  },
  [TASK_TYPES.FISHING]: {
    base: '#87CEEB',
    text: charcoalBlack,
  },
  [TASK_TYPES.FARMING]: {
    base: '#A8D86F',
    text: charcoalBlack,
  },
  [TASK_TYPES.COOKING]: {
    base: '#A59EC7',
    text: charcoalBlack,
  },
  [TASK_TYPES.MINING]: {
    base: '#26210D',
    text: whiteSmoke,
  },
  [TASK_TYPES.ANIMALS]: {
    base: '#891F24',
    text: whiteSmoke,
  },
  [TASK_TYPES.CALENDAR]: {
    base: '#85523D',
    text: whiteSmoke,
  },
  [TASK_TYPES.OTHER]: {
    base: '#D9D9D9',
    text: charcoalBlack,
  },
};
