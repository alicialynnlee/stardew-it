/* eslint-disable no-console */
'use client';

import { useState, FormEvent } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Form } from 'radix-ui';
import { Button, Container, Tabs } from '@radix-ui/themes';
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
    <Container size="1" py="4" px="6">
      <Styled.AuthForm>
        <Tabs.Root>
          <Tabs.List>
            <Tabs.Trigger
              style={{ width: '50%' }}
              value="signin"
              onClick={() => setIsSignIn(true)}
            >
              Sign In
            </Tabs.Trigger>
            <Tabs.Trigger
              style={{ width: '50%' }}
              value="signup"
              onClick={() => setIsSignIn(false)}
            >
              Sign Up
            </Tabs.Trigger>
          </Tabs.List>
        </Tabs.Root>
        <Form.Root onSubmit={isSignIn ? handleSignIn : handleSignUp}>
          {!isSignIn && (
            <Styled.Field name="username">
              <Form.Label>Username</Form.Label>
              <Form.Control asChild>
                <input
                  type="text"
                  required
                  placeholder="alicia"
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                />
              </Form.Control>
              <Form.Message match="valueMissing">
                Please provide a name
              </Form.Message>
            </Styled.Field>
          )}
          <Styled.Field name="email">
            <Form.Label>Email</Form.Label>
            <Form.Control asChild>
              <input
                required
                type="email"
                placeholder="alicia@hotmail.com"
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </Form.Control>
            <Form.Message match="valueMissing">
              Please enter your email.
            </Form.Message>
            <Form.Message match="typeMismatch">
              Please provide a valid email.
            </Form.Message>
          </Styled.Field>
          <Styled.Field name="password">
            <Form.Label>Password</Form.Label>
            <input
              required
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            <Form.Message match="valueMissing">
              Please enter a password.
            </Form.Message>
            <Form.Message match="tooShort">
              Password must be at least 6 characters.
            </Form.Message>
          </Styled.Field>
          {!isSignIn && (
            <Styled.Field name="confirmpassword">
              <Form.Label>Confirm Password</Form.Label>
              <input
                required
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
              />
              <Form.Message match="valueMissing">
                Please confirm your password.
              </Form.Message>
            </Styled.Field>
          )}
          <Form.Submit asChild>
            <Button style={{ width: '100%' }} loading={loading}>
              {isSignIn ? 'Sign In' : 'Sign Up'}
            </Button>
          </Form.Submit>
          {error && <Form.FormMessage>{error}</Form.FormMessage>}
        </Form.Root>
      </Styled.AuthForm>
    </Container>
  );
}
