'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import FarmSelector from '../farm-selector/FarmSelector';
import * as Styled from './Navbar.styled';
import { Button } from '@radix-ui/themes';

export default function Navbar() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <Styled.Navbar>
        <Styled.HomeContainer>
          <Link href="/">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Image
                src="/favicon.png"
                alt="Stardew It"
                width={48}
                height={48}
              />
              <Styled.AppTitle>Stardew It</Styled.AppTitle>
            </div>
          </Link>
        </Styled.HomeContainer>
        <Button loading />
      </Styled.Navbar>
    );
  }

  return (
    <Styled.Navbar>
      <div>
        <Link href="/">
          <Styled.HomeContainer>
            <Image src="/favicon.png" alt="Stardew It" width={48} height={48} />
            <Styled.AppTitle>Stardew It</Styled.AppTitle>
          </Styled.HomeContainer>
        </Link>
      </div>
      <Styled.AuthActions>
        {session ? (
          <>
            <FarmSelector />
            <span>
              Hi {session.user?.name || session.user?.email || 'User'}!
            </span>
            <Button onClick={() => signOut()}>Sign Out</Button>
          </>
        ) : (
          <Link href="/auth">
            <Button>Sign In</Button>
          </Link>
        )}
      </Styled.AuthActions>
    </Styled.Navbar>
  );
}
