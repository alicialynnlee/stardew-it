import type { Metadata } from 'next';
import StyledComponentsRegistry from './registry';
import GlobalStyles from '@/styles/GlobalStyles';
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { Navbar, SideNav, AuthProvider } from '@/components';
import SeasonalProvider from '@/contexts/SeasonalContext';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Public_Sans, Roboto } from 'next/font/google';

// Typography
const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

const publicSans = Public_Sans({
  subsets: ['latin'],
  variable: '--font-publicSans',
});

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
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let initialDate: string | null = null;
  try {
    const user = await getCurrentUser();
    if (user?.id) {
      const userRecord = await prisma.user.findUnique({
        where: { id: user.id },
        select: { selectedFarmId: true },
      });
      if (userRecord?.selectedFarmId) {
        const farm = await prisma.farm.findUnique({
          where: { id: userRecord.selectedFarmId },
          select: { date: true },
        });
        initialDate = farm?.date ?? null;
      }
    }
  } catch {
    // Non-fatal — fall back to Spring 1
  }

  return (
    <html lang="en" className={`${publicSans.variable} ${roboto.variable}`}>
      <body>
        <StyledComponentsRegistry>
          <Theme
            appearance="light"
            grayColor="slate"
            scaling="100%"
            radius="large"
          >
            <GlobalStyles />
            <SeasonalProvider initialDate={initialDate}>
              <AuthProvider>
                <Navbar />
                <div
                  style={{
                    display: 'flex',
                    height: 'calc(100vh - 5rem)',
                    overflow: 'hidden',
                  }}
                >
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
