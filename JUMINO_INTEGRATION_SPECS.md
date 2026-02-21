# Jumino Integration - Character Design & Animation Specs

## 🐿️ Jumino Overview

**Role in App:** Friendly companion mascot who:
- Celebrates user achievements
- Provides contextual help for off-season tasks
- Changes outfit with seasons
- Reacts to milestone events (bundle completion, year anniversaries)
- Encourages cozy, non-stressful task management

**Color Profile:**
- Primary Purple: `#5D4FB8`
- Gold Accent: `#FFD700`
- Happy Glow: `#87CEEB` (sky blue for celebration)

---

## 🎬 Jumino Animation States

### 1. **Idle State** (Default)

**Appearance:** Jumino sits peacefully in corner, breathing gently

**CSS Animation:**
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

**Duration:** Continuous (loops)  
**Trigger:** Default state when app loads  
**Audio:** Soft chirp every 8 seconds (optional)

---

### 2. **Happy State** (Task Completion)

**Appearance:** Jumino jumps with a small bounce

**CSS Animation:**
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

**Duration:** 800ms (single play)  
**Trigger:** Single task completion  
**Particles:** Small stars around Jumino (3-5)  
**Audio:** Light chime sound effect

---

### 3. **Dance State** (Bundle Completion)

**Appearance:** Jumino dances side-to-side with enthusiasm

**CSS Animation:**
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

**Duration:** 2000ms (single play)  
**Trigger:** Bundle completion / seasonal milestone  
**Particles:** Confetti/leaves/snowflakes (30-50 depending on season)  
**Audio:** Victory fanfare (8-bit style, 1.5 seconds)  
**Message Overlay:** "Wonderful work, farmer! 🎉"

---

### 4. **Thinking State** (Help Offered)

**Appearance:** Jumino tilts head thoughtfully, question mark appears

**CSS Animation:**
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

**Duration:** 2000ms (single play)  
**Trigger:** Hovering over off-season task  
**Tooltip:** Shows contextual help ("This task is unavailable in Winter!")

---

### 5. **Celebrating State** (Year Milestone)

**Appearance:** Jumino spins with celebration particles

**CSS Animation:**
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

**Duration:** 1500ms (single play)  
**Trigger:** Year anniversary reached / 100+ tasks completed  
**Particles:** Confetti + gold sparkles (50+ particles)  
**Audio:** Triumphant fanfare (2 seconds)  
**Message Overlay:** "You've made it through [Season/Year]! Incredible!"

---

### 6. **Sleeping State** (Late Night)

**Appearance:** Jumino eyes closed, gentle snoring animation

**CSS Animation:**
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

**Duration:** Continuous (loops)  
**Trigger:** Between 22:00 - 06:00 (auto-sleep mode)  
**Interactive:** Clicking wakes Jumino (resets to Idle)

---

## ✨ Particle Effects

### Confetti Particles (Bundle Completion)

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
  
  &.confetti-1 { left: 20%; animation-delay: 0s; }
  &.confetti-2 { left: 30%; animation-delay: 0.1s; }
  &.confetti-3 { left: 40%; animation-delay: 0.2s; }
  /* ... etc for 30-50 particles */
}
```

**Colors:** Seasonal palette colors  
**Direction:** All downward + slight lateral drift  
**Duration:** 2.5 seconds per particle

### Sparkle Particles (Small Achievements)

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

**Color:** Gold (#FFD700)  
**Count:** 5-15 around Jumino  
**Duration:** 800ms total

### Seasonal Particles

```typescript
// In celebration scenes, match season
const seasonalParticles = {
  spring: '🌸',  // Flower petals
  summer: '☀️',  // Sun rays
  fall: '🍂',    // Falling leaves
  winter: '❄️',  // Snowflakes
};

// Render emoji as particles instead of confetti blocks
```

---

## 🎭 Jumino Seasonal Appearances

### Spring Jumino
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
- Outfit: Flower crown (🌸)
- Colors: Slightly brighter purples, pink accents
- Vibe: Energetic, hopeful

### Summer Jumino
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
- Outfit: Sun hat (🌞)
- Colors: Warmer, slightly desaturated
- Vibe: Energetic, warm

### Fall Jumino
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
- Outfit: Autumn leaves (🍂)
- Colors: Earth tones, warm browns
- Vibe: Cozy, reflective

### Winter Jumino
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
- Outfit: Winter scarf (❄️)
- Colors: Cool blues, pale tones
- Vibe: Calm, introspective

---

## 💬 Jumino Dialog System

### Context-Aware Messages

```typescript
interface JuminoMessage {
  text: string;
  tone: 'helpful' | 'celebratory' | 'encouraging' | 'playful';
  duration: number; // milliseconds
  icon?: string;
}

