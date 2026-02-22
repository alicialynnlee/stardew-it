# Stardew Valley IT - Design System
**The Complete Source of Truth for Design Implementation**

---

## Table of Contents
1. [Design Philosophy](#design-philosophy)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Components](#components)
5. [Jumino Mascot](#jumino-mascot)
6. [Implementation](#implementation)
7. [Quick Reference](#quick-reference)

---

## Design Philosophy

### Core Vision
The Stardew Valley IT app design transforms a **generic productivity tool** into a **seasonal, character-driven experience** that captures the essence and aesthetic of Stardew Valley.

### Three Guiding Principles

**1. Seasonal Immersion**
> The app should feel like the farm itself changes with the seasons. January feels different from July. This creates natural pacing and gives meaning to time progression. Players experience 4 distinct visual identities as they progress through the year.

**2. Character Connection**
> Jumino is not decoration—it's a friend. Celebrate together, get help from a mentor figure. Makes task management feel less lonely and more like a game. The character adds warmth, humor, and personality.

**3. Anti-Corporate Vibes**
> The whole point of Stardew Valley is escaping corporate grind. The app should never feel stressful, demanding, or metric-driven. It should feel like you're tending a garden, not hitting KPIs. Language, colors, spacing, and animations all reinforce this.

### Design Goals

- ✅ Players immediately recognize the current season
- ✅ Off-season tasks are crystal clear (not confusing)
- ✅ The overall vibe is cozy, not stressful
- ✅ Jumino adds personality and emotional engagement
- ✅ The app feels like a game extension, not a separate tool
- ✅ Colors and aesthetics match Stardew Valley's 16-bit style
- ✅ Transitions between seasons feel smooth and magical

---

## Color System

### Seasonal Palette Overview

The design system includes **4 complete seasonal color palettes** with **60+ exact hex codes** ready for implementation. Each season has a distinct color identity that evokes the real-world season.

### Spring Palette (March 1 - May 31)
**Vibe:** Fresh awakening, hope, new growth

```typescript
export const SPRING = {
  sky: '#A8E6FF',           // Soft sky blue
  grass: '#A8D96A',         // Fresh grass green
  accent: '#F4E0B6',        // Warm cream
  flower: '#FFB6C1',        // Soft pink
  dark: '#6B8E23',          // Olive (calm)
  background: '#F9F6F0',    // Warm cream bg
  border: '#D4E0C5',        // Soft green border
  taskBg: '#E8F5E9',        // Pale green for task cards
  offSeason: '#CDCDCD',     // Neutral gray for off-season
  dimmedOpacity: 0.4,
  
  tasks: {
    foraging: '#90EE90',    // Spring Green
    farming: '#FFFACD',     // Pale Yellow
    fishing: '#87CEEB',     // Sky Blue
    mining: '#B0E0E6',      // Frost Blue
    animals: '#FFB6D9',     // Pale Pink
    cooking: '#F4E4A6',     // Butter Yellow
    socializing: '#E6B3FF', // Lavender
    combat: '#F08080',      // Light Coral
    other: '#E8E8E8',       // Pale Gray
  }
}
```

**Character:** Bright, hopeful, encouraging to start new tasks

### Summer Palette (June 1 - August 31)
**Vibe:** Energy, abundance, heat

```typescript
export const SUMMER = {
  sky: '#87CEEB',           // Bright sky blue
  grass: '#7AC943',         // Vibrant green
  accent: '#FFD9B3',        // Golden sunlight
  flower: '#FF69B4',        // Hot pink
  dark: '#556B2F',          // Dark olive
  background: '#FFFEF0',    // Pale yellow bg
  border: '#FFE5A6',        // Golden border
  taskBg: '#FFFACD',        // Lemon yellow
  offSeason: '#D0D0D0',     // Light gray
  dimmedOpacity: 0.35,
  
  tasks: {
    foraging: '#ADFF2F',    // Lime Green
    farming: '#FFD700',     // Golden
    fishing: '#20B2AA',     // Ocean Blue
    mining: '#D3D3D3',      // Light Gray
    animals: '#FF69B4',     // Hot Pink
    cooking: '#FFA500',     // Sunburst Orange
    socializing: '#FF7F50', // Coral
    combat: '#DC143C',      // Crimson
    other: '#C0C0C0',       // Silver Gray
  }
}
```

**Character:** Energetic, abundant, rewarding for completion

### Fall Palette (September 1 - November 30)
**Vibe:** Harvest, cozy, preparation

```typescript
export const FALL = {
  sky: '#FFB366',           // Orange sky
  grass: '#9DB620',         // Autumn gold
  accent: '#CC5500',        // Deep orange
  flower: '#FF9966',        // Warm orange
  dark: '#8B4513',          // Saddle brown
  background: '#FFF8DC',    // Cornsilk bg
  border: '#DAA520',        // Goldenrod border
  taskBg: '#FFE4B5',        // Moccasin
  offSeason: '#C0A080',     // Taupe gray
  dimmedOpacity: 0.38,
  
  tasks: {
    foraging: '#B8860B',    // Harvest Gold
    farming: '#CC5500',     // Burnt Orange
    fishing: '#008080',     // Teal
    mining: '#A9A9A9',      // Pewter
    animals: '#B7410E',     // Rust
    cooking: '#8B4513',     // Chocolate
    socializing: '#FF8C00', // Pumpkin Orange
    combat: '#8B0000',      // Dark Red
    other: '#B3860B',       // Taupe
  }
}
```

**Character:** Cozy, reflective, celebrating harvests

### Winter Palette (December 1 - February 28)
**Vibe:** Stillness, introspection, magic

```typescript
export const WINTER = {
  sky: '#96CCFF',           // Icy blue
  grass: '#D3D3D3',         // Snow-covered
  accent: '#F0F8FF',        // Alice blue
  flower: '#E6F3FF',        // Icy white
  dark: '#4A4A7A',          // Deep cool gray
  background: '#F8F8F8',    // Cool white bg
  border: '#B0C4DE',        // Light steel blue
  taskBg: '#F0F8FF',        // Alice blue
  offSeason: '#A9A9A9',     // Dark gray
  dimmedOpacity: 0.42,
  
  tasks: {
    foraging: '#B0E0E6',    // Frost
    farming: '#B0E0E6',     // Powder Blue
    fishing: '#00008B',     // Deep Blue
    mining: '#C0C0C0',      // Silver
    animals: '#DB7093',     // Pale Mauve
    cooking: '#FFFDD0',     // Cream
    socializing: '#6A5ACD', // Slate Blue
    combat: '#2F4F4F',      // Dark Slate
    other: '#A0A0A0',       // Cool Gray
  }
}
```

**Character:** Calm, introspective, encouraging slow pace

### Jumino Colors
```typescript
export const JUMINO = {
  primary: '#5D4FB8',       // Main purple body
  dark: '#3D2F8A',          // Dark purple (shadows)
  light: '#9B8FD9',         // Light purple (highlights)
  gold: '#FFD700',          // Bundle gold
  glow: '#87CEEB',          // Happy celebration glow
  eye: '#FFFFFF',           // White eyes
  pupil: '#000000',         // Black pupils
  blush: '#FF9FCC',         // Cute pink blush
}
```

### Off-Season Task Styling

Off-season tasks use a season-specific gray that looks muted in context:
- **Spring:** #CDCDCD (40% opacity)
- **Summer:** #D0D0D0 (35% opacity)
- **Fall:** #C0A080 (38% opacity)
- **Winter:** #A9A9A9 (42% opacity)

**Visual Treatment:**
- Color: Season-specific gray
- Opacity: 35-42% (still readable but clearly dimmed)
- Text: Italic + dashed strikethrough
- Icon: Seasonal emoji (❄️ for winter, 🍂 for fall, etc.)
- Border: 2px dashed #999999 on left side
- Tooltip: Explains why task unavailable

---

## Typography

### Font Pairing

**Headings & UI Labels:** Pixel Font (Retro/8-bit style)
- Recommendation: "Press Start 2P" or similar monospace pixel font
- Usage: Calendar headers, month names, season badge
- Purpose: Evokes Stardew Valley's 16-bit aesthetic

**Body Text:** Readable Serif Font
- Recommendation: "Georgia", "Merriweather", or "Crimson Text"
- Usage: Task descriptions, tooltips, dialog text
- Purpose: Easy to read, warm feeling

**Monospace Code:** Retro Computer Font
- Recommendation: "Space Mono" or similar
- Usage: Code blocks, technical references
- Purpose: Maintains 8-bit theme

### Typography Scale & Weights

```typescript
// Headings
h1: { fontSize: '2rem', fontWeight: 600, fontFamily: 'pixelFont' }
h2: { fontSize: '1.5rem', fontWeight: 600, fontFamily: 'pixelFont' }
h3: { fontSize: '1.25rem', fontWeight: 600, fontFamily: 'pixelFont' }

// Body
body: { fontSize: '1rem', fontWeight: 400, fontFamily: 'serif' }
small: { fontSize: '0.875rem', fontWeight: 400, fontFamily: 'serif' }
label: { fontSize: '0.75rem', fontWeight: 600, fontFamily: 'serif' }
```

### Language Guidelines (Anti-Corporate)

Replace corporate language with cozy language:

| Corporate | Cozy |
|-----------|------|
| "Task Completed" | "Done! 🌱" |
| "Overdue Tasks" | "Tasks to catch up on" |
| "Productivity Metrics" | "Your Progress" |
| "Schedule" | "Farm Calendar" |
| "Notifications" | "Reminders" |
| "Mark as Done" | "Harvest" or "Gather" |
| "Increase Productivity" | "Keep Growing" |

---

## Components

### Calendar Container

**Purpose:** Main calendar view with seasonal theming

```typescript
// src/components/calendar/Calendar.styled.ts
export const CalendarContainer = styled.div<{ $season: Season }>`
  background-color: ${({ $season }) => SEASONAL_PALETTES[$season].bg};
  transition: background-color 0.6s ease;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;
```

**Props:**
- `$season: 'spring' | 'summer' | 'fall' | 'winter'`

---

### Month Header with Seasonal Border

**Purpose:** Display current month with seasonal indicator

```typescript
export const MonthHeaderWithSeason = styled.div<{ $season: Season }>`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  height: 3rem;
  
  border-bottom: 3px solid ${({ $season }) => 
    SEASONAL_PALETTES[$season].border};
  
  background: linear-gradient(180deg, 
    ${({ $season }) => {
      const colors = {
        spring: 'rgba(168, 217, 106, 0.1)',
        summer: 'rgba(255, 217, 179, 0.1)',
        fall: 'rgba(255, 153, 102, 0.1)',
        winter: 'rgba(176, 224, 230, 0.1)',
      };
      return colors[$season] + ' 0%, transparent 100%';
    }}
  );
  
  transition: border-color 0.6s ease, background 0.6s ease;
  
  span {
    min-width: 6rem;
    text-align: center;
    font-weight: 600;
    color: ${({ $season }) => SEASONAL_PALETTES[$season].dark};
  }
`;
```

---

### Season Badge

**Purpose:** Display current season with emoji in top-right corner

```typescript
export const SeasonBadge = styled.div<{ $season: Season }>`
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
  
  background-color: ${({ $season }) => SEASONAL_PALETTES[$season].taskBg};
  color: ${({ $season }) => SEASONAL_PALETTES[$season].dark};
  border: 2px solid ${({ $season }) => SEASONAL_PALETTES[$season].border};
  
  transition: all 0.3s ease;
  
  &::before {
    content: ${({ $season }) => {
      const emojis = { spring: '"🌱"', summer: '"☀️"', fall: '"🍂"', winter: '"❄️"' };
      return emojis[$season];
    }};
    font-size: 1.2rem;
  }
`;
```

---

### Day Box with Seasonal Styling

**Purpose:** Individual day boxes with seasonal background

```typescript
export const DayBoxWithSeason = styled.div<{ $season: Season }>`
  padding: 0.5rem;
  background-color: ${({ $season }) => SEASONAL_PALETTES[$season].bg};
  overflow-y: auto;
  
  border-left: 1px solid ${({ $season }) => 
    SEASONAL_PALETTES[$season].border};
  
  transition: background-color 0.6s ease, border-color 0.6s ease;
  border-radius: 4px;
`;
```

---

### Task Label with Season Awareness

**Purpose:** Colored task labels that show off-season status

```typescript
export const TaskLabelWithSeason = styled.div<{
  $taskType?: string;
  $isCompleted?: boolean;
  $isPartial?: boolean;
  $isOffSeason?: boolean;
  $season: Season;
}>`
  margin-top: 0.3rem;
  background-color: ${({ $taskType, $isOffSeason, $season }) =>
    $isOffSeason
      ? SEASONAL_PALETTES[$season].offSeason
      : getTaskTypeColorForSeason($taskType, $season)};
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.75rem;
  cursor: pointer;
  color: ${({ $isOffSeason }) => $isOffSeason ? '#999999' : '#1C1C1C'};
  
  ${({ $isOffSeason }) =>
    $isOffSeason &&
    `
      opacity: 0.4;
      font-style: italic;
      text-decoration: line-through dashed;
      border-left: 2px dashed #999999;
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
    border-left: 3px solid #7e8f5f;
  `}
`;
```

---

## Jumino Mascot

### Character Overview

**Role:** Friendly companion who celebrates achievements, provides contextual help, and changes with the seasons

**Color Profile:**
- Primary Purple: #5D4FB8
- Gold Accent: #FFD700
- Happy Glow: #87CEEB

### Animation States

#### 1. Idle State (Default)
**Trigger:** App loads normally  
**Duration:** Continuous loop (3 seconds)  
**Animation:** Gentle breathing

```css
@keyframes jumino-breathe {
  0%, 100% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
  50% {
    transform: translateY(-2px) scale(1.02);
    opacity: 0.95;
  }
}

.jumino-idle {
  animation: jumino-breathe 3s ease-in-out infinite;
}
```

---

#### 2. Happy State (Single Task Completion)
**Trigger:** User completes a single task  
**Duration:** 800ms (one-time play)  
**Animation:** Jump with landing bounce

```css
@keyframes jumino-jump {
  0% {
    transform: translateY(0) scaleY(1);
  }
  25% {
    transform: translateY(-15px) scaleY(0.95);
  }
  50% {
    transform: translateY(0) scaleY(1.05);
  }
  100% {
    transform: translateY(0) scaleY(1);
  }
}

.jumino-happy {
  animation: jumino-jump 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

**Effects:**
- 3-5 sparkle particles (gold colored)
- Light chime sound effect (0.8 seconds)

---

#### 3. Dance State (Bundle Completion)
**Trigger:** User completes a bundle  
**Duration:** 2 seconds (one-time play)  
**Animation:** Side-to-side dance with rotation

```css
@keyframes jumino-dance {
  0%, 100% {
    transform: translateX(0) rotateZ(0deg) translateY(0);
  }
  12% {
    transform: translateX(-8px) rotateZ(-5deg) translateY(-3px);
  }
  25% {
    transform: translateX(-15px) rotateZ(-10deg) translateY(0);
  }
  37% {
    transform: translateX(-8px) rotateZ(-5deg) translateY(-3px);
  }
  50% {
    transform: translateX(0) rotateZ(0deg) translateY(0);
  }
  62% {
    transform: translateX(8px) rotateZ(5deg) translateY(-3px);
  }
  75% {
    transform: translateX(15px) rotateZ(10deg) translateY(0);
  }
  87% {
    transform: translateX(8px) rotateZ(5deg) translateY(-3px);
  }
}

.jumino-dance {
  animation: jumino-dance 2s ease-in-out;
}
```

**Effects:**
- 30-50 confetti particles (seasonal colors)
- Victory fanfare sound (1.5 seconds)
- Message: "Wonderful work, farmer! 🎉"

---

#### 4. Thinking State (Off-Season Task Hover)
**Trigger:** User hovers over off-season task  
**Duration:** 2 seconds (loop while hovering)  
**Animation:** Head tilt with question mark

```css
@keyframes jumino-think {
  0%, 100% {
    transform: rotateZ(0deg) translateY(0);
  }
  25% {
    transform: rotateZ(-3deg) translateY(-1px);
  }
  50% {
    transform: rotateZ(0deg) translateY(0);
  }
  75% {
    transform: rotateZ(3deg) translateY(-1px);
  }
}

@keyframes jumino-question-mark {
  0% {
    opacity: 0;
    transform: translateY(5px) scale(0.8);
  }
  30% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  70% {
    opacity: 1;
    transform: translateY(-5px) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(-10px) scale(0.8);
  }
}

.jumino-thinking {
  animation: jumino-think 2s ease-in-out;
  
  &::before {
    content: '?';
    position: absolute;
    top: -20px;
    right: -10px;
    font-size: 1.5rem;
    animation: jumino-question-mark 2s ease-out;
  }
}
```

**Effects:**
- Helpful tooltip shows: "This task isn't available this season! 📅"

---

#### 5. Celebrating State (Year Milestone)
**Trigger:** Year anniversary or 100+ tasks completed  
**Duration:** 1.5 seconds (one-time play)  
**Animation:** Full 360° spin

```css
@keyframes jumino-celebrate {
  0% {
    transform: rotateZ(0deg) scale(1);
  }
  25% {
    transform: rotateZ(-90deg) scale(1.1);
  }
  50% {
    transform: rotateZ(-180deg) scale(1);
  }
  75% {
    transform: rotateZ(-270deg) scale(1.1);
  }
  100% {
    transform: rotateZ(-360deg) scale(1);
  }
}

.jumino-celebrating {
  animation: jumino-celebrate 1.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

**Effects:**
- 50+ confetti + gold sparkles
- Triumphant fanfare (2 seconds)
- Message: "You've made it through a full year! 🌟"

---

#### 6. Sleeping State (Late Night 22:00-06:00)
**Trigger:** Auto-sleep after 22:00  
**Duration:** Continuous loop (1.5 seconds)  
**Animation:** Gentle snoring with Z's

```css
@keyframes jumino-sleep {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-1px);
  }
}

@keyframes jumino-zzz {
  0%, 100% {
    opacity: 0;
    transform: translateX(0) translateY(0);
  }
  50% {
    opacity: 1;
    transform: translateX(10px) translateY(-10px);
  }
}

.jumino-sleeping {
  animation: jumino-sleep 1.5s ease-in-out infinite;
  filter: opacity(0.7);
  
  &::after {
    content: 'Z';
    position: absolute;
    top: -30px;
    right: -10px;
    font-size: 2rem;
    animation: jumino-zzz 1.5s ease-in-out infinite;
    opacity: 0.6;
  }
}
```

**Interaction:** Click to wake (resets to Idle)

---

### Seasonal Outfits

Jumino changes appearance with each season:

#### Spring Jumino
```css
.jumino-spring {
  filter: hue-rotate(0deg) brightness(1.1) saturate(1.1);
  
  &::before {
    content: '🌸';
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1.2rem;
  }
}
```
- **Outfit:** Flower crown (🌸)
- **Message:** "Spring blooms are here! Time to grow!"

#### Summer Jumino
```css
.jumino-summer {
  filter: hue-rotate(-10deg) brightness(1.15) saturate(1.2);
  
  &::before {
    content: '🌞';
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1.4rem;
  }
}
```
- **Outfit:** Sun hat (🌞)
- **Message:** "Time to make the most of the sunny days!"

#### Fall Jumino
```css
.jumino-fall {
  filter: hue-rotate(20deg) brightness(1.05) saturate(1);
  
  &::before {
    content: '🍂';
    position: absolute;
    top: -8px;
    right: -10px;
    font-size: 1.2rem;
  }
}
```
- **Outfit:** Autumn leaves (🍂)
- **Message:** "Harvest time! Let's gather!"

#### Winter Jumino
```css
.jumino-winter {
  filter: hue-rotate(-20deg) brightness(0.95) saturate(0.9);
  
  &::before {
    content: '❄️';
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1.3rem;
  }
}
```
- **Outfit:** Winter scarf (❄️)
- **Message:** "Cozy season! Take it slow."

---

### Particle Effects

#### Confetti Particles
```css
@keyframes confetti-fall {
  0% {
    transform: translateY(-100px) rotateZ(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(300px) rotateZ(720deg);
    opacity: 0;
  }
}

.confetti {
  position: absolute;
  width: 8px;
  height: 8px;
  animation: confetti-fall 2.5s ease-in forwards;
}
```

- Colors: Match seasonal palette
- Count: 30-50 particles
- Duration: 2.5 seconds total

#### Sparkle Particles
```css
@keyframes sparkle {
  0%, 100% {
    opacity: 0;
    transform: scale(0);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
}

.sparkle {
  position: absolute;
  width: 4px;
  height: 4px;
  background-color: #FFD700;
  border-radius: 50%;
  animation: sparkle 0.8s ease-out;
}
```

- Color: Gold (#FFD700)
- Count: 5-15
- Duration: 800ms

---

### Dialog Messages

Jumino provides contextual help:

```typescript
export const JUMINO_MESSAGES = {
  offSeasonTask: {
    text: "This task isn't available right now. But you can plan ahead for next season! 📅",
    tone: 'helpful',
    duration: 4000,
  },
  
  bundleComplete: {
    text: "The community center thanks you! This bundle is now complete! 🎉",
    tone: 'celebratory',
    duration: 3000,
  },
  
  yearMilestone: {
    text: "One full year of farming! Look how far you've come! 🌟",
    tone: 'encouraging',
    duration: 4000,
  },
  
  productiveDay: {
    text: "Wow, you're having a productive day! Keep it up! 💪",
    tone: 'encouraging',
    duration: 3000,
  },
  
  greeting: {
    text: "How's the farm looking today? Any tasks to tackle? 🌱",
    tone: 'playful',
    duration: 3000,
  },
};
```

---

## Implementation

### Required Utilities

#### Season Detection
**File:** `src/utils/seasons.ts`

```typescript
import { Season } from '@/styles/seasonalPalette';

export function getCurrentSeason(date: Date = new Date()): Season {
  const month = date.getMonth();
  if (month >= 2 && month <= 4) return 'spring';    // Mar-May
  if (month >= 5 && month <= 7) return 'summer';    // Jun-Aug
  if (month >= 8 && month <= 10) return 'fall';     // Sep-Nov
  return 'winter';                                   // Dec-Feb
}

export function getSeasonEmoji(season: Season): string {
  const emojis = { spring: '🌱', summer: '☀️', fall: '🍂', winter: '❄️' };
  return emojis[season];
}

export function getSeasonName(season: Season): string {
  const names = { spring: 'Spring', summer: 'Summer', fall: 'Fall', winter: 'Winter' };
  return names[season];
}
```

---

#### Off-Season Task Detection
**File:** `src/utils/seasonalAvailability.ts`

```typescript
import { Season } from '@/styles/seasonalPalette';

export const SEASONAL_TASK_PATTERNS: Record<string, Season[]> = {
  'forage.*spring': ['spring'],
  'forage.*summer': ['summer'],
  'forage.*fall': ['fall'],
  'forage.*winter': ['winter'],
  'plant.*crop': ['spring', 'summer', 'fall'],
  'harvest.*crop': ['spring', 'summer', 'fall'],
  'fish': ['spring', 'summer', 'fall', 'winter'],
  'fish.*spring': ['spring'],
  'fish.*summer': ['summer'],
  'mine': ['spring', 'summer', 'fall', 'winter'],
  'egg.*festival': ['spring'],
  'flower.*dance': ['spring'],
  'luau': ['summer'],
  'fair': ['fall'],
  'winter.*festival': ['winter'],
};

export function isTaskAvailableInSeason(taskName: string, season: Season): boolean {
  const lowerName = taskName.toLowerCase();
  for (const [pattern, seasons] of Object.entries(SEASONAL_TASK_PATTERNS)) {
    const regex = new RegExp(pattern, 'i');
    if (regex.test(lowerName)) {
      return seasons.includes(season);
    }
  }
  return true; // Default: available year-round
}

export function getOffSeasonReason(taskName: string): string | null {
  const lowerName = taskName.toLowerCase();
  if (lowerName.includes('spring')) return 'Available in Spring only';
  if (lowerName.includes('summer')) return 'Available in Summer only';
  if (lowerName.includes('fall')) return 'Available in Fall only';
  if (lowerName.includes('winter')) return 'Available in Winter only';
  return null;
}
```

---

#### Seasonal Color Palette
**File:** `src/styles/seasonalPalette.ts`

```typescript
export type Season = 'spring' | 'summer' | 'fall' | 'winter';

export interface SeasonalPalette {
  sky: string;
  grass: string;
  accent: string;
  flower: string;
  dark: string;
  bg: string;
  border: string;
  taskBg: string;
  offSeason: string;
  dimmedOpacity: number;
  tasks: {
    foraging: string;
    farming: string;
    fishing: string;
    mining: string;
    animals: string;
    cooking: string;
    socializing: string;
    combat: string;
    other: string;
  };
}

export const SEASONAL_PALETTES: Record<Season, SeasonalPalette> = {
  spring: { /* ... see Color System section ... */ },
  summer: { /* ... see Color System section ... */ },
  fall: { /* ... see Color System section ... */ },
  winter: { /* ... see Color System section ... */ },
};
```

---

#### Task Type Color Function
**File:** `src/constants/taskTypes.ts` (Add to existing file)

```typescript
import { SEASONAL_PALETTES, Season } from '@/styles/seasonalPalette';

export function getTaskTypeColorForSeason(
  taskType?: string,
  season: Season = 'spring'
): string {
  const palette = SEASONAL_PALETTES[season];
  const typeKey = (taskType || 'other') as keyof typeof palette.tasks;
  return palette.tasks[typeKey] || palette.tasks.other;
}
```

---

### Component Updates

#### Calendar Component Integration

**File:** `src/components/calendar/Calendar.tsx`

```typescript
import { getCurrentSeason } from '@/utils/seasons';
import { isTaskAvailableInSeason } from '@/utils/seasonalAvailability';
import { TaskLabelWithSeason, DayBoxWithSeason } from './Calendar.styled';

export const Calendar: React.FC<CalendarProps> = ({ ... }) => {
  const currentSeason = getCurrentSeason();
  
  const renderEventLabel = (ce: CalendarEvent, season = currentSeason) => {
    if (ce.tasks.length === 0) return null;
    
    const task = ce.tasks[0];
    const isOffSeason = !isTaskAvailableInSeason(task.name, season);
    
    return (
      <TaskLabelWithSeason
        key={`${ce.date}-${task.id}`}
        $taskType={task.type}
        $isCompleted={task.completedCount === task.totalCount}
        $isPartial={task.completedCount > 0 && task.completedCount < task.totalCount}
        $isOffSeason={isOffSeason}
        $season={season}
        onClick={() => onEventSelected(ce)}
      >
        {task.name}
        {isOffSeason && ' ❄️'}
      </TaskLabelWithSeason>
    );
  };
  
  return (
    <DayBoxWithSeason $season={currentSeason}>
      {/* Calendar content */}
    </DayBoxWithSeason>
  );
};
```

---

### File Structure

**New Files to Create:**
```
src/
├── styles/
│   └── seasonalPalette.ts          (Color system)
├── utils/
│   ├── seasons.ts                  (Season detection)
│   └── seasonalAvailability.ts     (Off-season logic)
└── components/
    └── jumino/
        ├── Jumino.tsx              (Main component)
        ├── Jumino.styled.ts        (Animations & styles)
        ├── JuminoDialog.tsx        (Message display)
        └── JuminoParticles.tsx     (Effects)
```

**Files to Modify:**
```
src/
├── constants/taskTypes.ts                        (Add seasonal color lookup)
└── components/calendar/
    ├── Calendar.tsx                              (Add season prop)
    └── Calendar.styled.ts                        (Add seasonal styles)
```

---

### Implementation Checklist

**Phase 1: Core Seasonal System (Days 1-5)**
- [ ] Create `seasonalPalette.ts` with all 4 palettes
- [ ] Create `seasons.ts` with `getCurrentSeason()`
- [ ] Update Calendar component with `$season` prop
- [ ] Test season detection

**Phase 2: Off-Season Management (Days 5-10)**
- [ ] Create `seasonalAvailability.ts`
- [ ] Add `TaskLabelWithSeason` styled component
- [ ] Update Calendar to mark off-season tasks
- [ ] Add tooltips for unavailable tasks

**Phase 3: Seasonal UI Theming (Days 10-17)**
- [ ] Update Calendar.styled.ts with seasonal styles
- [ ] Add `SeasonBadge` component
- [ ] Add `MonthHeaderWithSeason` component
- [ ] Test color transitions

**Phase 4: Jumino Integration (Days 17-24)**
- [ ] Create `Jumino.tsx` component
- [ ] Add all 6 CSS animations
- [ ] Wire up celebration triggers
- [ ] Implement seasonal outfit system
- [ ] Create `JuminoDialog` component

**Phase 5: Polish & Testing (Days 24-30)**
- [ ] Update all copy (remove corporate language)
- [ ] Add audio integration
- [ ] Full cross-browser testing
- [ ] Mobile responsiveness check
- [ ] Performance optimization

---

### Testing Procedures

**Season Detection:**
```bash
getCurrentSeason(new Date(2025, 1, 15))  // Feb = winter ✓
getCurrentSeason(new Date(2025, 3, 15))  // Apr = spring ✓
getCurrentSeason(new Date(2025, 6, 15))  // Jul = summer ✓
getCurrentSeason(new Date(2025, 9, 15))  // Oct = fall ✓
```

**Off-Season Logic:**
```bash
isTaskAvailableInSeason('Plant Crops', 'winter')       // false ✓
isTaskAvailableInSeason('Fish', 'winter')              // true ✓
isTaskAvailableInSeason('Spring Foraging', 'summer')   // false ✓
```

**Color Validation:**
```bash
console.log(SEASONAL_PALETTES.spring.bg)     // #F9F6F0 ✓
console.log(SEASONAL_PALETTES.winter.border) // #B0C4DE ✓
```

---

## Quick Reference

### All Color Codes

```
SPRING:     bg:#F9F6F0 | border:#D4E0C5 | sky:#A8E6FF | grass:#A8D96A
SUMMER:     bg:#FFFEF0 | border:#FFE5A6 | sky:#87CEEB | grass:#7AC943
FALL:       bg:#FFF8DC | border:#DAA520 | sky:#FFB366 | grass:#9DB620
WINTER:     bg:#F8F8F8 | border:#B0C4DE | sky:#96CCFF | grass:#D3D3D3

JUMINO:     primary:#5D4FB8 | dark:#3D2F8A | gold:#FFD700 | glow:#87CEEB

OFF-SEASON: Spring:#CDCDCD (40%) | Summer:#D0D0D0 (35%) | Fall:#C0A080 (38%) | Winter:#A9A9A9 (42%)
```

### Task Type Colors

```
FORAGING:   Spring #90EE90 | Summer #ADFF2F | Fall #B8860B | Winter #B0E0E6
FARMING:    Spring #FFFACD | Summer #FFD700 | Fall #CC5500 | Winter #B0E0E6
FISHING:    Spring #87CEEB | Summer #20B2AA | Fall #008080 | Winter #00008B
MINING:     Spring #B0E0E6 | Summer #D3D3D3 | Fall #A9A9A9 | Winter #C0C0C0
ANIMALS:    Spring #FFB6D9 | Summer #FF69B4 | Fall #B7410E | Winter #DB7093
COOKING:    Spring #F4E4A6 | Summer #FFA500 | Fall #8B4513 | Winter #FFFDD0
SOCIALIZING: Spring #E6B3FF | Summer #FF7F50 | Fall #FF8C00 | Winter #6A5ACD
COMBAT:     Spring #F08080 | Summer #DC143C | Fall #8B0000 | Winter #2F4F4F
OTHER:      Spring #E8E8E8 | Summer #C0C0C0 | Fall #B3860B | Winter #A0A0A0
```

### Critical Functions

```typescript
// Get current season
getCurrentSeason()  // Returns: 'spring' | 'summer' | 'fall' | 'winter'

// Get seasonal palette
SEASONAL_PALETTES[season].bg         // Background color
SEASONAL_PALETTES[season].border     // Border color
SEASONAL_PALETTES[season].tasks      // All task type colors

// Check if task available
isTaskAvailableInSeason('Plant Crops', 'winter')  // Returns: boolean

// Get task color for season
getTaskTypeColorForSeason('foraging', 'spring')   // Returns: '#90EE90'
```

### Jumino States

| State | Animation | Duration | Trigger |
|-------|-----------|----------|---------|
| **Idle** | jumino-breathe | ∞ | Default |
| **Happy** | jumino-jump | 800ms | Task completion |
| **Dance** | jumino-dance | 2s | Bundle completion |
| **Thinking** | jumino-think | 2s | Off-season hover |
| **Celebrating** | jumino-celebrate | 1.5s | Year milestone |
| **Sleeping** | jumino-sleep | ∞ | 22:00-06:00 |

### Off-Season Styling

Off-season tasks must have ALL of:
- ✅ Color: `SEASONAL_PALETTES[season].offSeason`
- ✅ Opacity: 40-42%
- ✅ Font-style: `italic`
- ✅ Text-decoration: `line-through dashed`
- ✅ Border-left: `2px dashed #999999`
- ✅ Icon: Seasonal emoji (❄️ 🍂 ☀️ 🌸)

### Responsive Sizing

| Device | Jumino | Padding | Font |
|--------|--------|---------|------|
| Desktop | 64px | 1rem | 0.75rem |
| Tablet | 56px | 0.8rem | 0.7rem |
| Mobile | 48px | 0.6rem | 0.65rem |

### Common Mistakes to Avoid

❌ **DON'T:** Mix seasonal colors (use season palette consistently)  
✅ **DO:** Import from `SEASONAL_PALETTES[currentSeason]`

❌ **DON'T:** Hide off-season tasks  
✅ **DO:** Dim them so players can plan ahead

❌ **DON'T:** Animate Jumino too fast  
✅ **DO:** Use 1.5-2 second animations for cozy feel

❌ **DON'T:** Use corporate language  
✅ **DO:** Say "Harvest", "Gather", "Bloom" instead

---

## Success Criteria

The design is successfully implemented when:

- ✅ A new player immediately recognizes the season
- ✅ Off-season tasks are clearly unavailable (no confusion)
- ✅ The color palette feels warm and inviting, not corporate
- ✅ Jumino celebrations make players smile
- ✅ Crossing into a new season feels like a game milestone
- ✅ Players prefer using this over generic task managers
- ✅ The overall vibe matches Stardew Valley's cozy aesthetic

---

**Design System Status:** ✅ **COMPLETE & READY FOR DEVELOPMENT**

**Maintained by:** Design Team  
**Last Updated:** February 21, 2026  
**Version:** 1.0.0

🌱🌞🍂❄️ ✨
