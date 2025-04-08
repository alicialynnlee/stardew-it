'use client';

import { useState, FormEvent } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation'; // Use next/navigation for App Router
import styles from './signin.module.css'; // We'll create this CSS module

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
    <div className={styles.container}>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        {formError && <p className={styles.error}>{formError}</p>}
        <div className={styles.inputGroup}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <button type="submit" disabled={loading} className={styles.button}>
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
       <p className={styles.linkText}>
          Don't have an account? <a href="/auth/signup">Sign Up</a>
       </p>
    </div>
  );
} 