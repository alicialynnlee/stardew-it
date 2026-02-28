import type { Metadata } from 'next';

import { Navbar, SideNav } from '@/components';
import { Montserrat, Roboto } from 'next/font/google';
import Providers from './providers/Providers';
import { getCurrentUser } from '@/lib/auth';
import SeasonalProvider from '@/contexts/SeasonalContext';
import { prisma } from '@/lib/prisma';

// Typography
const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
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
    <html lang="en" className={`${montserrat.variable} ${roboto.variable}`}>
      <body>
        <Providers>
          <SeasonalProvider>
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
          </SeasonalProvider>
        </Providers>
      </body>
    </html>
  );
}
