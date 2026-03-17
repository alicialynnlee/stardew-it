/**
 * Responsive Design Utilities & Breakpoints
 * Centralized mobile styling system for consistent responsive behavior across the app
 *
 * Breakpoints:
 * - initial (Phones (portrait)): 0px
 * - xs (Phones (landscape)):     520px
 * - sm (Tablets (portrait)):     768px
 * - md (Tablets (landscape)):    1024px
 * - lg (Laptops):                1280px
 * - xl (Desktops):               1640px
 *
 */

// Breakpoint definitions
export const BREAKPOINTS = {
  xs: 520,
  sm: 768,
  md: 1024,
  lg: 1280,
  xl: 1640,
};

/**
 * Common responsive padding/margin values
 */
export const spacing = {
  mobile: {
    // Main container padding
    container: '1rem', // 16px
    sectionVertical: '1.5rem', // 24px
    sectionHorizontal: '1rem', // 16px
    // Card/box spacing
    cardPadding: '1rem',
    cardGap: '1rem',
    // Button/interactive
    buttonMinHeight: '48px', // Touch-friendly minimum
    buttonPadding: '0.75rem 1rem',
  },
  tablet: {
    container: '1.5rem',
    sectionVertical: '2rem',
    sectionHorizontal: '1.5rem',
    cardPadding: '1.5rem',
    cardGap: '1.5rem',
    buttonMinHeight: '44px',
    buttonPadding: '0.75rem 1rem',
  },
  desktop: {
    container: '2rem',
    sectionVertical: '3rem',
    sectionHorizontal: '2rem',
    cardPadding: '2rem',
    cardGap: '2rem',
    buttonMinHeight: '40px',
    buttonPadding: '0.75rem 1rem',
  },
};
