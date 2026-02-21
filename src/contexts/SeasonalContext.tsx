/**
 * Seasonal Context
 * Provides seasonal theming and utilities to the entire app
 * Uses selectedDay (game calendar) to determine current season
 */

'use client';

import React, { createContext, useContext, useMemo, useEffect, useState, useCallback } from 'react';
import {
  getCurrentSeason,
  getSeasonalPalette,
  getSeasonalTaskColor,
  generateSeasonalCSSVariables,
  getSeasonFromSelectedDay,
  SEASONAL_CELEBRATION_EMOJIS,
  Season,
  SeasonalPalette,
} from '@/styles/seasonal';

interface SeasonalContextType {
  currentSeason: Season;
  palette: SeasonalPalette;
  getTaskColor: (taskType: string) => string;
  celebrationEmoji: string;
  cssVariables: string;
  selectedDay: string | null;
  setSelectedDay: (day: string | null) => void;
}

const SeasonalContext = createContext<SeasonalContextType | undefined>(undefined);

/**
 * SeasonalProvider component - wraps app with seasonal context
 * Manages selectedDay and derives season from it (defaults to Spring 1)
 */
export const SeasonalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string | null>('Spring 1');
  const [season, setSeason] = useState<Season>('spring');

  // Initialize after client-side mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Update season whenever selectedDay changes
  useEffect(() => {
    const newSeason = getSeasonFromSelectedDay(selectedDay);
    setSeason(newSeason);
  }, [selectedDay]);

  const value = useMemo<SeasonalContextType>(() => {
    const palette = getSeasonalPalette(season);
    return {
      currentSeason: season,
      palette,
      getTaskColor: (taskType: string) => getSeasonalTaskColor(taskType, season),
      celebrationEmoji: SEASONAL_CELEBRATION_EMOJIS[season],
      cssVariables: generateSeasonalCSSVariables(season),
      selectedDay,
      setSelectedDay,
    };
  }, [season, selectedDay]);

  // Prevent rendering content until mounted (hydration safety)
  if (!mounted) {
    return <>{children}</>;
  }

  return <SeasonalContext.Provider value={value}>{children}</SeasonalContext.Provider>;
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
