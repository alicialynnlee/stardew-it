import type { Metadata } from 'next';
import StyledComponentsRegistry from './registry';
import GlobalStyles from '@/styles/GlobalStyles';
import { Navbar, SideNav, AuthProvider } from '@/components';
import MuiThemeProvider from '@/styles/mui-theme-provider';
import { Box, CssBaseline, Toolbar } from '@mui/material';

export const metadata: Metadata = {
  title: 'Stardew It',
  description:
    'Stardew It is a tool for Stardew Valley players to help them complete the community center in a year.',
  icons: {
    icon: [
      {
        url: '/favicon.png',
        href: '/favicon.png',
        type: 'image/png',
      },
    ],
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <GlobalStyles />
          <AuthProvider>
            <MuiThemeProvider>
              <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Navbar />
                <SideNav />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                  <Toolbar />
                  {children}
                </Box>
              </Box>
            </MuiThemeProvider>
          </AuthProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
