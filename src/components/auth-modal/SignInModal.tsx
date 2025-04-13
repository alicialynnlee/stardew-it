'use client';

import { useState, FormEvent } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation'; // Use next/navigation for App Router
import * as Styled from './AuthModal.styled';

export default function SignInModal({ onSubmit, toSignUpModal }: { onSubmit: () => void, toSignUpModal: () => void }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams?.get('error');

  // Sign In Specific State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(error ? 'Invalid credentials. Please try again.' : null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setFormError(null);

    try {
      const result = await signIn('credentials', {
        redirect: false, // Handle redirect manually
        email,
        password,
      });

      if (result?.error) {
        if (result.error === 'CredentialsSignin') {
          setFormError('Invalid email or password.');
        } else {
          setFormError(`Error: ${result.error}`);
        }
      } else if (result?.ok) {
        // Sign in was successful
        console.log('Sign in successful');
        onSubmit();
        router.refresh(); 
      } else {
        // Handle other potential non-error, non-ok outcomes if necessary
        console.log('Sign in result:', result);
        setFormError('An unexpected error occurred during sign in.');
      }
    } catch (error) {
      console.error('Sign in exception:', error);
      setFormError('An unexpected error occurred.');
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Styled.Container>
      <h1>Sign In</h1>
      <Styled.Form onSubmit={handleSubmit}>
        {formError && <Styled.ErrorMessage>{formError}</Styled.ErrorMessage>}
        <Styled.InputGroup>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </Styled.InputGroup>
        <Styled.InputGroup>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </Styled.InputGroup>
        <Styled.Button type="submit" disabled={loading}>
          {loading ? 'Signing In...' : 'Sign In'}
        </Styled.Button>
      </Styled.Form>
       <Styled.LinkText>
          Don't have an account? <button onClick={toSignUpModal}>Sign Up</button>
       </Styled.LinkText>
    </Styled.Container>
  );
} 