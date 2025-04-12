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
        <Styled.AuthActions>
            {status === 'loading' ? (
                <span>Loading...</span>
            ) : (
                <>
                    {session && session.user && (
                        <span>
                            Signed in as {session.user?.username || session.user?.name || 'User'}
                        </span>
                    )}
                    {session ? (
                        <Styled.AuthButton onClick={() => signOut()}>
                            Sign Out
                        </Styled.AuthButton>
                    ) : (
                        <Styled.AuthButton onClick={() => signIn()}>
                            Sign In
                        </Styled.AuthButton>
                    )}
                </>
            )}
        </Styled.AuthActions>
    </Styled.Navbar>
  );
} 