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
    // Radix UI accent override values — applied to .radix-themes at runtime
    // Spring uses the existing --custom-* scale values directly
    radixAccent: {
      1: '#1a1d1a',
      2: '#1f231f',
      3: '#252925',
      4: '#2b302b',
      5: '#313731',
      6: '#373e37',
      7: '#3d453d',
      8: '#434c43',
      9: '#495349',
      10: '#4f5a4f',
      11: '#556155',
      12: '#5b685b',

      a1: '#7ba52606',
      a2: '#517b110c',
      a3: '#5e98041f',
      a4: '#5b960130',
      a5: '#5a8d0341',
      a6: '#50820151',
      a7: '#48730164',
      a8: '#456c0083',
      a9: '#2d4502a9',
      a10: '#283e00b5',
      a11: '#273b00c0',
      a12: '#111901e3',

      contrast: '#fff', // Text on accent bg
      surface: 'rgba(255, 255, 255, 0.1)', // Tinted surface (with alpha)
      indicator: '#728255', // Checkbox/radio indicator
      track: '#728255',
    },
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
    radixAccent: {
      1: '#f8f7f4',
      2: '#f9f6e7',
      3: '#fbf2c0',
      4: '#f8eaa4',
      5: '#f2e18b',
      6: '#e2d281',
      7: '#d1c37c',
      8: '#bdac5a',
      9: '#f6e06b',
      10: '#edd661',
      11: '#827219',
      12: '#413d27',
      a1: '#b28d2007',
      a2: '#eec70814',
      a3: '#ffd20033',
      a4: '#f4cc0158',
      a5: '#e9c30272',
      a6: '#c9a8027c',
      a7: '#a98d0081',
      a8: '#9c8102a4',
      a9: '#f3cd0092',
      a10: '#e5c0029d',
      a11: '#746300e6',
      a12: '#201b01d8',
      contrast: '#3D2E00', // Text on accent bg (dark for gold)
      indicator: '#E8A200', // Checkbox/radio indicator
      surface: '#FFFCE8CC', // Tinted surface (with alpha)
    },
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
    radixAccent: {
      1: '#fcfafa',
      2: '#fdf4f0',
      3: '#ffeadf',
      4: '#ffd8c0',
      5: '#ffcaaa',
      6: '#fbbe9d',
      7: '#ebad8a',
      8: '#df976d',
      9: '#d2691e',
      10: '#c25e13',
      11: '#be5a0b',
      12: '#52311f',

      a1: '#faf7ff80',
      a2: '#d117820b',
      a3: '#ff210217',
      a4: '#ff510438',
      a5: '#ff57034f',
      a6: '#f44d015c',
      a7: '#d2460270',
      a8: '#c645008e',
      a9: '#cc5400e0',
      a10: '#bd5101ec',
      a11: '#bb5300f4',
      a12: '#391400df',

      contrast: '#fff',
      surface: '#fdf1efcc',
      indicator: '#d2691e',
      track: '#d2691e',
    },
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
    radixAccent: {
      1: '#f9fcfd',
      2: '#f2f8fc',
      3: '#e4f2fc',
      4: '#d4ecfb',
      5: '#c3e2f6',
      6: '#aed6ef',
      7: '#93c5e4',
      8: '#72aed2',
      9: '#82bfe3',
      10: '#77b4d8',
      11: '#377395',
      12: '#0f3d54',

      a1: '#f8fcffcc',
      a2: '#edf6ffb3',
      a3: '#d9edffb3',
      a4: '#b8e0ff99',
      a5: '#0000ff1a',
      a6: '#0081e351',
      a7: '#0078cd6c',
      a8: '#006db58d',
      a9: '#007ed17d',
      a10: '#0073bf88',
      a11: '#004d7bc8',
      a12: '#00314af0',

      contrast: '#0c2432',
      surface: '#eff7fecc',
      indicator: '#82bfe3',
      track: '#82bfe3',
    },
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
  const taskColors = TASK_TYPE_COLORS;
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
    
    --season-accent-1: ${palette.radixAccent[1]};
    --season-accent-2: ${palette.radixAccent[2]};
    --season-accent-3: ${palette.radixAccent[3]};
    --season-accent-4: ${palette.radixAccent[4]};
    --season-accent-5: ${palette.radixAccent[5]};
    --season-accent-6: ${palette.radixAccent[6]};
    --season-accent-7: ${palette.radixAccent[7]};
    --season-accent-8: ${palette.radixAccent[8]};
    --season-accent-9: ${palette.radixAccent[9]};
    --season-accent-10: ${palette.radixAccent[10]};
    --season-accent-11: ${palette.radixAccent[11]};
    --season-accent-12: ${palette.radixAccent[12]};

    --season-accent-a1: ${palette.radixAccent.a1};
    --season-accent-a2: ${palette.radixAccent.a2};
    --season-accent-a3: ${palette.radixAccent.a3};
    --season-accent-a4: ${palette.radixAccent.a4};
    --season-accent-a5: ${palette.radixAccent.a5};
    --season-accent-a6: ${palette.radixAccent.a6};
    --season-accent-a7: ${palette.radixAccent.a7};
    --season-accent-a8: ${palette.radixAccent.a8};
    --season-accent-a9: ${palette.radixAccent.a9};
    --season-accent-a10: ${palette.radixAccent.a10};
    --season-accent-a11: ${palette.radixAccent.a11};
    --season-accent-a12: ${palette.radixAccent.a12};
  
    --season-accent-contrast: ${palette.radixAccent.contrast};
    --season-accent-indicator: ${palette.radixAccent.indicator};
    --season-accent-surface: ${palette.radixAccent.surface};
  
    --task-color-foraging: ${taskColors.foraging};
    --task-color-fishing: ${taskColors.fishing};
    --task-color-mining: ${taskColors.mining};
    --task-color-farming: ${taskColors.farming};
    --task-color-animals: ${taskColors.animals};
    --task-color-cooking: ${taskColors.cooking};
    --task-color-calendar: ${taskColors.calendar};
    --task-color-other: ${taskColors.other};
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
