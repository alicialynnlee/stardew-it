'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import FarmSelector from '../farm-selector/FarmSelector';
import UserMenu from '../user-menu/UserMenu';
import * as Styled from './Navbar.styled';
import { Button } from '@radix-ui/themes';
import Jumino from '../jumino/Jumino';

export default function Navbar() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <Styled.Navbar>
        <Styled.HomeContainer>
          <Link href="/">
            <div>
              <Jumino size="sm" state="idle" />
              Stardew It
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
            <Jumino size="sm" state="idle" />
            Stardew It
          </Styled.HomeContainer>
        </Link>
      </div>
      <Styled.AuthActions>
        {session ? (
          <>
            <FarmSelector />
            <UserMenu />
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
