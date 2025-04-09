'use client';

import { useState, FormEvent } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation'; // Use next/navigation for App Router
import * as Styled from '../signup.styled';

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get('callbackUrl') || '/'; // Redirect back or to home
  const error = searchParams?.get('error');

  const [username, setUsername] = useState('');
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
        username,
        password,
        callbackUrl: callbackUrl, // Pass the intended redirect URL
      });

      if (result?.error) {
        console.error('Sign in error:', result.error);
        setFormError('Invalid email or password.'); // Show specific error
        setLoading(false);
      } else if (result?.ok) {
        // Sign in was successful
        console.log('Sign in successful, redirecting to:', callbackUrl);
        router.push(callbackUrl); // Redirect upon success
        // router.refresh(); // Optional: refresh server components
      } else {
          // Handle other potential non-error, non-ok outcomes if necessary
           console.log('Sign in result:', result);
           setFormError('An unexpected error occurred during sign in.');
           setLoading(false);
      }
    } catch (error) {
      console.error('Sign in exception:', error);
      setFormError('An unexpected error occurred.');
      setLoading(false);
    }
  };

  return (
    <Styled.Container>
      <h1>Sign In</h1>
      <Styled.Form onSubmit={handleSubmit}>
        {formError && <Styled.ErrorMessage>{formError}</Styled.ErrorMessage>}
        <Styled.InputGroup>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          Don't have an account? <a href="/auth/signup">Sign Up</a>
       </Styled.LinkText>
    </Styled.Container>
  );
} 