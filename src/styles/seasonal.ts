/**
 * Seasonal Design System for Stardew-It
 * Implements 4 seasonal color palettes with dynamic theming
 */

export type Season = 'spring' | 'summer' | 'fall' | 'winter';

/**
 * Get season from selectedDay (game calendar)
 * Format: "Spring 1", "Summer 15", "Fall 28", "Winter 1", etc.
 */
export function getSeasonFromSelectedDay(selectedDay: string | null): Season {
  if (!selectedDay) return 'spring'; // Default to Spring

  const season = selectedDay.split(' ')[0].toLowerCase();
  if (season === 'spring') return 'spring';
  if (season === 'summer') return 'summer';
  if (season === 'fall') return 'fall';
  if (season === 'winter') return 'winter';

  return 'spring'; // Fallback
}

/**
 * Seasonal color palettes with Spring/Summer/Fall/Winter variations
 * Each season has its own aesthetic while maintaining core brand values
 */
export const SEASONAL_PALETTES = {
  spring: {
    season: 'spring',
    name: 'Spring',
    // Bright, fresh, hopeful - pastels with new growth energy
    primary: '#A8D86F', // Fresh green (Jumino inspired)
    secondary: '#F5FCF0', // Very light green-tinted white
    accent: '#FFB7C5', // Soft pink - new blossoms
    background: '#F9F6F2', // Cream background
    border: '#D4E8B9', // Light green border
    text: '#2D2D2D', // Charcoal
    textMuted: '#6B6B6B', // Medium gray
    shadow: 'rgba(168, 216, 111, 0.15)', // Green-tinted shadow
    calendarBorder: '#A8D86F',
    calendarHoverBg: '#E6F3D4',
  },
  summer: {
    season: 'summer',
    name: 'Summer',
    // Warm, bright, energetic - golden sun vibes
    primary: '#FFD700', // Warm gold (peak energy)
    secondary: '#FFFEF5', // Warm white
    accent: '#FF6B9D', // Vibrant coral/pink
    background: '#F9F6F2', // Cream background
    border: '#FFE8B6', // Soft gold border
    text: '#2D2D2D', // Charcoal
    textMuted: '#6B6B6B', // Medium gray
    shadow: 'rgba(255, 215, 0, 0.12)', // Gold-tinted shadow
    calendarBorder: '#FFD700',
    calendarHoverBg: '#FFF9E6',
  },
  fall: {
    season: 'fall',
    name: 'Fall',
    // Warm, cozy, harvest - oranges, browns, reds
    primary: '#E8944A', // Warm burnt orange (harvest)
    secondary: '#FEF8F3', // Warm cream
    accent: '#D2691E', // Chocolate brown
    background: '#F9F6F2', // Cream background
    border: '#E8B299', // Warm tan border
    text: '#2D2D2D', // Charcoal
    textMuted: '#6B6B6B', // Medium gray
    shadow: 'rgba(232, 148, 74, 0.15)', // Orange-tinted shadow
    calendarBorder: '#E8944A',
    calendarHoverBg: '#FFE8CC',
  },
  winter: {
    season: 'winter',
    name: 'Winter',
    // Cool, quiet, peaceful - silvers, blues, frost
    primary: '#B0D8F1', // Cool light blue (frost/snow)
    secondary: '#F5F9FE', // Cool white
    accent: '#E8E8E8', // Silver/frost
    background: '#F9F6F2', // Cream background
    border: '#D6E8F5', // Ice blue border
    text: '#2D2D2D', // Charcoal
    textMuted: '#6B6B6B', // Medium gray
    shadow: 'rgba(176, 216, 241, 0.15)', // Blue-tinted shadow
    calendarBorder: '#B0D8F1',
    calendarHoverBg: '#E6F2FF',
  },
} as const;

export type SeasonalPalette = (typeof SEASONAL_PALETTES)[Season];

/**
 * Task type colors — consistent across all seasons
 */
export const TASK_TYPE_COLORS = {
  foraging: '#C8B359',
  fishing: '#87CEEB',
  farming: '#A8D86F',
  cooking: '#A59EC7',
  mining: '#26210D',
  animals: '#891F24',
  calendar: '#85523D',
  other: '#D9D9D9',
} as const;

export type TaskTypeColors = typeof TASK_TYPE_COLORS;

/**
 * Get seasonal palette by season or current date
 */
export function getSeasonalPalette(season?: String): SeasonalPalette {
  const key = (season?.toLowerCase() ?? 'spring') as Season;
  return SEASONAL_PALETTES[key] ?? SEASONAL_PALETTES['spring'];
}

/**
 * Get task type color (season-agnostic — colors are consistent across all seasons)
 */
export function getSeasonalTaskColor(taskType: string): string {
  const key = taskType.toLowerCase() as keyof TaskTypeColors;
  return TASK_TYPE_COLORS[key] ?? TASK_TYPE_COLORS.other;
}
/**
 * Jumino celebration emoji variants by season
 * Shows seasonal-themed celebration
 */
export const SEASONAL_CELEBRATION_EMOJIS = {
  spring: '🌱✨',
  summer: '☀️✨',
  fall: '🍂✨',
  winter: '❄️✨',
} as const;
