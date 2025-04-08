'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation for App Router
import styles from './signup.module.css'; // We'll create this CSS module

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Sign up failed. Please try again.');
      } else {
        setSuccess('Sign up successful! You can now sign in.');
        // Optionally clear the form or redirect
        setName('');
        setUsername('');
        setPassword('');
        // Redirect to sign-in page after a short delay
        setTimeout(() => {
          router.push('/auth/signin');
        }, 2000); // 2 seconds delay
      }
    } catch (err) {
      console.error('Sign up exception:', err);
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}
        <div className={styles.inputGroup}>
          <label htmlFor="name">Name (Optional)</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />
        </div>
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
            minLength={6} // Enforce min length on client-side as well
            disabled={loading}
          />
        </div>
        <button type="submit" disabled={loading} className={styles.button}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
      <p className={styles.linkText}>
          Already have an account? <a href="/auth/signin">Sign In</a>
       </p>
    </div>
  );
} 