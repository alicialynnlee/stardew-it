/**
 * Seasonal Context
 * Provides seasonal theming and utilities to the entire app
 * Uses selectedDay (game calendar) to determine current season
 */

'use client';

import React, {
  createContext,
  useContext,
  useMemo,
  useEffect,
  useState,
} from 'react';
import {
  getSeasonalPalette,
  getSeasonalTaskColor,
  generateSeasonalCSSVariables,
  SEASONAL_CELEBRATION_EMOJIS,
  Season,
  SeasonalPalette,
} from '@/styles/seasonal';

interface SeasonalContextType {
  currentSeason: Season;
  palette: SeasonalPalette;
  getTaskColor: (taskType: string) => string;
  celebrationEmoji: string;
  selectedDay: string | null;
  setSelectedDay: (day: string | null) => void;
}

const SeasonalContext = createContext<SeasonalContextType | undefined>(
  undefined
);

/**
 * SeasonalProvider component - wraps app with seasonal context
 * Manages selectedDay and derives season from it (defaults to Spring 1)
 */
export const SeasonalProvider: React.FC<{
  children: React.ReactNode;
  initialDate?: string | null;
}> = ({ children, initialDate }) => {
  const [selectedDay, setSelectedDay] = useState<string | null>(
    initialDate ?? 'Spring 1'
  );
  const [season, setSeason] = useState<Season>('spring');

  // Update season whenever selectedDay changes
  useEffect(() => {
    const newSeasonString = selectedDay?.split(' ')[0] ?? 'Spring';
    const newSeason =
      (newSeasonString.toLowerCase() as Season) ?? ('spring' as Season);
    setSeason(newSeason);
  }, [selectedDay]);

  // Apply seasonal CSS variables (accent overrides + task colors) to the
  // .radix-themes element so Radix UI components react to season changes
  useEffect(() => {
    const root = document.querySelector('.radix-themes') as HTMLElement | null;
    if (!root) return;
    const vars = generateSeasonalCSSVariables(season);
    vars.split(';').forEach((decl) => {
      const colonIdx = decl.indexOf(':');
      if (colonIdx === -1) return;
      const prop = decl.slice(0, colonIdx).trim();
      const val = decl.slice(colonIdx + 1).trim();
      if (prop.startsWith('--') && val) {
        root.style.setProperty(prop, val);
      }
    });
  }, [season]);

  const value = useMemo<SeasonalContextType>(() => {
    const palette = getSeasonalPalette(season);
    return {
      currentSeason: season,
      palette,
      getTaskColor: (taskType: string) => getSeasonalTaskColor(taskType),
      celebrationEmoji: SEASONAL_CELEBRATION_EMOJIS[season],
      selectedDay,
      setSelectedDay,
    };
  }, [season, selectedDay]);

  return (
    <SeasonalContext.Provider value={value}>
      {children}
    </SeasonalContext.Provider>
  );
};

/**
 * useSeasonalContext hook - access seasonal theme and utilities
 */
export function useSeasonalContext(): SeasonalContextType {
  const context = useContext(SeasonalContext);
  if (!context) {
    throw new Error('useSeasonalContext must be used within SeasonalProvider');
  }
  return context;
}

/**
 * Hook to update selected day (game calendar)
 * Call this from components like CalendarClient to update the app's seasonal theme
 */
export function useSetSelectedDay(): (day: string | null) => void {
  const { setSelectedDay } = useSeasonalContext();
  return setSelectedDay;
}

/**
 * Hook to get current selected day
 */
export function useSelectedDay(): string | null {
  const { selectedDay } = useSeasonalContext();
  return selectedDay;
}

/**
 * Hook to get seasonal task color
 */
export function useSeasonalTaskColor(taskType?: string | null): string {
  const { getTaskColor } = useSeasonalContext();
  return taskType ? getTaskColor(taskType) : '#C4C4C4'; // Default to 'other' color
}

/**
 * Hook to get current season
 */
export function useCurrentSeason(): Season {
  const { currentSeason } = useSeasonalContext();
  return currentSeason;
}

/**
 * Hook to get seasonal palette
 */
export function useSeasonalPalette(): SeasonalPalette {
  const { palette } = useSeasonalContext();
  return palette;
}

export default SeasonalProvider;
