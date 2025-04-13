import type { Metadata } from "next";
import StyledComponentsRegistry from './registry';
import GlobalStyles from "../styles/GlobalStyles";
import { Navbar, SideNav, AuthProvider } from "../components";

export const metadata: Metadata = {
  title: "Stardew It",
  description: "Stardew It is a tool for Stardew Valley players to help them complete the community center in a year.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body>
        <StyledComponentsRegistry>
          <GlobalStyles />
          <AuthProvider>
            <Navbar />
            <div style={{ display: 'flex', minHeight: 'calc(100vh - 5rem)' }}>
              <SideNav />
              <main className="flex-grow">{children}</main>
            </div>
          </AuthProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
