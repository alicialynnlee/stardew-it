# Stardew Valley IT - Enhanced Design System
## Seasonal Theming + Jumino Integration

---

## 🎨 EXECUTIVE SUMMARY: How Seasonal Context Changes the Design

### Before (Current)
- ✅ Task type colors (foraging, farming, fishing, etc.)
- ❌ No seasonal variation
- ❌ All tasks treated equally regardless of season
- ❌ Jumino isolated/unused

### After (Enhanced)
- ✅ **4 seasonal color palettes** (Spring/Summer/Fall/Winter)
- ✅ **Off-season task dimming** with visual indicators
- ✅ **Seasonal borders & accents** in calendar UI
- ✅ **Jumino celebratory moments** (bundle completion, seasonal milestones)
- ✅ **"Anti-work" aesthetic** (cozy, not corporate)
- ✅ **Seasonal availability system** (grays out unavailable tasks)

**Impact:** Players feel the seasons change. Tasks available now feel rewarding; off-season tasks feel like planning ahead. Jumino becomes a companion, not decoration.

---

## 📚 RESEARCH: Stardew Valley's Actual Aesthetic

### Stardew's 16-bit Pixel Palette (Hex Approximations)
```
SPRING: Soft pastels, light greens, pale yellows
- Grass: #A8D96A
- Flowers: #FFB6C1 → #FFE5D9
- Sky: #A8E6FF
- Accent: #F4E0B6

SUMMER: Warm, saturated, golden
- Grass: #7AC943
- Heat glow: #FFD9B3
- Sky: #87CEEB
- Flowers: #FF69B4

FALL: Warm earth tones, oranges, deep browns
- Grass: #9DB620
- Leaves: #FF9966 → #CC5500
- Sky: #FFB366
- Crops: #FFD700

WINTER: Cool, silvery, pale blues
- Snow: #F0F8FF
- Frost: #B0E0E6
- Sky: #96CCFF
- Trees: #D3D3D3
```

### Jumino Design (Color Palette)
- **Primary:** #5D4FB8 (purple)
- **Gold Accent:** #FFD700 (bundle rewards)
- **Happy/Glow:** #87CEEB + #FFD700 shimmer

---

## 🎭 SEASONAL COLOR SCHEMES

### SPRING (March 1 - May 31)
**Vibe:** Fresh awakening, hope, new growth

```typescript
export const seasonalPalette = {
  spring: {
    primary: '#A8E6FF',      // Soft sky blue
    accent: '#F4E0B6',        // Warm cream
    grass: '#A8D96A',         // Fresh grass green
    flower: '#FFB6C1',        // Soft pink
    dark: '#6B8E23',          // Olive (calm)
    background: '#F9F6F0',    // Warm cream bg
    border: '#D4E0C5',        // Soft green border
    taskBg: '#E8F5E9',        // Pale green for task cards
    offSeason: '#CDCDCD',     // Neutral gray for off-season
    dimmed: 0.4,              // Opacity for off-season tasks
  }
}
```

**Task Type Colors (Spring):**
| Type | Color | Hex | Usage |
|------|-------|-----|-------|
| Foraging | Spring Green | #90EE90 | Spring flowers, parsnips |
| Farming | Pale Yellow | #FFFACD | Spring planting |
| Fishing | Sky Blue | #87CEEB | Spring fish season |
| Mining | Frost Blue | #B0E0E6 | Winter carryover |
| Animals | Pale Pink | #FFB6D9 | Spring births |
| Cooking | Butter Yellow | #F4E4A6 | Spring recipes |
| Socializing | Lavender | #E6B3FF | Spring festivals |
| Combat | Light Coral | #F08080 | Cave exploration |
| Other | Pale Gray | #E8E8E8 | Misc |

---

### SUMMER (June 1 - August 31)
**Vibe:** Energy, abundance, heat

