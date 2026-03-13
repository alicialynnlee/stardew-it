import {
  fallBg,
  fallBorder,
  fallText,
  springBg,
  springBorder,
  springText,
  summerBg,
  summerBorder,
  summerText,
  winterBg,
  winterBorder,
  winterText,
} from '@/styles/colors';
import { IconType } from 'react-icons';
import { PiLeafLight, PiSnowflakeLight, PiSunLight } from 'react-icons/pi';

export const SEASONS = {
  SPRING: 'Spring',
  SUMMER: 'Summer',
  FALL: 'Fall',
  WINTER: 'Winter',
} as const;
export const SEASONS_LIST = ['Spring', 'Summer', 'Fall', 'Winter'];
export type SeasonType = (typeof SEASONS)[keyof typeof SEASONS];
export const DAYS = Array.from({ length: 28 }, (_, i) => i + 1);
export const DAYS_OF_WEEK = Array.from([
  'Mon',
  'Tues',
  'Wed',
  'Thurs',
  'Fri',
  'Sat',
  'Sun  ',
]);

/**
 * Task config for each task type. Contains color and icon
 */
export interface SeasonConfig {
  backgroundColor: string; // background
  primaryColor: string; // text
  borderColor: string; // border
  icon: IconType;
}

export const SEASONS_CONFIG: Record<SeasonType, SeasonConfig> = {
  [SEASONS.SPRING]: {
    backgroundColor: springBg,
    primaryColor: springText,
    borderColor: springBorder,
    icon: PiLeafLight,
  },
  [SEASONS.SUMMER]: {
    backgroundColor: summerBg,
    primaryColor: summerText,
    borderColor: summerBorder,
    icon: PiSunLight,
  },
  [SEASONS.FALL]: {
    backgroundColor: fallBg,
    primaryColor: fallText,
    borderColor: fallBorder,
    icon: PiLeafLight,
  },
  [SEASONS.WINTER]: {
    backgroundColor: winterBg,
    primaryColor: winterText,
    borderColor: winterBorder,
    icon: PiSnowflakeLight,
  },
};
