'use client';

import { useState, FormEvent } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import * as Styled from './auth.styled';

export default function AuthPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSignIn, setIsSignIn] = useState(true);

  // Sign In Specific State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Sign Up Specific State
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError('Invalid email or password');
      } else {
        console.info('Sign in successful');
        router.push('/');
        router.refresh();
      }
    } catch (error) {
      console.error('Sign in exception:', error);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {

      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to sign up');
      }
      // Automatically switch to sign in after successful registration
      setIsSignIn(true);
      setError('Registration successful! Please sign in.');
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Sign up exception:', error);
      setError(error instanceof Error ? error.message : 'Failed to sign up');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Styled.AuthContainer>
      <Styled.AuthForm onSubmit={isSignIn ? handleSignIn : handleSignUp}>
        <Styled.AuthToggle>
          <Styled.ToggleButton
            type="button"
            $active={isSignIn}
            onClick={() => setIsSignIn(true)}
          >
            Sign In
          </Styled.ToggleButton>
          <Styled.ToggleButton
            type="button"
            $active={!isSignIn}
            onClick={() => setIsSignIn(false)}
          >
            Sign Up
          </Styled.ToggleButton>
        </Styled.AuthToggle>

        {error && (
          <Styled.Message $type={error.includes('successful') ? 'success' : 'error'}>
            {error}
          </Styled.Message>
        )}

        {!isSignIn && (
          <Styled.InputGroup>
            <label htmlFor="name">Username</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required={!isSignIn}
              disabled={loading}
            />
          </Styled.InputGroup>
        )}

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

        <Styled.SubmitButton type="submit" disabled={loading}>
          {loading 
            ? (isSignIn ? 'Signing in...' : 'Signing up...') 
            : (isSignIn ? 'Sign In' : 'Sign Up')}
        </Styled.SubmitButton>
      </Styled.AuthForm>
    </Styled.AuthContainer>
  );
} 