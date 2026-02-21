# Seasonal Design Implementation - Quick Start Guide

## 🚀 Quick Copy-Paste Setup

### 1. Create Seasonal Palette Constants

**File:** `src/styles/seasonalPalette.ts` (NEW)

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
    dimmedOpacity: 0.4,
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
    dimmedOpacity: 0.35,
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
    dimmedOpacity: 0.38,
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
    dimmedOpacity: 0.42,
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
};
```

---

### 2. Create Season Detection Utility

**File:** `src/utils/seasons.ts` (NEW)

```typescript
import { Season } from '@/styles/seasonalPalette';

export function getCurrentSeason(date: Date = new Date()): Season {
  const month = date.getMonth(); // 0-11
  if (month >= 2 && month <= 4) return 'spring';    // Mar-May
  if (month >= 5 && month <= 7) return 'summer';    // Jun-Aug
  if (month >= 8 && month <= 10) return 'fall';     // Sep-Nov
  return 'winter'; // Dec-Feb
}

export function getSeasonEmoji(season: Season): string {
  const emojis = {
    spring: '🌱',
    summer: '☀️',
    fall: '🍂',
    winter: '❄️',
  };
  return emojis[season];
}

export function getSeasonName(season: Season): string {
  const names = {
    spring: 'Spring',
    summer: 'Summer',
    fall: 'Fall',
    winter: 'Winter',
  };
  return names[season];
}
```

---

### 3. Create Off-Season Task Detection

**File:** `src/utils/seasonalAvailability.ts` (NEW)

```typescript
import { Season } from '@/styles/seasonalPalette';

export const SEASONAL_TASK_PATTERNS: Record<string, Season[]> = {
  // Foraging
  'forage.*spring': ['spring'],
  'forage.*summer': ['summer'],
  'forage.*fall': ['fall'],
  'forage.*winter': ['winter'],
  
  // Farming (most crops unavailable in winter unless greenhouse)
  'plant.*crop': ['spring', 'summer', 'fall'],
  'harvest.*crop': ['spring', 'summer', 'fall'],
  'hoe.*field': ['spring', 'summer', 'fall'],
  
  // Fishing (year-round but species vary)
  'fish': ['spring', 'summer', 'fall', 'winter'],
  'fish.*spring': ['spring'],
  'fish.*summer': ['summer'],
  
  // Mining (year-round)
  'mine': ['spring', 'summer', 'fall', 'winter'],
  
  // Socializing (some are season-specific)
  'egg.*festival': ['spring'],
  'flower.*dance': ['spring'],
  'luau': ['summer'],
  'fair': ['fall'],
  'winter.*festival': ['winter'],
};

export function isTaskAvailableInSeason(
  taskName: string,
  season: Season
): boolean {
  const lowerName = taskName.toLowerCase();
  
  // Check patterns
  for (const [pattern, seasons] of Object.entries(SEASONAL_TASK_PATTERNS)) {
    const regex = new RegExp(pattern, 'i');
    if (regex.test(lowerName)) {
      return seasons.includes(season);
    }
  }
  
  // Default: available year-round
  return true;
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

### 4. Update Task Colors for Season

**File:** `src/constants/taskTypes.ts` (MODIFY)

```typescript
// Add this function to the existing file
import { getTaskTypeColor } from '@/constants/taskTypes';
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

### 5. Update Calendar with Seasonal Theming

**File:** `src/components/calendar/Calendar.styled.ts` (MODIFY)

Add these styled components:

```typescript
import { Season, SEASONAL_PALETTES } from '@/styles/seasonalPalette';
import styled from 'styled-components';

export const CalendarContainer = styled.div<{ $season: Season }>`
  background-color: ${({ $season }) => SEASONAL_PALETTES[$season].bg};
  transition: background-color 0.6s ease;
`;

export const MonthHeaderWithSeason = styled.div<{ $season: Season }>`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  height: 3rem;
  
  border-bottom: 3px solid ${({ $season }) => SEASONAL_PALETTES[$season].border};
  background: linear-gradient(180deg, 
    ${({ $season }) => {
      const palette = SEASONAL_PALETTES[$season];
      return `rgba(${hexToRgb(palette.accent)}, 0.1) 0%, transparent 100%`;
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
`;

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
  color: ${({ $isOffSeason }) => ($isOffSeason ? '#999999' : '#1C1C1C')};
  
  ${({ $isOffSeason }) =>
    $isOffSeason &&
    `
      opacity: ${SEASONAL_PALETTES['spring'].dimmedOpacity};
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

export const DayBoxWithSeason = styled.div<{ $season: Season }>`
  padding: 0.5rem;
  background-color: ${({ $season }) => {
    const palette = SEASONAL_PALETTES[$season];
    // Lighten the background slightly
    return palette.bg;
  }};
  overflow-y: auto;
  
  border-left: 1px solid ${({ $season }) => SEASONAL_PALETTES[$season].border};
  transition: background-color 0.6s ease, border-color 0.6s ease;
`;
```

Helper function:
```typescript
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '0,0,0';
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}
```

---

### 6. Update Calendar Component

**File:** `src/components/calendar/Calendar.tsx` (MODIFY)

```typescript
import { getCurrentSeason } from '@/utils/seasons';
import { isTaskAvailableInSeason } from '@/utils/seasonalAvailability';
import { TaskLabelWithSeason, DayBoxWithSeason } from './Calendar.styled';

export const Calendar: React.FC<CalendarProps> = ({ ... }) => {
  const currentSeason = getCurrentSeason();
  
  // Update renderEventLabel
  const renderEventLabel = (
    ce: CalendarEvent,
    season = currentSeason
  ) => {
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

## 🎯 Testing Checklist

- [ ] Colors update correctly each season (manually test by changing system date)
- [ ] Off-season tasks show dimmed with dashed strikethrough
- [ ] Calendar border & background smoothly transition
- [ ] Season badge displays correct emoji
- [ ] Task colors match seasonal palette
- [ ] Completed tasks still show green
- [ ] Partial completion border still visible
- [ ] No console errors
- [ ] Responsive on mobile

---

## 📱 Browser Testing

Visit the calendar in each "season":

```bash
# Test by temporarily modifying date in browser console:
getCurrentSeason(new Date(2025, 1, 15))  // Feb = Winter
getCurrentSeason(new Date(2025, 3, 15))  // Apr = Spring
getCurrentSeason(new Date(2025, 6, 15))  // Jul = Summer
getCurrentSeason(new Date(2025, 9, 15))  // Oct = Fall
```

---

## 🎨 Final Polish

After implementing core features:

1. **Add Jumino Component** (`src/components/jumino/Jumino.tsx`)
2. **Update Empty States** with seasonal messages
3. **Fine-tune Colors** based on actual app appearance
4. **Add Animations** for season transitions
5. **Update Copy** - Remove corporate language

---

**Status:** Ready to implement! 🚀
