# Design Quick Reference Card
**Keep this open while coding!**

---

## 🌱 SEASONAL COLOR PALETTE

```
SPRING (Mar-May)
├─ bg: #F9F6F0 | border: #D4E0C5 | sky: #A8E6FF | grass: #A8D96A
├─ Tasks: foraging #90EE90 | farming #FFFACD | fishing #87CEEB
└─ off-season: #CDCDCD (40% opacity)

SUMMER (Jun-Aug)
├─ bg: #FFFEF0 | border: #FFE5A6 | sky: #87CEEB | grass: #7AC943
├─ Tasks: foraging #ADFF2F | farming #FFD700 | fishing #20B2AA
└─ off-season: #D0D0D0 (35% opacity)

FALL (Sep-Nov)
├─ bg: #FFF8DC | border: #DAA520 | sky: #FFB366 | grass: #9DB620
├─ Tasks: foraging #B8860B | farming #CC5500 | fishing #008080
└─ off-season: #C0A080 (38% opacity)

WINTER (Dec-Feb)
├─ bg: #F8F8F8 | border: #B0C4DE | sky: #96CCFF | grass: #D3D3D3
├─ Tasks: foraging #B0E0E6 | farming #B0E0E6 | fishing #00008B
└─ off-season: #A9A9A9 (42% opacity)

JUMINO
├─ primary: #5D4FB8 | gold: #FFD700 | glow: #87CEEB
└─ darks: #3D2F8A | light: #9B8FD9
```

---

## 🔧 CRITICAL FUNCTIONS

### Get Current Season
```typescript
import { getCurrentSeason } from '@/utils/seasons';
const season = getCurrentSeason(); // 'spring' | 'summer' | 'fall' | 'winter'
```

### Get Seasonal Palette
```typescript
import { SEASONAL_PALETTES } from '@/styles/seasonalPalette';
const colors = SEASONAL_PALETTES[season];
// colors.bg, colors.border, colors.tasks, colors.offSeason, etc.
```

### Check If Task Available
```typescript
import { isTaskAvailableInSeason } from '@/utils/seasonalAvailability';
const available = isTaskAvailableInSeason('Plant Crops', 'winter'); // false
```

### Get Task Type Color (Seasonal)
```typescript
import { getTaskTypeColorForSeason } from '@/constants/taskTypes';
const color = getTaskTypeColorForSeason('foraging', 'spring'); // #90EE90
```

---

## 🎨 KEY STYLED COMPONENTS

### Calendar Container
```tsx
<CalendarContainer $season={currentSeason}>
  {/* Calendar content */}
</CalendarContainer>
```

### Month Header
```tsx
<MonthHeaderWithSeason $season={currentSeason}>
  ← {monthName} {year} →
</MonthHeaderWithSeason>
```

### Season Badge (Top Right)
```tsx
<SeasonBadge $season={currentSeason}>
  {getSeasonEmoji(currentSeason)} {getSeasonName(currentSeason)}
</SeasonBadge>
```

### Task Label
```tsx
<TaskLabelWithSeason
  $taskType={task.type}
  $isCompleted={isComplete}
  $isPartial={isPartial}
  $isOffSeason={isOffSeason}
  $season={currentSeason}
>
  {task.name}
  {isOffSeason && ' ❄️'}
</TaskLabelWithSeason>
```

### Day Box
```tsx
<DayBoxWithSeason $season={currentSeason}>
  {/* Day tasks */}
</DayBoxWithSeason>
```

---

## ✨ JUMINO ANIMATIONS

```css
/* Copy-paste these keyframes into your CSS */

@keyframes jumino-breathe {
  0%, 100% { transform: translateY(0) scale(1); opacity: 1; }
  50% { transform: translateY(-2px) scale(1.02); opacity: 0.95; }
}

@keyframes jumino-jump {
  0% { transform: translateY(0); }
  25% { transform: translateY(-15px) scaleY(0.95); }
  50% { transform: translateY(0) scaleY(1.05); }
  100% { transform: translateY(0); }
}

@keyframes jumino-dance {
  0%, 100% { transform: translateX(0) rotateZ(0deg); }
  25% { transform: translateX(-15px) rotateZ(-10deg); }
  50% { transform: translateX(0) rotateZ(0deg); }
  75% { transform: translateX(15px) rotateZ(10deg); }
}

@keyframes jumino-celebrate {
  0% { transform: rotateZ(0deg) scale(1); }
  25% { transform: rotateZ(-90deg) scale(1.1); }
  50% { transform: rotateZ(-180deg) scale(1); }
  75% { transform: rotateZ(-270deg) scale(1.1); }
  100% { transform: rotateZ(-360deg) scale(1); }
}
```

---

## 🎭 JUMINO STATES

| State | Trigger | Duration | Animation |
|-------|---------|----------|-----------|
| **Idle** | Default | ∞ | `jumino-breathe` (3s loop) |
| **Happy** | Task done | 800ms | `jumino-jump` |
| **Dance** | Bundle done | 2s | `jumino-dance` + confetti |
| **Thinking** | Hover task | 2s | Tilt head + "?" |
| **Celebrate** | Year done | 1.5s | `jumino-celebrate` + fanfare |
| **Sleeping** | 22:00-06:00 | ∞ | `jumino-sleep` (1.5s loop) |

---