```typescript
export const seasonalPalette = {
  summer: {
    primary: '#87CEEB',       // Bright sky blue
    accent: '#FFD9B3',        // Golden sunlight
    grass: '#7AC943',         // Vibrant green
    flower: '#FF69B4',        // Hot pink
    dark: '#556B2F',          // Dark olive (energy)
    background: '#FFFEF0',    // Pale yellow bg
    border: '#FFE5A6',        // Golden border
    taskBg: '#FFFACD',        // Lemon yellow for task cards
    offSeason: '#D0D0D0',
    dimmed: 0.35,
  }
}
```

**Task Type Colors (Summer):**
| Type | Color | Hex | Usage |
|------|-------|-----|-------|
| Foraging | Lime Green | #ADFF2F | Summer fruits |
| Farming | Golden | #FFD700 | Crop season peak |
| Fishing | Ocean Blue | #20B2AA | Summer fishing |
| Mining | Light Gray | #D3D3D3 | Deep mine work |
| Animals | Hot Pink | #FF69B4 | Animals thrive |
| Cooking | Sunburst | #FFA500 | Summer preserves |
| Socializing | Coral | #FF7F50 | Summer fun |
| Combat | Crimson | #DC143C | Skull Cavern |
| Other | Silver Gray | #C0C0C0 | Misc |

---

### FALL (September 1 - November 30)
**Vibe:** Harvest, cozy, preparation

```typescript
export const seasonalPalette = {
  fall: {
    primary: '#FFB366',       // Orange sky
    accent: '#CC5500',        // Deep orange
    grass: '#9DB620',         // Autumn gold
    flower: '#FF9966',        // Warm orange
    dark: '#8B4513',          // Saddle brown
    background: '#FFF8DC',    // Cornsilk bg
    border: '#DAA520',        // Goldenrod border
    taskBg: '#FFE4B5',        // Moccasin for task cards
    offSeason: '#C0A080',
    dimmed: 0.38,
  }
}
```

**Task Type Colors (Fall):**
| Type | Color | Hex | Usage |
|------|-------|-----|-------|
| Foraging | Harvest Gold | #B8860B | Autumn foraging |
| Farming | Burnt Orange | #CC5500 | Fall harvest |
| Fishing | Teal | #008080 | Fall fish |
| Mining | Pewter | #A9A9A9 | Mine work |
| Animals | Rust | #B7410E | Cozy season |
| Cooking | Chocolate | #8B4513 | Fall recipes |
| Socializing | Pumpkin | #FF8C00 | Fall festival |
| Combat | Dark Red | #8B0000 | Cave danger |
| Other | Taupe | #B3860B | Misc |

---

### WINTER (December 1 - February 28)
**Vibe:** Stillness, introspection, magic

```typescript
export const seasonalPalette = {
  winter: {
    primary: '#96CCFF',       // Icy blue
    accent: '#F0F8FF',        // Alice blue
    grass: '#D3D3D3',         // Snow-covered
    flower: '#E6F3FF',        // Icy white
    dark: '#4A4A7A',          // Deep cool gray
    background: '#F8F8F8',    // Cool white bg
    border: '#B0C4DE',        // Light steel blue
    taskBg: '#F0F8FF',        // Alice blue for task cards
    offSeason: '#A9A9A9',
    dimmed: 0.42,
  }
}
```

**Task Type Colors (Winter):**
| Type | Color | Hex | Usage |
|------|-------|-----|-------|
| Foraging | Frost | #B0E0E6 | Winter foraging |
| Farming | Powder Blue | #B0E0E6 | Winter crops (indoors) |
| Fishing | Deep Blue | #00008B | Winter fishing |
| Mining | Silver | #C0C0C0 | Deep mines, floor 120+ |
| Animals | Pale Mauve | #DB7093 | Winter births |
| Cooking | Cream | #FFFDD0 | Winter recipes |
| Socializing | Slate Blue | #6A5ACD | Winter festivals |
| Combat | Dark Slate | #2F4F4F | Deep cave danger |
| Other | Cool Gray | #A0A0A0 | Misc |

---

## 🎯 OFF-SEASON TASK INDICATORS

### Visual Treatment

