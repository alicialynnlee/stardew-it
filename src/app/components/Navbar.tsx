'use client';

import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import * as Styled from './Navbar.styled';

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <Styled.Navbar>
      <div>
        <Link href="/">
          MyApp {/* Or your app name/logo */}
        </Link>
      </div>
      <div>
        {status === 'loading' ? (
          <span>Loading...</span>
        ) : session ? (
          <Styled.AuthActions>
            <span>
              Signed in as {session.user?.username || session.user?.name || 'User'}
            </span>
            <button onClick={() => signOut()}>
              Sign Out
            </button>
          </Styled.AuthActions>
        ) : (
          <Styled.AuthActions>
            <button onClick={() => signIn()}>
              Sign In
            </button>
            <Link href="/auth/signup" >
              Sign Up
            </Link>
          </Styled.AuthActions>
        )}
      </div>
    </Styled.Navbar>
  );
} 