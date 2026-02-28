'use client';

import { createGlobalStyle } from 'styled-components';
import { charcoalBlack, whiteSmoke } from './colors';

const GlobalStyles = createGlobalStyle`
  :root {
    --background: ${whiteSmoke};
    --foreground: ${charcoalBlack};

    /* Custom theme colors - Light mode */
    --custom-1: #f7f8f5;
    --custom-2: #f2f4ef;
    --custom-3: #e7eedc;
    --custom-4: #dce7cb;
    --custom-5: #d1debb;
    --custom-6: #c4d4ab;
    --custom-7: #b4c598;
    --custom-8: #9db17a;
    --custom-9: #728255;
    --custom-10: #657549;
    --custom-11: #5b6a3e;
    --custom-12: #2a311c;

    --custom-a1: #7ba52606;
    --custom-a2: #517b110c;
    --custom-a3: #5e98041f;
    --custom-a4: #5b960130;
    --custom-a5: #5a8d0341;
    --custom-a6: #50820151;
    --custom-a7: #48730164;
    --custom-a8: #456c0083;
    --custom-a9: #2d4502a9;
    --custom-a10: #283e00b5;
    --custom-a11: #273b00c0;
    --custom-a12: #111901e3;

    --custom-contrast: #fff;
    --custom-surface: #f0f3eccc;
    --custom-indicator: #728255;
    --custom-track: #728255;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --background: ${charcoalBlack};
      --foreground: ${whiteSmoke};

      /* Custom theme colors - Dark mode */
      --custom-1: #1a1d1a;
      --custom-2: #1f231f;
      --custom-3: #252925;
      --custom-4: #2b302b;
      --custom-5: #313731;
      --custom-6: #373e37;
      --custom-7: #3d453d;
      --custom-8: #434c43;
      --custom-9: #495349;
      --custom-10: #4f5a4f;
      --custom-11: #556155;
      --custom-12: #5b685b;

      --custom-a1: #7ba52606;
      --custom-a2: #517b110c;
      --custom-a3: #5e98041f;
      --custom-a4: #5b960130;
      --custom-a5: #5a8d0341;
      --custom-a6: #50820151;
      --custom-a7: #48730164;
      --custom-a8: #456c0083;
      --custom-a9: #2d4502a9;
      --custom-a10: #283e00b5;
      --custom-a11: #273b00c0;
      --custom-a12: #111901e3;

      --custom-contrast: #fff;
      --custom-surface: rgba(255, 255, 255, 0.1);
      --custom-indicator: #728255;
      --custom-track: #728255;
    }
  }

  @supports (color: color(display-p3 1 1 1)) {
    @media (color-gamut: p3) {
      :root {
        --custom-1: oklch(97.7% 0.003 124.4);
        --custom-2: oklch(96.5% 0.0068 124.4);
        --custom-3: oklch(93.9% 0.0254 124.4);
        --custom-4: oklch(91.2% 0.0397 124.4);
        --custom-5: oklch(88.2% 0.05 124.4);
        --custom-6: oklch(84.6% 0.0574 124.4);
        --custom-7: oklch(79.8% 0.064 124.4);
        --custom-8: oklch(73.2% 0.0788 124.4);
        --custom-9: oklch(58.2% 0.0678 124.4);
        --custom-10: oklch(53.8% 0.0678 124.4);
        --custom-11: oklch(50% 0.0678 124.4);
        --custom-12: oklch(30.1% 0.0371 124.4);

        --custom-a1: color(display-p3 0.3922 0.5882 0 / 0.02);
        --custom-a2: color(display-p3 0.2706 0.4471 0 / 0.044);
        --custom-a3: color(display-p3 0.3529 0.5608 0 / 0.112);
        --custom-a4: color(display-p3 0.3725 0.5686 0 / 0.18);
        --custom-a5: color(display-p3 0.3451 0.5255 0 / 0.24);
        --custom-a6: color(display-p3 0.3137 0.4706 0 / 0.3);
        --custom-a7: color(display-p3 0.2824 0.4196 0 / 0.376);
        --custom-a8: color(display-p3 0.2667 0.3882 0 / 0.488);
        --custom-a9: color(display-p3 0.1647 0.2471 0 / 0.64);
        --custom-a10: color(display-p3 0.149 0.2235 0 / 0.688);
        --custom-a11: color(display-p3 0.1451 0.2078 0 / 0.732);
        --custom-a12: color(display-p3 0.0588 0.0863 0 / 0.88);

        --custom-contrast: #fff;
        --custom-surface: color(display-p3 0.9451 0.9529 0.9333 / 0.8);
        --custom-indicator: oklch(58.2% 0.0678 124.4);
        --custom-track: oklch(58.2% 0.0678 124.4);
      }

      @media (prefers-color-scheme: dark) {
        :root {
          --custom-1: oklch(20% 0.003 124.4);
          --custom-2: oklch(22% 0.0068 124.4);
          --custom-3: oklch(24% 0.0254 124.4);
          --custom-4: oklch(26% 0.0397 124.4);
          --custom-5: oklch(28% 0.05 124.4);
          --custom-6: oklch(30% 0.0574 124.4);
          --custom-7: oklch(32% 0.064 124.4);
          --custom-8: oklch(34% 0.0788 124.4);
          --custom-9: oklch(36% 0.0678 124.4);
          --custom-10: oklch(38% 0.0678 124.4);
          --custom-11: oklch(40% 0.0678 124.4);
          --custom-12: oklch(42% 0.0371 124.4);

          --custom-surface: color(display-p3 0.1 0.1 0.1 / 0.8);
        }
      }
    }
  }

  html,
  body {
    max-width: 100vw;
    overflow-x: hidden;
    height: 100%;
    margin: 0;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: Roboto;
    background: var(--background);
    color: var(--foreground);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  main {
    padding: 1.5rem;
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    width: 100%;
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    cursor: pointer;
  }
  
  // radix
  .radix-themes {
    --cursor-button: pointer;
    --cursor-checkbox: pointer;
    --cursor-disabled: default;
    --cursor-link: pointer;
    --cursor-menu-item: pointer;
    --cursor-radio: pointer;
    --cursor-slider-thumb: grab;
    --cursor-slider-thumb-active: grabbing;
    --cursor-switch: pointer;

    /* Custom theme mapping */
    --accent-1: var(--custom-1);
    --accent-2: var(--custom-2);
    --accent-3: var(--custom-3);
    --accent-4: var(--custom-4);
    --accent-5: var(--custom-5);
    --accent-6: var(--custom-6);
    --accent-7: var(--custom-7);
    --accent-8: var(--custom-8);
    --accent-9: var(--custom-9);
    --accent-10: var(--custom-10);
    --accent-11: var(--custom-11);
    --accent-12: var(--custom-12);

    --accent-contrast: var(--custom-contrast);
    --accent-surface: var(--custom-surface);
    --accent-indicator: var(--custom-indicator);
    --accent-track: var(--custom-track);

    --accent-a1: var(--custom-a1);
    --accent-a2: var(--custom-a2);
    --accent-a3: var(--custom-a3);
    --accent-a4: var(--custom-a4);
    --accent-a5: var(--custom-a5);
    --accent-a6: var(--custom-a6);
    --accent-a7: var(--custom-a7);
    --accent-a8: var(--custom-a8);
    --accent-a9: var(--custom-a9);
    --accent-a10: var(--custom-a10);
    --accent-a11: var(--custom-a11);
    --accent-a12: var(--custom-a12);

    --default-font-family: var(--font-roboto);
    --heading-font-family: var(--font-publicSans);
  }
`;

export default GlobalStyles;