```typescript
// New styled component in Calendar.styled.ts
export const TaskLabelWithSeason = styled.div<{
  $taskType?: string;
  $isCompleted?: boolean;
  $isPartial?: boolean;
  $isOffSeason?: boolean;
  $currentSeason?: string;
}>`
  margin-top: 0.3rem;
  background-color: ${({ $taskType, $isOffSeason, $currentSeason }) =>
    $isOffSeason 
      ? getSeasonalOffSeasonColor($currentSeason)
      : getTaskTypeColorForSeason($taskType, $currentSeason)};
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.75rem;
  cursor: pointer;
  color: ${({ $isOffSeason }) => $isOffSeason ? '#999999' : '#1C1C1C'};
  
  ${({ $isOffSeason }) =>
    $isOffSeason &&
    `
      opacity: 0.5;
      font-style: italic;
      text-decoration: line-through dashed;
      border-left: 2px dashed #999999;
      position: relative;
    `}
  
  ${({ $isOffSeason }) =>
    $isOffSeason &&
    `
      &::after {
        content: '❄️';  /* Winter icon example */
        font-size: 0.6rem;
        margin-left: 0.2rem;
      }
    `}

  ${({ $isCompleted }) =>
    $isCompleted &&
    `
    background-color: #A8D96A;
    text-decoration: line-through;
    opacity: 0.7;
  `}

  ${({ $isPartial, $isCompleted }) =>
    $isPartial &&
    !$isCompleted &&
    `
    border-left: 3px solid ${dustySage};
  `}
`;
```

### Off-Season Task Detection Logic

```typescript
// New utility: src/utils/seasonalAvailability.ts

export interface TaskAvailability {
  task: string;
  seasons: ('spring' | 'summer' | 'fall' | 'winter')[];
  reason?: string;
}

export const SEASONAL_AVAILABILITY: Record<string, TaskAvailability> = {
  'forage spring foraging': {
    task: 'Forage: Spring Foraging',
    seasons: ['spring'],
    reason: 'Spring-only activity'
  },
  'forage summer foraging': {
    task: 'Forage: Summer Foraging', 
    seasons: ['summer'],
    reason: 'Summer-only activity'
  },
  'plant crops': {
    task: 'Plant Crops',
    seasons: ['spring', 'summer', 'fall'],
    reason: 'Not available in winter (unless greenhouse)'
  },
  'fish': {
    task: 'Fish',
    seasons: ['spring', 'summer', 'fall', 'winter'],
    reason: 'Year-round but fish vary by season'
  },
  // ... more tasks
};

export function isTaskAvailableInSeason(
  taskName: string,
  season: 'spring' | 'summer' | 'fall' | 'winter'
): boolean {
  const availability = SEASONAL_AVAILABILITY[taskName.toLowerCase()];
  return availability?.seasons.includes(season) ?? true; // Default to available
}

export function getOffSeasonReason(
  taskName: string,
  season: 'spring' | 'summer' | 'fall' | 'winter'
): string | null {
  if (isTaskAvailableInSeason(taskName, season)) return null;
  return SEASONAL_AVAILABILITY[taskName.toLowerCase()]?.reason ?? 'Not available this season';
}
```

### Visual Indicators

