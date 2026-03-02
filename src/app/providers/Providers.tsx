'use client';

import { ThemeProvider } from 'styled-components';
import { Theme as RadixTheme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import StyledComponentsRegistry from './registry';
import AuthProvider from './AuthProvider';
import GlobalStyles from '@/styles/GlobalStyles';

// TODO: fill this in or dont use it
const theme = {};

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>
        <RadixTheme
          appearance="light"
          grayColor="slate"
          scaling="100%"
          radius="full"
        >
          <GlobalStyles />
          <AuthProvider>{children}</AuthProvider>
        </RadixTheme>
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
}
