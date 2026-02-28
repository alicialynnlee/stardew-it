'use client';

import { ThemeProvider } from 'styled-components';
import { Theme as RadixTheme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import StyledComponentsRegistry from './registry';
import AuthProvider from './AuthProvider';
import GlobalStyles from '@/styles/GlobalStyles';

const theme = {
  colors: {
    bgPage: '#0f1115',
    bgPanel: '#171a21',
    border: '#262b36',
    text: '#e6e9ef',
    textMuted: '#9aa2b1',
    primary: '#7c5cff',
    primaryHover: '#6848e6',
  },
  shadow: {
    sm: '0 1px 2px rgba(0,0,0,0.3)',
    md: '0 4px 16px rgba(0,0,0,0.4)',
  },
  radius: {
    sm: '6px',
    md: '10px',
  },
};

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>
        <RadixTheme
          appearance="light"
          grayColor="slate"
          scaling="100%"
          radius="large"
        >
          <GlobalStyles />
          <AuthProvider>{children}</AuthProvider>
        </RadixTheme>
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
}
