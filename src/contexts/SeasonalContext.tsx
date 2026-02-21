/**
 * Seasonal Context
 * Provides seasonal theming and utilities to the entire app
 */

'use client';

import React, { createContext, useContext, useMemo, useEffect, useState } from 'react';
import {
  getCurrentSeason,
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
  cssVariables: string;
}

const SeasonalContext = createContext<SeasonalContextType | undefined>(undefined);

/**
 * SeasonalProvider component - wraps app with seasonal context
 */
export const SeasonalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const [season, setSeason] = useState<Season>('spring');

  // Initialize season after client-side mount to avoid hydration mismatch
  useEffect(() => {
    setSeason(getCurrentSeason());
    setMounted(true);
  }, []);

  const value = useMemo<SeasonalContextType>(() => {
    const palette = getSeasonalPalette(season);
    return {
      currentSeason: season,
      palette,
      getTaskColor: (taskType: string) => getSeasonalTaskColor(taskType, season),
      celebrationEmoji: SEASONAL_CELEBRATION_EMOJIS[season],
      cssVariables: generateSeasonalCSSVariables(season),
    };
  }, [season]);

  // Apply CSS variables to document root
  useEffect(() => {
    if (mounted) {
      const root = document.documentElement;
      const vars = generateSeasonalCSSVariables(season);
      const lines = vars.split('\n').filter(l => l.trim());
      lines.forEach(line => {
        const [key, val] = line.trim().split(':');
        if (key && val) {
          root.style.setProperty(key.trim(), val.trim().slice(0, -1));
        }
      });
    }
  }, [season, mounted]);

  if (!mounted) {
    // Return a default context to prevent hydration mismatch
    const defaultPalette = getSeasonalPalette('spring');
    return (
      <SeasonalContext.Provider
        value={{
          currentSeason: 'spring',
          palette: defaultPalette,
          getTaskColor: (taskType: string) => getSeasonalTaskColor(taskType, 'spring'),
          celebrationEmoji: '🌱✨',
          cssVariables: generateSeasonalCSSVariables('spring'),
        }}
      >
        {children}
      </SeasonalContext.Provider>
    );
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
