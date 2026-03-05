# Mobile Responsiveness Testing Checklist

## Device Testing Matrix

### Mobile Phones (375px - 640px width)

#### Homepage (Landing Page)
- [ ] Feature cards display in single column (1 col layout)
- [ ] CTA buttons stack vertically with full width
- [ ] Hero text is properly sized (tagline 0.75rem, subheading 1rem)
- [ ] No horizontal scrolling
- [ ] Touch-friendly button size (48px+ height)
- [ ] Feature card height is flexible (min-height: 300px, no fixed height)
- [ ] Proper padding on sides (1rem)

#### Dashboard Page
- [ ] Community Center card displays full width
- [ ] Today's Tasks card stacks above Upcoming Events
- [ ] Next Festival card is full width
- [ ] All cards have 1-column layout
- [ ] No horizontal scrolling
- [ ] Touch-friendly spacing for task items
- [ ] Greeting text is readable (16px+ body)

#### Farm Selection (NoFarmSelected)
- [ ] Hero section left-aligned with proper spacing
- [ ] Farm selector buttons are touch-friendly (48px+ height)
- [ ] Farm list displays vertically stacked
- [ ] Add farm input is full width
- [ ] No horizontal scrolling

#### Tracker Page
- [ ] Bundle grid displays 2 columns (6 → 2 responsive)
- [ ] Bundle buttons are touch-friendly squares (48x48px minimum)
- [ ] Room drawer/bundles display full width
- [ ] Task checkboxes are large enough to tap
- [ ] No horizontal scrolling
- [ ] Gap between buttons is adequate for finger navigation (2px→3px)

#### 404 Page
- [ ] Icon displays properly centered
- [ ] Text has proper spacing (1rem gap instead of 1.5rem)
- [ ] Padding around content is adequate (1.5rem)
- [ ] Button is full width or appropriately sized
- [ ] Page doesn't have unnecessary horizontal space

#### Navigation Elements
- [ ] Side navigation is hidden (display: none)
- [ ] Main content takes full width
- [ ] Top navbar is responsive:
  - [ ] Logo is smaller but visible
  - [ ] Auth actions stack properly
  - [ ] Farm selector displays full width or appropriate
  - [ ] Padding is reduced (0.75rem mobile vs 1rem)

### Tablet Devices (641px - 1024px width)

#### Homepage
- [ ] Feature cards display in 2 columns (3 → 2 responsive)
- [ ] CTA buttons are on same line if space allows
- [ ] Hero text scales up slightly (tagline 0.75rem, subheading 1rem)
- [ ] Proper padding on sides (1.5rem)
- [ ] Feature card height fixed at 400px
- [ ] Cards have adequate spacing between them

#### Dashboard Page
- [ ] Community Center card is full width
- [ ] Today's Tasks and Upcoming Events may be side-by-side (if space)
- [ ] Cards have proper gap (4px on tablet vs 2px on mobile)
- [ ] Touch-friendly spacing maintained
- [ ] Readability is excellent (1rem+ body text)

#### Tracker Page
- [ ] Bundle grid displays 3 columns (6 → 3 responsive)
- [ ] Bundle buttons maintain square ratio
- [ ] Bundle text is readable
- [ ] Gap between buttons is adequate (3px)
- [ ] Room drawer displays properly full width

#### Navigation Elements
- [ ] Side navigation is visible and functional
- [ ] Collapse/expand toggle works
- [ ] Top navbar has adequate spacing
- [ ] Farm selector shows properly
- [ ] No overlap between side nav and main content

### Desktop Devices (1025px+ width)

#### Homepage
- [ ] Feature cards display in 3 columns
- [ ] CTA buttons are on same line
- [ ] Hero text is at full size (tagline 0.85rem, subheading 1.25rem)
- [ ] Proper padding (2rem sides)
- [ ] Feature card height is 400px fixed
- [ ] Spacing and layout match design system