export const JUMINO_MESSAGES: Record<string, JuminoMessage> = {
  // Off-season task
  offSeasonTask: {
    text: "This task isn't available right now. But you can plan ahead for next season! 📅",
    tone: 'helpful',
    duration: 4000,
    icon: '💡',
  },
  
  // Bundle complete
  bundleComplete: {
    text: "The community center thanks you! This bundle is now complete! 🎉",
    tone: 'celebratory',
    duration: 3000,
    icon: '✨',
  },
  
  // Year milestone
  yearMilestone: {
    text: "One full year of farming! Look how far you've come! 🌟",
    tone: 'encouraging',
    duration: 4000,
    icon: '🎊',
  },
  
  // High productivity day
  productiveDay: {
    text: "Wow, you're having a productive day! Keep it up! 💪",
    tone: 'encouraging',
    duration: 3000,
    icon: '⭐',
  },
  
  // Random friendly greeting
  greeting: {
    text: "How's the farm looking today? Any tasks to tackle? 🌱",
    tone: 'playful',
    duration: 3000,
    icon: '👋',
  },
};
```

### Message Display Component

```typescript
interface JuminoDialogProps {
  message: JuminoMessage;
  position?: 'above' | 'below' | 'left' | 'right';
  autoHide?: boolean;
  onClose?: () => void;
}

export const JuminoDialog: React.FC<JuminoDialogProps> = ({
  message,
  position = 'above',
  autoHide = true,
  onClose,
}) => {
  // Styled speech bubble above/around Jumino
  // Auto-hides after duration if autoHide = true
  // Dismissible with click
};
```

---

## 🖱️ Interaction States

### Hover State
```css
.jumino:hover {
  transform: scale(1.1);
  cursor: pointer;
  filter: drop-shadow(0 0 8px rgba(93, 79, 184, 0.4));
}
```
- Slight scale-up
- Glow effect
- Shows tooltip hint

### Click/Active State
```css
.jumino:active {
  transform: scale(0.95);
  animation: none;
}
```
- Slight depression (tactile feedback)
- Stops current animation
- Triggers message/action

### Disabled State
```css
.jumino:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  filter: grayscale(1);
}
```
- Grayed out during loading
- Cannot interact

---

## 📋 Implementation Checklist

### Component Creation
- [ ] `src/components/jumino/Jumino.tsx` - Main component
- [ ] `src/components/jumino/Jumino.styled.ts` - Animations & styles
- [ ] `src/components/jumino/JuminoDialog.tsx` - Message display
- [ ] `src/components/jumino/JuminoParticles.tsx` - Particle effects

### Animations
- [ ] Implement all CSS keyframes
- [ ] Test smooth transitions
- [ ] Verify particle effects render
- [ ] Audio loading & playback

### Integration Points
- [ ] Wire up to bundle completion trigger
- [ ] Wire up to task completion trigger
- [ ] Add off-season task detection
- [ ] Implement seasonal outfit system

### Testing
- [ ] All animations play smoothly (60 fps)
- [ ] Particles don't cause lag
- [ ] Messages display correctly
- [ ] Seasonal changes apply
- [ ] Mobile responsive

---

## 🎵 Audio Assets Needed

| Sound | Duration | Usage |
|-------|----------|-------|
| `jumino-chirp.wav` | 0.5s | Idle greeting |
| `task-complete.wav` | 0.8s | Single task done |
| `bundle-complete.wav` | 1.5s | Bundle finished |
| `triumph-fanfare.wav` | 2.0s | Year milestone |
| `celebration.wav` | 2.5s | Major achievement |

All sounds should be:
- 8-bit style (to match Stardew Valley)
- Low volume (~50-60% of system volume)
- 44.1 kHz, mono
- No reverb/delay (crisp, direct)

---

## 🎨 Color References for Jumino

```typescript
export const JUMINO_COLORS = {
  primary: '#5D4FB8',      // Main purple body
  dark: '#3D2F8A',         // Dark purple (shadows)
  light: '#9B8FD9',        // Light purple (highlights)
  eye: '#FFFFFF',          // White eyes
  pupil: '#000000',        // Black pupils
  blush: '#FF9FCC',        // Cute pink blush
  gold: '#FFD700',         // Bundle gold
  glow: '#87CEEB',         // Happy celebration glow
};
```

---

**Design Spec by:** Ivy (Designer)  
**Date:** February 21, 2026  
**Status:** Ready for Development 🚀