## 📝 OFF-SEASON STYLING

Off-season tasks should have:
- ✅ Color: `SEASONAL_PALETTES[season].offSeason`
- ✅ Opacity: 40-42%
- ✅ Font: `italic`
- ✅ Text decoration: `line-through dashed`
- ✅ Border-left: `2px dashed #999999`
- ✅ Icon: Season emoji (❄️ 🍂 ☀️ 🌸)

```typescript
const isOffSeason = !isTaskAvailableInSeason(task.name, currentSeason);

return (
  <TaskLabel
    style={{
      color: isOffSeason ? '#999999' : '#1C1C1C',
      opacity: isOffSeason ? 0.4 : 1,
      fontStyle: isOffSeason ? 'italic' : 'normal',
      textDecoration: isOffSeason ? 'line-through dashed' : 'none',
      borderLeft: isOffSeason ? '2px dashed #999999' : 'none',
    }}
  >
    {task.name}
    {isOffSeason && ' ❄️'}
  </TaskLabel>
);
```

---

## 🌐 SEASON EMOJI

```typescript
const SEASON_EMOJI = {
  spring: '🌱',
  summer: '☀️',
  fall: '🍂',
  winter: '❄️',
};

const OFF_SEASON_EMOJI = {
  spring: '🌸',
  summer: '☀️',
  fall: '🍁',
  winter: '❄️',
};
```

---

## 📱 RESPONSIVE TWEAKS

**Desktop:**
- Jumino: 64px × 64px
- Padding: 1rem
- Font size: 0.75rem

**Tablet:**
- Jumino: 56px × 56px
- Padding: 0.8rem
- Font size: 0.7rem

**Mobile:**
- Jumino: 48px × 48px
- Padding: 0.6rem
- Font size: 0.65rem

---

## 🚨 COMMON MISTAKES

❌ **DON'T:** Use the same gray for all off-season tasks  
✅ **DO:** Use the season-specific gray from palette

❌ **DON'T:** Animate Jumino too fast (feels jarring)  
✅ **DO:** Use 1.5-2 second animations (feels cozy)

❌ **DON'T:** Mix seasonal colors with spring colors year-round  
✅ **DO:** Ensure all task colors match current season

❌ **DON'T:** Hide off-season tasks completely  
✅ **DO:** Dim them so players can still see & plan

❌ **DON'T:** Use corporate language ("productivity", "metrics")  
✅ **DO:** Use cozy language ("harvest", "gather", "bloom")

---

## 🧪 TESTING CHECKLIST

```bash
# Test season detection
getCurrentSeason(new Date(2025, 1, 15))  // Feb = winter
getCurrentSeason(new Date(2025, 3, 15))  // Apr = spring
getCurrentSeason(new Date(2025, 6, 15))  // Jul = summer
getCurrentSeason(new Date(2025, 9, 15))  // Oct = fall

# Test off-season
isTaskAvailableInSeason('Plant Crops', 'winter')      // false
isTaskAvailableInSeason('Fish', 'winter')             // true
isTaskAvailableInSeason('Spring Foraging', 'summer')  // false

# Test colors load
console.log(SEASONAL_PALETTES.spring.bg)              // #F9F6F0
console.log(SEASONAL_PALETTES.winter.border)          // #B0C4DE
```

---

## 📂 FILE LOCATIONS

**New Files to Create:**
- `src/styles/seasonalPalette.ts` ← Color system
- `src/utils/seasons.ts` ← Season detection
- `src/utils/seasonalAvailability.ts` ← Task availability
- `src/components/jumino/Jumino.tsx` ← Character
- `src/components/jumino/Jumino.styled.ts` ← Animations

**Files to Modify:**
- `src/components/calendar/Calendar.styled.ts` ← Add seasonal styles
- `src/components/calendar/Calendar.tsx` ← Add season props
- `src/constants/taskTypes.ts` ← Add seasonal color lookup

---

## 💬 HELPFUL MESSAGES FOR JUMINO

```typescript
// Off-season task
"This task isn't available right now. But you can plan ahead for next season! 📅"

// Bundle complete
"The community center thanks you! This bundle is now complete! 🎉"

// Year milestone
"One full year of farming! Look how far you've come! 🌟"

// High productivity day
"Wow, you're having a productive day! Keep it up! 💪"

// Friendly greeting
"How's the farm looking today? Any tasks to tackle? 🌱"
```

---

## ⚡ QUICK IMPLEMENTATION CHECKLIST

- [ ] Create `seasonalPalette.ts` with all 4 palettes
- [ ] Create `seasons.ts` with `getCurrentSeason()`
- [ ] Import `SEASONAL_PALETTES` in Calendar component
- [ ] Add `$season` prop to Calendar & styled components
- [ ] Create `seasonalAvailability.ts` with task classification
- [ ] Update `TaskLabel` component with off-season styling
- [ ] Create `Jumino.tsx` component with animations
- [ ] Add Jumino to layout (bottom-right corner)
- [ ] Test all 4 seasons (manually change date)
- [ ] Update copy (remove corporate language)
- [ ] Add Jumino messages/tooltips
- [ ] Performance test (smooth 60fps)
- [ ] Mobile responsiveness test

---

**Print this card and keep it handy!** 🎯

*Use together with SEASONAL_IMPLEMENTATION_GUIDE.md for detailed code examples*