#### Dashboard Page
- [ ] 2-column layout: left column (Today's Tasks), right column (Upcoming Events + Festival)
- [ ] Cards have proper gap (4rem gap)
- [ ] All elements have optimal reading width
- [ ] Padding is generous (2rem)
- [ ] Hover effects work on cards (if implemented)

#### Tracker Page
- [ ] Bundle grid displays 6 columns (full width)
- [ ] Bundle buttons maintain visual hierarchy
- [ ] Room drawer displays properly
- [ ] Gap is optimal (3px)
- [ ] Horizontal scrolling is NOT present (6 columns should fit desktop)

#### Navigation Elements
- [ ] Side navigation is visible and takes 17rem when open
- [ ] Side navigation collapses to 9.3rem when closed
- [ ] Toggle button works smoothly
- [ ] Top navbar is spaced properly
- [ ] Farm selector dropdown works
- [ ] User menu functions correctly

## Responsive Component Verification

### Button Component
- [ ] Small button: 44px mobile, 40px desktop
- [ ] Medium button: 48px mobile, 44px desktop
- [ ] Large button: 56px mobile, 48px desktop
- [ ] Icon button: 48px mobile, 40px desktop
- [ ] Hover states work on desktop
- [ ] Active states work on all devices
- [ ] No overlap or cutoff of text

### Typography
- [ ] All body text is minimum 16px on mobile
- [ ] Headings scale proportionally
- [ ] Line height is adequate on all sizes (1.8 for paragraphs)
- [ ] Text contrast is good on all viewports

### Spacing
- [ ] Mobile padding: 1rem
- [ ] Tablet padding: 1.5rem
- [ ] Desktop padding: 2rem
- [ ] Gap between grid items scales appropriately
- [ ] No overflow or clipping

### Touch Targets
- [ ] All buttons: minimum 48px on mobile
- [ ] All links: minimum 48px height
- [ ] Form inputs: minimum 44px height
- [ ] Radio buttons: minimum 48px spacing
- [ ] Checkboxes: minimum 48px spacing

## Performance Checklist

- [ ] No unnecessary DOM elements on mobile
- [ ] CSS media queries are efficient
- [ ] No horizontal scrolling at any viewport
- [ ] Images scale properly on mobile
- [ ] Font loading doesn't block rendering
- [ ] No layout shifts on breakpoint changes

## Accessibility Checklist (Mobile Specific)

- [ ] Touch targets are at least 48px
- [ ] Text is readable without zooming
- [ ] Color contrast meets WCAG standards
- [ ] Form labels are properly associated
- [ ] Focus indicators are visible (keyboard nav)
- [ ] Touch events work without hover requirements

## Browser Compatibility

### Mobile Browsers
- [ ] iOS Safari 14+
- [ ] Android Chrome
- [ ] Android Firefox
- [ ] Samsung Internet

### Tablet Browsers
- [ ] iPad Safari 14+
- [ ] iPad Chrome
- [ ] Android tablets (Chrome, Firefox)

### Desktop Browsers
- [ ] Chrome/Edge latest
- [ ] Firefox latest
- [ ] Safari 14+

## Orientation Testing

### Mobile Phones
- [ ] Portrait mode (375x667px typical)
  - [ ] No horizontal scrolling
  - [ ] All content visible without zooming
  - [ ] Touch targets are accessible
  
- [ ] Landscape mode (667x375px typical)
  - [ ] Content doesn't overflow
  - [ ] Navigation still accessible
  - [ ] Readability maintained

### Tablets
- [ ] Portrait mode (768x1024px)
  - [ ] 3-column layout optimized
  - [ ] Side nav visible
  
- [ ] Landscape mode (1024x768px)
  - [ ] Full desktop experience
  - [ ] All features accessible

## Network Conditions (if applicable)

- [ ] Page loads on 3G connection
- [ ] Images load appropriately
- [ ] Interactive elements respond quickly
- [ ] No janky animations on slower devices

## Notes & Issues

- [ ] Issue #1: ___________________________________
- [ ] Issue #2: ___________________________________
- [ ] Issue #3: ___________________________________

## Sign-Off

- **Tested By**: ___________________
- **Date**: ___________________
- **Device**: ___________________
- **Browser**: ___________________
- **OS Version**: ___________________

## Final Verification

- [ ] All pages are mobile responsive
- [ ] No horizontal scrolling
- [ ] Touch targets are 48px minimum
- [ ] Typography is readable on all sizes
- [ ] Navigation works on mobile
- [ ] Build passes without errors
- [ ] No layout shifts on breakpoint changes
- [ ] Performance is acceptable on mobile networks
