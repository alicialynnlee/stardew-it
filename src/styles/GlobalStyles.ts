'use client';

import { createGlobalStyle } from 'styled-components';
import { charcoalBlack, whiteSmoke } from './colors';

// TODO: Add dark mode support
// @media (prefers-color-scheme: dark) {
//   :root {
//     --background: ${charcoalBlack};
//     --foreground: ${whiteSmoke};
//   }
// }
// @media (prefers-color-scheme: dark) {
//   html {
//     color-scheme: dark;
//   }
// }
const GlobalStyles = createGlobalStyle`
  :root {
    --background: ${whiteSmoke};
    --foreground: ${charcoalBlack};
  }

  html,
  body {
    max-width: 100vw;
    overflow-x: hidden;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: Arial, Helvetica, sans-serif;
    background: var(--background);
    color: var(--foreground);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
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
`;

export default GlobalStyles;