- **Color:** Dimmed gray (#C0C0C0 to #A9A9A9 depending on season)
- **Opacity:** 40-50%
- **Text:** Italic + dashed strikethrough
- **Icon:** Seasonal emoji or icon in corner (❄️ for winter, 🍁 for fall, etc.)
- **Hover Tooltip:** Shows reason ("Winter foraging not available until Spring")

---

## 🌾 SEASONAL BORDERS & ACCENTS

### Monthly Calendar Header Theming

```typescript
// Enhanced Calendar.styled.ts
export const MonthHeaderWithSeason = styled.div<{ $currentSeason: string }>`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  height: 3rem;
  
  // Seasonal border animation
  border-bottom: 3px solid ${({ $currentSeason }) => {
    switch($currentSeason) {
      case 'spring': return '#A8D96A';      // Spring green
      case 'summer': return '#FFD9B3';      // Summer gold
      case 'fall': return '#FF9966';        // Fall orange
      case 'winter': return '#B0E0E6';      // Winter blue
      default: return '#999999';
    }
  }};
  
  // Seasonal background glow
  background: linear-gradient(180deg, 
    ${({ $currentSeason }) => {
      switch($currentSeason) {
        case 'spring': return 'rgba(168, 217, 106, 0.1) 0%, transparent 100%';
        case 'summer': return 'rgba(255, 217, 179, 0.1) 0%, transparent 100%';
        case 'fall': return 'rgba(255, 153, 102, 0.1) 0%, transparent 100%';
        case 'winter': return 'rgba(176, 224, 230, 0.1) 0%, transparent 100%';
        default: return 'transparent';
      }
    }}
  );
  
  transition: border-color 0.6s ease, background 0.6s ease;
  
  span {
    min-width: 6rem;
    text-align: center;
    font-weight: 600;
    color: ${({ $currentSeason }) => {
      switch($currentSeason) {
        case 'spring': return '#6B8E23';
        case 'summer': return '#8B4513';
        case 'fall': return '#8B4513';
        case 'winter': return '#4A4A7A';
        default: return '#1C1C1C';
      }
    }};
  }
`;

// Season indicator with decorative elements
export const SeasonBadge = styled.div<{ $season: string }>`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  background-color: ${({ $season }) => {
    switch($season) {
      case 'spring': return '#F0F8E8';
      case 'summer': return '#FFF8E8';
      case 'fall': return '#FFE8D0';
      case 'winter': return '#E8F0FF';
      default: return '#F5F5F5';
    }
  }};
  
  color: ${({ $season }) => {
    switch($season) {
      case 'spring': return '#6B8E23';
      case 'summer': return '#FF8C00';
      case 'fall': return '#CC5500';
      case 'winter': return '#4A4A7A';
      default: return '#666666';
    }
  }};
  
  border: 2px solid ${({ $season }) => {
    switch($season) {
      case 'spring': return '#A8D96A';
      case 'summer': return '#FFD9B3';
      case 'fall': return '#FF9966';
      case 'winter': return '#B0E0E6';
      default: return '#CCCCCC';
    }
  }};
  
  &::before {
    content: ${({ $season }) => {
      switch($season) {
        case 'spring': return '"🌱"';
        case 'summer': return '"☀️"';
        case 'fall': return '"🍁"';
        case 'winter': return '"❄️"';
        default: return '"📅"';
      }
    }};
    font-size: 1.2rem;
  }
`;
```

### Day Box Seasonal Styling

```typescript
export const DayBoxWithSeason = styled.div<{ $currentSeason: string }>`
  padding: 0.5rem;
  background-color: ${({ $currentSeason }) => {
    switch($currentSeason) {
      case 'spring': return '#FAFBF8';
      case 'summer': return '#FFFEF0';
      case 'fall': return '#FFF8DC';
      case 'winter': return '#F8F8F8';
      default: return '#FFFFFF';
    }
  }};
  overflow-y: auto;
  
  // Subtle seasonal accent on borders
  border-left: 1px solid ${({ $currentSeason }) => {
    switch($currentSeason) {
      case 'spring': return '#D4E0C5';
      case 'summer': return '#FFE5A6';
      case 'fall': return '#DAA520';
      case 'winter': return '#B0C4DE';
      default: return '#DDDDDD';
    }
  }};
  
  transition: background-color 0.6s ease, border-color 0.6s ease;
`;
```

---

## 🐿️ JUMINO INTEGRATION: CELEBRATORY MOMENTS

### Jumino Character

```typescript
// New component: src/components/jumino/JuminoCelebration.tsx

interface JuminoCelebrationProps {
  trigger: 'bundleComplete' | 'seasonChange' | 'yearMilestone' | 'allTasksDone';
  season: 'spring' | 'summer' | 'fall' | 'winter';
  onComplete?: () => void;
}

export const JuminoCelebration: React.FC<JuminoCelebrationProps> = ({
  trigger,
  season,
  onComplete,
}) => {
  // Jumino sprite animation
  // Shows Jumino bouncing, dancing, celebrating
  // Seasonal outfit changes (spring flower crown, winter scarf, etc.)
};
```

### Bundle Completion Celebration

```typescript
// Trigger when user completes a seasonal bundle
export const BundleCompletionSequence = {
  animation: 'jumino-dance', // 2-3 second celebration dance
  particles: {
    type: 'sparkles' | 'confetti' | 'leaves' | 'snowflakes',
    color: 'seasonal',
    count: 30,
    duration: 1500,
  },
  sound: 'triumph.wav', // 8-bit victory chime
  message: {
    text: `"Bundle completed! Excellent work, farmer!"`,
    characterColor: '#5D4FB8',
    goldAccent: '#FFD700',
  },
  reward: {
    display: '💰 Gold reward',
    animation: 'float-up',
  },
};
```

### Jumino Display States

```typescript
// New styled component: src/components/jumino/Jumino.styled.ts

export const JuminoContainer = styled.div<{ $season: string; $state: string }>`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 64px;
  height: 64px;
  
  // Seasonal coloring
  filter: ${({ $season }) => {
    switch($season) {
      case 'spring': return 'hue-rotate(0deg) brightness(1.1)';
      case 'summer': return 'hue-rotate(-10deg) brightness(1.15)';
      case 'fall': return 'hue-rotate(20deg) brightness(1.05)';
      case 'winter': return 'hue-rotate(-20deg) brightness(0.95)';
      default: return 'none';
    }
  }};
  
  animation: ${({ $state }) => {
    switch($state) {
      case 'idle': return 'jumino-breathe 3s ease-in-out infinite';
      case 'celebrating': return 'jumino-dance 2s ease-in-out';
      case 'happy': return 'jumino-jump 1s ease-out';
      case 'thinking': return 'jumino-tilt 2s ease-in-out';
      default: return 'none';
    }
  }};
  
  cursor: pointer;
  
  &:hover {
    transform: scale(1.1);
    filter: ${({ $season }) => {
      // Add glow on hover
      const glows = {
        spring: 'drop-shadow(0 0 8px rgba(168, 217, 106, 0.6))',
        summer: 'drop-shadow(0 0 8px rgba(255, 217, 179, 0.6))',
        fall: 'drop-shadow(0 0 8px rgba(255, 153, 102, 0.6))',
        winter: 'drop-shadow(0 0 8px rgba(176, 224, 230, 0.6))',
      };
      return glows[$season] || 'drop-shadow(0 0 8px rgba(100, 100, 100, 0.3))';
    }};
  }
`;

// Jumino states:
// - Idle: Gentle breathing animation, available for interaction
// - Celebrating: Dance animation when bundles completed
// - Happy: Jump animation when seasonal milestone reached
// - Thinking: Tilt head when hovering over tasks
// - Sleeping: During late-night hours (22:00-06:00) - eyes closed
```

### Jumino Seasonal Outfit Changes

```typescript
export const JuminoOutfits = {
  spring: {
    primary: '#5D4FB8',
    accent: '#FFB6C1', // Flower crown
    accessory: '🌸',
    message: 'Spring blooms are here!',
  },
  summer: {
    primary: '#5D4FB8',
    accent: '#FFD700', // Sun hat
    accessory: '🌞',
    message: 'Time to make the most of the sunny days!',
  },
  fall: {
    primary: '#5D4FB8',
    accent: '#FF9966', // Autumn leaves
    accessory: '🍂',
    message: 'Harvest time! Let\'s gather!',
  },
  winter: {
    primary: '#5D4FB8',
    accent: '#B0E0E6', // Winter scarf/frost
    accessory: '❄️',
    message: 'Cozy season! Take it slow.',
  },
};
```

### Jumino Help/Tooltip Integration

```typescript
// Jumino can provide contextual hints
export const JuminoTooltips = {
  'off-season-task': {
    character: 'Jumino',
    text: 'This task isn\'t available right now! Maybe plan for next season?',
    tone: 'helpful',
    icon: '💡',
  },
  'completed-bundle': {
    character: 'Jumino',
    text: 'Wonderful! The community center appreciates your effort!',
    tone: 'celebratory',
    icon: '🎉',
  },
  'year-milestone': {
    character: 'Jumino',
    text: 'You\'ve made it through a full year! Look how far you\'ve come!',
    tone: 'encouraging',
    icon: '⭐',
  },
};
```

---

## 🎯 "ANTI-WORK" AESTHETIC IMPROVEMENTS

### Typography & Language

```typescript
// Replace corporate language with cozy language
OLD: "Task Completed"
NEW: "Done! 🌱"

OLD: "Overdue Tasks"
NEW: "Tasks to catch up on"

OLD: "Productivity Metrics"
NEW: "Your Progress"

OLD: "Schedule"
NEW: "Farm Calendar"

OLD: "Notifications"
NEW: "Reminders"

// Font pairing
Header: "Pixel font" (8-bit / retro style) - e.g., "Press Start 2P" or similar
Body: "Readable serif" - e.g., "Georgia" or "Merriweather"
Monospace: "Retro computer" - e.g., "Space Mono"
```

### Color Psychology in UI

```typescript
// Avoid corporate grays/blues
REMOVE: #2F5496 (corporate blue)
REMOVE: #808080 (dead gray)
ADD: #A8D96A (growth green)
ADD: #FFD9B3 (warm, generous)

// Replace sharp shadows with soft shadows
OLD: `box-shadow: 0 2px 4px rgba(0,0,0,0.3)`
NEW: `box-shadow: 0 2px 8px rgba(0,0,0,0.1)` (softer)

// Rounded corners (cozy, not corporate)
OLD: `border-radius: 2px`
NEW: `border-radius: 8px`
```

### Spacing & Breathing Room

```typescript
// Cozy design has more negative space
// Remove dense packing

// Buttons have generous padding
padding: 0.8rem 1.2rem; // More breathing room

// Cards have soft spacing
gap: 1.5rem; // Generous gap between elements

// Transitions are slower and softer
transition: 0.3s ease-in-out; // Not snappy, cozy
```

### Empty State Design

```typescript
// Instead of blank page, show:
// - Jumino waving hello
// - Seasonal welcome message
// - Suggestion for first task
// - Motivational quote about the season

export const EmptyStateIllustration = `
  🌾 Welcome to your farm!
  
  It's ${season} — a perfect time to ${seasonalSuggestion}.
  
  [Add Your First Task] ✨
`;
```

### Loading States

```typescript
// Instead of spinner, show:
// - Jumino thinking/waiting
// - Animated seasonal background (leaves falling, snow, etc.)
// - Cozy loading message ("Gathering your tasks...")

export const CozyLoadingState = {
  spring: 'Growing your farm... 🌱',
  summer: 'Soaking up the sun... ☀️',
  fall: 'Harvesting your tasks... 🌾',
  winter: 'Settling in... ❄️',
};
```

---

## 📦 IMPLEMENTATION ROADMAP

### Phase 1: Core Seasonal Architecture (Week 1)
- [ ] Create `src/utils/seasons.ts` - Season detection & date mapping
- [ ] Create `src/styles/seasonalPalette.ts` - All 4 seasonal color schemes
- [ ] Update `colors.ts` to export seasonal palettes
- [ ] Add `$currentSeason` prop to main layout component

### Phase 2: Task Off-Seasoning (Week 2)
- [ ] Create `src/utils/seasonalAvailability.ts` - Task availability mapping
- [ ] Create `TaskLabelWithSeason` styled component
- [ ] Update `Calendar.tsx` to detect off-season tasks
- [ ] Add dashed strikethrough + dimming for off-season tasks

### Phase 3: Seasonal UI Theming (Week 2-3)
- [ ] Update `Calendar.styled.ts` with seasonal borders & accents
- [ ] Create `SeasonBadge` component (top-right corner)
- [ ] Update all day-box & header colors
- [ ] Add smooth transitions between seasons (1 day padding)

### Phase 4: Jumino Integration (Week 3-4)
- [ ] Create `src/components/jumino/Jumino.tsx`
- [ ] Create celebration animations (CSS keyframes)
- [ ] Implement bundle completion trigger
- [ ] Add Jumino tooltips for off-season tasks

### Phase 5: Anti-Work Polish (Week 4)
- [ ] Update all copy (remove corporate language)
- [ ] Implement cozy empty states
- [ ] Add seasonal loading animations
- [ ] Fine-tune shadows, spacing, borders

### Phase 6: Testing & Refinement (Week 5)
- [ ] Cross-season testing (verify transitions work)
- [ ] Accessibility audit (contrast on seasonal colors)
- [ ] User testing (does it feel cozy?)
- [ ] Performance check (animations smooth)

---

## 🎨 EXACT COLOR CODE REFERENCE

### Complete Season Palette (Copy-Paste Ready)

```typescript
// src/styles/seasonalPalette.ts
export const SEASONAL_PALETTES = {
  spring: {
    sky: '#A8E6FF',
    grass: '#A8D96A',
    accent: '#F4E0B6',
    flower: '#FFB6C1',
    dark: '#6B8E23',
    bg: '#F9F6F0',
    border: '#D4E0C5',
    taskBg: '#E8F5E9',
    offSeason: '#CDCDCD',
    tasks: {
      foraging: '#90EE90',
      farming: '#FFFACD',
      fishing: '#87CEEB',
      mining: '#B0E0E6',
      animals: '#FFB6D9',
      cooking: '#F4E4A6',
      socializing: '#E6B3FF',
      combat: '#F08080',
      other: '#E8E8E8',
    },
  },
  summer: {
    sky: '#87CEEB',
    grass: '#7AC943',
    accent: '#FFD9B3',
    flower: '#FF69B4',
    dark: '#556B2F',
    bg: '#FFFEF0',
    border: '#FFE5A6',
    taskBg: '#FFFACD',
    offSeason: '#D0D0D0',
    tasks: {
      foraging: '#ADFF2F',
      farming: '#FFD700',
      fishing: '#20B2AA',
      mining: '#D3D3D3',
      animals: '#FF69B4',
      cooking: '#FFA500',
      socializing: '#FF7F50',
      combat: '#DC143C',
      other: '#C0C0C0',
    },
  },
  fall: {
    sky: '#FFB366',
    grass: '#9DB620',
    accent: '#CC5500',
    flower: '#FF9966',
    dark: '#8B4513',
    bg: '#FFF8DC',
    border: '#DAA520',
    taskBg: '#FFE4B5',
    offSeason: '#C0A080',
    tasks: {
      foraging: '#B8860B',
      farming: '#CC5500',
      fishing: '#008080',
      mining: '#A9A9A9',
      animals: '#B7410E',
      cooking: '#8B4513',
      socializing: '#FF8C00',
      combat: '#8B0000',
      other: '#B3860B',
    },
  },
  winter: {
    sky: '#96CCFF',
    grass: '#D3D3D3',
    accent: '#F0F8FF',
    flower: '#E6F3FF',
    dark: '#4A4A7A',
    bg: '#F8F8F8',
    border: '#B0C4DE',
    taskBg: '#F0F8FF',
    offSeason: '#A9A9A9',
    tasks: {
      foraging: '#B0E0E6',
      farming: '#B0E0E6',
      fishing: '#00008B',
      mining: '#C0C0C0',
      animals: '#DB7093',
      cooking: '#FFFDD0',
      socializing: '#6A5ACD',
      combat: '#2F4F4F',
      other: '#A0A0A0',
    },
  },
  jumino: {
    primary: '#5D4FB8',
    gold: '#FFD700',
    happy: '#87CEEB',
  },
};
```

---

## 🎬 BEFORE & AFTER: UI EXAMPLES

### Calendar Header
**Before:** Plain gray header, no seasonal indication
**After:** 
```
[Seasonal gradient background] [Season name + emoji] [Current month]
Border animates on season change (grows, shifts color)
```

### Task Label
**Before:** 
```
[Foraging] (green)
[Fishing] (blue)
```

**After (In Spring):**
```
[Foraging] (spring green #90EE90) ← Vibrant, available
[Winter Fishing] (dimmed gray #CDCDCD, dashed, 40% opacity, "❄️") ← Off-season
```

### Page Background
**Before:** Flat white/gray
**After:**
```
Subtle seasonal color wash behind main content
Spring: Warm cream with pale green edge glow
Summer: Pale yellow with golden edge
Fall: Cornsilk with burnt orange accent
Winter: Cool white with icy blue edge
```

### Jumino Presence
**Before:** Static icon (if present at all)
**After:**
```
Bottom-right corner, interactive
- Idle: Gentle breathing animation
- Click: Shows cozy tips ("Try foraging this season!")
- On bundle complete: Celebration dance + particles
- Seasonal outfit changes
- Tooltip on hover
```

---

## 📊 METRICS: MEASURING "COZY-NESS"

How do we know if it feels less corporate and more cottagecore?

1. **Color Warmth**: Shift from cool grays (#666666) to warm tones
   - Target: 60% warm colors, 40% cool
   
2. **Animation Smoothness**: Transitions < 400ms feel snappy; 400-600ms feel cozy
   - Target: Most transitions 500ms (gentle)

3. **Spacing Density**: No elements touching edges
   - Target: Minimum 1rem padding/margin everywhere

4. **Rounded Corners**: Sharp corners = corporate; rounded = cozy
   - Target: No border-radius < 6px anywhere

5. **Text Tone**: Language scanning
   - Target: 0 corporate words ("metrics", "productivity", "schedule")
   - Target: +1 magic/cozy words per screen ("gather", "bloom", "harvest")

---

## 🔄 SEASONAL TRANSITION LOGIC

```typescript
// Smooth transitions between seasons
export function getCurrentSeason(date: Date): Season {
  const month = date.getMonth(); // 0-11
  if (month >= 2 && month <= 4) return 'spring';    // Mar-May
  if (month >= 5 && month <= 7) return 'summer';    // Jun-Aug
  if (month >= 8 && month <= 10) return 'fall';     // Sep-Nov
  return 'winter'; // Dec-Feb
}

// Smooth color transition near season boundaries
export function getTransitioningPalette(
  date: Date,
  palettes: PaletteMap
): Palette {
  const current = getCurrentSeason(date);
  const next = getNextSeason(current);
  const daysUntilTransition = getDaysUntilSeasonEnd(date);
  
  // In final 3 days of season, start blending colors
  if (daysUntilTransition <= 3) {
    const progress = (3 - daysUntilTransition) / 3;
    return blendPalettes(palettes[current], palettes[next], progress);
  }
  
  return palettes[current];
}
```

---

## ✅ CHECKLIST: DESIGN ENHANCEMENTS COMPLETED

- ✅ 4 complete seasonal color palettes with exact hex codes
- ✅ Task type colors tailored to each season
- ✅ Off-season task visual treatment (dimming, dashed, icons)
- ✅ Seasonal border & accent designs for calendar
- ✅ Seasonal background color schemes
- ✅ Jumino character integration points
- ✅ Jumino celebration animations for bundle completion
- ✅ Jumino seasonal outfit system
- ✅ "Anti-work" aesthetic guidelines (language, spacing, shadows)
- ✅ Empty state design with Jumino
- ✅ Loading state cozy messaging
- ✅ Implementation roadmap with phases
- ✅ Complete color reference for development
- ✅ Before/after UI examples
- ✅ Seasonal transition logic

---

## 🎯 IMPACT SUMMARY

### What Changed?
The design system evolved from a **neutral productivity app** into a **seasonal, character-driven experience** that mirrors Stardew Valley's progression and mood.

### How It Feels Now
- **Spring:** Fresh, hopeful, encouraging to start new tasks
- **Summer:** Energetic, abundant, rewarding for completion
- **Fall:** Cozy, reflective, celebrating harvests
- **Winter:** Calm, introspective, taking it slow

### Key Improvements
1. **Seasonal Relevance:** Tasks feel contextual to the time of year
2. **Visual Personality:** Jumino makes the app feel alive & friendly
3. **Anti-Corporate:** Language, spacing, colors all lean cozy
4. **Immersion:** Crossing into a new season feels like a game milestone
5. **Accessibility:** Off-season indicators help plan ahead

---

**Design by:** Ivy  
**Context:** Stardew Valley IT App Enhancement  
**Date:** February 21, 2026  
**Status:** Ready for Implementation ✨
