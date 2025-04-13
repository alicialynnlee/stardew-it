'use client';

import { useState, FormEvent } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation'; // Use next/navigation for App Router
import * as Styled from './AuthModal.styled';

export default function SignUpModal({ onSubmit, toSignInModal }: { onSubmit: () => void, toSignInModal: () => void }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams?.get('error');

  // Sign In Specific State
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(error ? 'Invalid credentials. Please try again.' : null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setFormError(null);

    if (password !== confirmPassword) {
      setFormError('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response?.ok) {
        setFormError(data.message || `Error ${response.status}: Registration failed.`);
        console.log('Sign up successful');
      } else {
        // Handle other potential non-error, non-ok outcomes if necessary
        console.log('Sign in successful!');
        setEmail('');
        setName('');
        setPassword('');
        setConfirmPassword('');
        onSubmit();
      }
    } catch (error) {
      console.error('Sign up exception:', error);
      setFormError('An unexpected error occurred.');
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Styled.Container>
      <h1>Sign Up</h1>
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
          <label htmlFor="name">Username</label>
          <input
            id="name"
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
        <Styled.InputGroup>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={loading}
          />
        </Styled.InputGroup>
        <Styled.Button type="submit" disabled={loading}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </Styled.Button>
      </Styled.Form>
       <Styled.LinkText>
          Have an account? <button onClick={toSignInModal}>Sign In</button>
       </Styled.LinkText>
    </Styled.Container>
  );
} 