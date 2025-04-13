'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import * as Styled from './Navbar.styled';
import FarmSelector from '../farm-selector/FarmSelector';

export default function Navbar() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <Styled.Navbar>
        <div>
          <Link href="/">MyApp</Link>
        </div>
        <Styled.AuthActions>
          <span>Loading...</span>
        </Styled.AuthActions>
      </Styled.Navbar>
    );
  }

  return (
    <Styled.Navbar>
      <div>
        <Link href="/">MyApp</Link>
      </div>
      <Styled.AuthActions>
        {session ? (
          <>
            <FarmSelector userId={session.user?.id} />
            <span>Hi {session.user?.name || 'User'}!</span>
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
