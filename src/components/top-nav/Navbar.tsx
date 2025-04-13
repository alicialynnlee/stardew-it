'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import * as Styled from './Navbar.styled';
import { useState } from 'react';
import SignInModal from '../auth-modal/SignInModal';
import SignUpModal from '../auth-modal/SignUpModal';
import FarmSelector from '../farm-selector/FarmSelector';

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
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
                    <FarmSelector />
                    <span>
                        Hi {session.user?.name || session.user?.email || 'User'}!
                    </span>
                    <Styled.AuthButton onClick={handleSignOut}>
                        Sign Out
                    </Styled.AuthButton>
                </>
            ) : (
                <>
                    <Styled.AuthButton onClick={() => {setIsSignInModalOpen(!isSignInModalOpen); setIsSignUpModalOpen(false);}}>
                        Sign In
                    </Styled.AuthButton>
                    {isSignInModalOpen && <SignInModal onSubmit={() => setIsSignInModalOpen(false)} toSignUpModal={() => {setIsSignUpModalOpen(true); setIsSignInModalOpen(false);}} />}
                    {isSignUpModalOpen && <SignUpModal onSubmit={() => {setIsSignUpModalOpen(false); setIsSignInModalOpen(true);}} toSignInModal={() => {setIsSignUpModalOpen(false); setIsSignInModalOpen(true);}} />}
                </>
            )}
        </Styled.AuthActions>
    </Styled.Navbar>
  );
} 