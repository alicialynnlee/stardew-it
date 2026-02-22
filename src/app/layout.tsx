import type { Metadata } from 'next';
import StyledComponentsRegistry from './registry';
import GlobalStyles from '@/styles/GlobalStyles';
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { Navbar, SideNav, AuthProvider } from '@/components';
import SeasonalProvider from '@/contexts/SeasonalContext';

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

// TODO: handle dark mode

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <Theme
            appearance="light"
            accentColor="grass"
            grayColor="slate"
            scaling="100%"
          >
            <GlobalStyles />
            <SeasonalProvider>
              <AuthProvider>
                <Navbar />
                <div style={{ display: 'flex', minHeight: 'calc(100vh - 5rem)' }}>
                  <SideNav />
                  <main className="flex-grow">{children}</main>
                </div>
              </AuthProvider>
            </SeasonalProvider>
          </Theme>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
