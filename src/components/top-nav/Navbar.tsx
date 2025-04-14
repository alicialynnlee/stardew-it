'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import * as Styled from './Navbar.styled';
import FarmSelector from '../farm-selector/FarmSelector';
import Image from 'next/image';

export default function Navbar() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <Styled.Navbar>
        <Styled.HomeContainer>
          <Link href="/">
            <div>
              <Image
                src="/favicon.png"
                alt="Stardew It"
                width={48}
                height={48}
              />
              Stardew It
            </div>
          </Link>
        </Styled.HomeContainer>
        <Styled.AuthActions>
          <span>Loading...</span>
        </Styled.AuthActions>
      </Styled.Navbar>
    );
  }

  return (
    <Styled.Navbar>
      <div>
        <Link href="/">
          <Styled.HomeContainer>
            <Image src="/favicon.png" alt="Stardew It" width={48} height={48} />
            Stardew It
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
            <Styled.AuthButton onClick={() => signOut()}>
              Sign Out
            </Styled.AuthButton>
          </>
        ) : (
          <Link href="/auth">
            <Styled.AuthButton>Sign In</Styled.AuthButton>
          </Link>
        )}
      </Styled.AuthActions>
    </Styled.Navbar>
  );
}
