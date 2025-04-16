'use client';

import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  useMediaQuery,
} from '@mui/material';
import React from 'react';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {
  barnRed,
  charcoalBlack,
  darkGreen,
  darkRed,
  dustySage,
  lighterGreen,
  lightRed,
} from './colors';
import { whiteSmoke } from './colors';

export default function MuiThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          // mode: prefersDarkMode ? 'dark' : 'light',
          common: {
            black: charcoalBlack,
            white: whiteSmoke,
          },
          primary: {
            main: dustySage,
            light: lighterGreen,
            dark: darkGreen,
            contrastText: whiteSmoke,
          },
          secondary: {
            main: barnRed,
            light: lightRed,
            dark: darkRed,
            contrastText: whiteSmoke,
          },
        },
        typography: {
          fontFamily: 'Roboto, sans-serif',
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
