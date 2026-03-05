'use client';

import { createGlobalStyle } from 'styled-components';
import { mainBlack, mainBackground } from './colors';

const GlobalStyles = createGlobalStyle`
  :root {
    --background: ${mainBackground};
    --foreground: ${mainBlack};

    /* Custom theme colors - Light mode */
    --custom-1: #fafbfb;
    --custom-2: #f5f8f7;
    --custom-3: #ebf1ee;
    --custom-4: #e1e9e5;
    --custom-5: #d6e1dc;
    --custom-6: #cad7d1;
    --custom-7: #bbcac3;
    --custom-8: #a3b6ad;
    --custom-9: #8da399;
    --custom-10: #82978e;
    --custom-11: #556a61;
    --custom-12: #212a26;

    --custom-a1: #f7f9ff99;
    --custom-a2: #cde0ff33;
    --custom-a3: #00599c14;
    --custom-a4: #004c6e1e;
    --custom-a5: #004a5a29;
    --custom-a6: #00434835;
    --custom-a7: #003b3a44;
    --custom-a8: #00372d5c;
    --custom-a9: #00332872;
    --custom-a10: #002c237d;
    --custom-a11: #002017aa;
    --custom-a12: #000a07de;

    --custom-contrast: #fff;
    --custom-surface: #f3f7f8cc;
    --custom-indicator: #8da399;
    --custom-track: #8da399;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --background: ${mainBlack};
      --foreground: ${mainBackground};

      /* Custom theme colors - Dark mode */
      --custom-1: #191d1b;
      --custom-2: #1d2320;
      --custom-3: #22322b;
      --custom-4: #273d33;
      --custom-5: #2f483d;
      --custom-6: #395548;
      --custom-7: #456456;
      --custom-8: #527868;
      --custom-9: #669b84;
      --custom-10: #5a8f78;
      --custom-11: #91c7af;
      --custom-12: #c4e9d8;

      --custom-a1: #009c0002;
      --custom-a2: #3cfc9c08;
      --custom-a3: #5afdb519;
      --custom-a4: #66fab726;
      --custom-a5: #7cfcc432;
      --custom-a6: #8efcc941;
      --custom-a7: #9effd351;
      --custom-a8: #a0fdd668;
      --custom-a9: #a0ffd68f;
      --custom-a10: #96fed082;
      --custom-a11: #b6fedec1;
      --custom-a12: #d5feebe7;

      --custom-contrast: #fff;
      --custom-surface: #1e2a2480;
      --custom-indicator: #669b84;
      --custom-track: #669b84;
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
    padding: 1rem;
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    width: 100%;

    @media (min-width: 641px) {
      padding: 1.5rem;
    }

    @media (min-width: 1025px) {
      padding: 2rem;
    }
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
    --color-background: ${mainBackground};
    --default-font-family: var(--font-roboto);
    --heading-font-family: var(--font-montserrat);

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
  }
`;

export default GlobalStyles;
