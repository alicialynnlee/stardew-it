'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { AppBar, Box, Button, Toolbar } from '@mui/material';
import FarmSelector from '../farm-selector/FarmSelector';

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <AppBar
      position="fixed"
      component="nav"
      color="default"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Box
            component={Link}
            href="/"
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <Image src="/favicon.png" alt="Stardew It" width={48} height={48} />
            Stardew It
          </Box>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          {status === 'loading' ? (
            <span>Loading...</span>
          ) : session ? (
            <>
              <FarmSelector />
              <span>
                Hi {session.user?.name || session.user?.email || 'User'}!
              </span>
              <Button
                color="primary"
                variant="contained"
                onClick={() => signOut()}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <Button
              color="primary"
              variant="contained"
              component={Link}
              href="/auth"
            >
              Sign In
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
