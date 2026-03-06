/**
 * Responsive Design Utilities & Breakpoints
 * Centralized mobile styling system for consistent responsive behavior across the app
 *
 * Breakpoints:
 * - mobile: 0px - 640px (default)
 * - tablet: 641px - 1024px
 * - desktop: 1025px+
 */

import { css } from 'styled-components';

// Breakpoint definitions
export const BREAKPOINTS = {
  mobile: 640,
  tablet: 1024,
  desktop: 1025,
};

/**
 * Media query helpers for styled-components
 */
export const media = {
  mobile: (styles: ReturnType<typeof css>) =>
    css`
      @media (max-width: ${BREAKPOINTS.mobile}px) {
        ${styles}
      }
    `,

  tablet: (styles: ReturnType<typeof css>) =>
    css`
      @media (min-width: ${BREAKPOINTS.mobile + 1}px) and (max-width: ${BREAKPOINTS.tablet}px) {
        ${styles}
      }
    `,

  tabletUp: (styles: ReturnType<typeof css>) =>
    css`
      @media (min-width: ${BREAKPOINTS.mobile + 1}px) {
        ${styles}
      }
    `,

  desktop: (styles: ReturnType<typeof css>) =>
    css`
      @media (min-width: ${BREAKPOINTS.desktop}px) {
        ${styles}
      }
    `,

  desktopUp: (styles: ReturnType<typeof css>) =>
    css`
      @media (min-width: ${BREAKPOINTS.tablet + 1}px) {
        ${styles}
      }
    `,

  touchDevice: (styles: ReturnType<typeof css>) =>
    css`
      @media (hover: none) and (pointer: coarse) {
        ${styles}
      }
    `,
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

/**
 * Responsive Grid Columns Mappings
 * Define how many columns to show at each breakpoint
 */
export const gridColumns = {
  // Single column layout on mobile
  single: {
    mobile: 1,
    tablet: 1,
    desktop: 1,
  },
  // Two column on desktop, single on mobile
  twoColumn: {
    mobile: 1,
    tablet: 2,
    desktop: 2,
  },
  // Three column on desktop, two on tablet, single on mobile
  threeColumn: {
    mobile: 1,
    tablet: 2,
    desktop: 3,
  },
  // Four column on desktop, two on tablet
  fourColumn: {
    mobile: 1,
    tablet: 2,
    desktop: 4,
  },
  // Six column on desktop, three on tablet, two on mobile
  sixColumn: {
    mobile: 2,
    tablet: 3,
    desktop: 6,
  },
};

/**
 * Responsive Typography
 */
export const typography = {
  mobile: {
    heading1: '1.75rem', // ~28px
    heading2: '1.5rem', // ~24px
    heading3: '1.25rem', // ~20px
    body: '1rem', // ~16px (minimum for readability)
    small: '0.875rem', // ~14px
  },
  desktop: {
    heading1: '2.25rem',
    heading2: '2rem',
    heading3: '1.5rem',
    body: '1rem',
    small: '0.875rem',
  },
};

/**
 * Touch-friendly button sizing
 */
export const touchTargetSize = {
  small: '40px',
  medium: '48px', // Recommended minimum
  large: '56px',
};

/**
 * CSS utilities for common responsive patterns
 */
export const responsivePatterns = {
  // Full-width flex with stacked layout on mobile
  stackedFlex: css`
    display: flex;
    flex-direction: column;

    @media (min-width: ${BREAKPOINTS.tablet + 1}px) {
      flex-direction: row;
    }
  `,

  // Responsive grid that collapses to single column
  autoGrid: css`
    display: grid;
    grid-template-columns: 1fr;
    gap: ${spacing.mobile.cardGap};

    @media (min-width: ${BREAKPOINTS.tablet + 1}px) {
      grid-template-columns: repeat(2, 1fr);
      gap: ${spacing.tablet.cardGap};
    }

    @media (min-width: ${BREAKPOINTS.desktop}px) {
      grid-template-columns: repeat(3, 1fr);
      gap: ${spacing.desktop.cardGap};
    }
  `,

  // Touch-friendly button sizing
  touchButton: css`
    min-height: ${touchTargetSize.medium};
    min-width: ${touchTargetSize.medium};

    @media (min-width: ${BREAKPOINTS.tablet + 1}px) {
      min-height: 40px;
      min-width: auto;
    }
  `,

  // Container that respects safe area on mobile
  safeContainer: css`
    padding: ${spacing.mobile.sectionHorizontal};
    max-width: 100%;

    @media (min-width: ${BREAKPOINTS.tablet + 1}px) {
      padding: ${spacing.tablet.sectionHorizontal};
    }

    @media (min-width: ${BREAKPOINTS.desktop}px) {
      padding: ${spacing.desktop.sectionHorizontal};
      max-width: 1400px;
      margin: 0 auto;
    }
  `,
};

/**
 * Responsive helper for conditional display
 * Usage: ${hiddenOnMobile} to hide an element on mobile
 */
export const hiddenOnMobile = css`
  @media (max-width: ${BREAKPOINTS.mobile}px) {
    display: none;
  }
`;

export const visibleOnMobileOnly = css`
  @media (min-width: ${BREAKPOINTS.mobile + 1}px) {
    display: none;
  }
`;

/**
 * Common responsive font sizes that maintain readability
 */
export const responsiveFontSize = (
  mobileSize: string,
  desktopSize: string
) => css`
  font-size: ${mobileSize};

  @media (min-width: ${BREAKPOINTS.desktop}px) {
    font-size: ${desktopSize};
  }
`;
