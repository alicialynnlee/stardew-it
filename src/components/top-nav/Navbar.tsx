'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import * as Styled from './Navbar.styled';
import { useState } from 'react';
import FarmSelector from '../farm-selector/FarmSelector';

export default function Navbar() {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  const handleSignOut = () => {
    signOut();
  };

  return (
    <Styled.Navbar>
        <div>
            <Link href="/">
                MyApp {/* Or your app name/logo */}
            </Link>
        </div>
        <Styled.AuthActions>
            {loading ? (
                <span>Loading...</span>
            ) : session ? (
                <>
                    <FarmSelector userId={session.user?.id}/>
                    <span>
                        Hi {session.user?.name || session.user?.email || 'User'}!
                    </span>
                    <Styled.AuthButton onClick={handleSignOut}>
                        Sign Out
                    </Styled.AuthButton>
                </>
            ) : (
                <Link href="/auth">
                    <Styled.AuthButton as="a">Sign In</Styled.AuthButton>
                </Link>
            )}
        </Styled.AuthActions>
    </Styled.Navbar>
  );
} 