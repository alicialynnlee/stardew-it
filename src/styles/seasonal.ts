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
    secondary: '#F9F6F2', // Cream background
    accent: '#FFB7C5', // Soft pink - new blossoms
    background: '#F5FCF0', // Very light green-tinted white
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
    secondary: '#F9F6F2', // Cream background
    accent: '#FF6B9D', // Vibrant coral/pink
    background: '#FFFEF5', // Warm white
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
    secondary: '#F9F6F2', // Cream background
    accent: '#D2691E', // Chocolate brown
    background: '#FEF8F3', // Warm cream
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
    secondary: '#F9F6F2', // Cream background
    accent: '#E8E8E8', // Silver/frost
    background: '#F5F9FE', // Cool white
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
 * Enhanced task type colors for each season
 * 9 task types × 4 seasons = 36 color combinations
 * Maintains color harmony while adapting to seasonal mood
 */
export const SEASONAL_TASK_TYPE_COLORS = {
  spring: {
    foraging: '#A8D86F', // Fresh spring green
    fishing: '#87CEEB', // Clear spring sky
    mining: '#D4A8E8', // Spring lavender
    farming: '#C8B359', // Spring soil
    animals: '#F4B6D9', // Spring blossoms
    cooking: '#FFD89B', // Spring sunshine
    socializing: '#FF9DB5', // Spring cherry blossoms
    other: '#D9D9D9', // Spring gray
  },
  summer: {
    foraging: '#FFD700', // Golden summer
    fishing: '#00CED1', // Bright turquoise
    mining: '#C9A8E8', // Summer lavender
    farming: '#F0E68C', // Summer wheat
    animals: '#FF69B4', // Hot pink
    cooking: '#FFA500', // Bright orange
    socializing: '#FF6B9D', // Vibrant coral
    other: '#FFB6C1', // Light pink
  },
  fall: {
    foraging: '#CD853F', // Autumn brown
    fishing: '#4682B4', // Steel blue
    mining: '#9370DB', // Fall purple
    farming: '#DAA520', // Goldenrod
    animals: '#FF8C69', // Salmon
    cooking: '#FF8C00', // Dark orange
    socializing: '#FF7F50', // Coral
    other: '#BDB76B', // Khaki
  },
  winter: {
    foraging: '#87CEEB', // Winter blue
    fishing: '#B0D8F1', // Icy blue
    mining: '#C0C0C0', // Silver
    farming: '#D3D3D3', // Light gray
    animals: '#E0FFFF', // Cyan
    cooking: '#F0F8FF', // Alice blue
    socializing: '#DDA0DD', // Plum
    other: '#FFFFFF', // Frost white
  },
} as const;

export type SeasonalTaskTypeColors = (typeof SEASONAL_TASK_TYPE_COLORS)[Season];

/**
 * Get seasonal palette by season or current date
 */
export function getSeasonalPalette(season?: String): SeasonalPalette {
  const key = (season?.toLowerCase() ?? 'spring') as Season;
  return SEASONAL_PALETTES[key] ?? SEASONAL_PALETTES['spring'];
}

/**
 * Get task type color for a specific season
 */
export function getSeasonalTaskColor(taskType: string, season: Season): string {
  const colors = SEASONAL_TASK_TYPE_COLORS[season];

  // Fallback to 'other' if task type not found
  const key = taskType.toLowerCase() as keyof SeasonalTaskTypeColors;
  return colors[key] || colors.other;
}

/**
 * Off-season task styling
 * Tasks that don't match the current season should be visually de-emphasized
 */
export const OFF_SEASON_TASK_STYLES = {
  opacity: 0.6,
  filter: 'grayscale(50%)',
  textDecoration: 'line-through',
  emoji: '❄️', // Indicates off-season
} as const;

/**
 * Seasonal CSS custom properties generator
 * Returns a string of CSS variables for the current or specified season
 */
export function generateSeasonalCSSVariables(season?: Season): string {
  const palette = getSeasonalPalette(season);
  return `
    --season: ${palette.season};
    --season-primary: ${palette.primary};
    --season-secondary: ${palette.secondary};
    --season-accent: ${palette.accent};
    --season-background: ${palette.background};
    --season-border: ${palette.border};
    --season-text: ${palette.text};
    --season-text-muted: ${palette.textMuted};
    --season-shadow: ${palette.shadow};
    --season-calendar-border: ${palette.calendarBorder};
    --season-calendar-hover-bg: ${palette.calendarHoverBg};
  `;
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
