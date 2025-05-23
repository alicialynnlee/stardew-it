/* eslint-disable no-console */
import NextAuth, { NextAuthOptions, getServerSession } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from './prisma';

// Import your providers
//import GitHub from "next-auth/providers/github"
//import Google from "next-auth/providers/google"
import Credentials from 'next-auth/providers/credentials'; // For email/password
import bcrypt from 'bcryptjs';

const authOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV === 'development',
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          console.error('Credentials missing email or password');
          throw new Error('Missing email or password');
        }
        const email = credentials.email as string;
        const password = credentials.password as string;
        try {
          const user = await prisma.user.findUnique({
            where: { email },
          });
          // Hash the password
          const passwordsMatch = await bcrypt.compare(
            password,
            user?.password || ''
          );
          if (passwordsMatch && user) {
            console.info(
              'Credentials user found and password matched:',
              user.email
            );
            return {
              id: user.id,
              email: user.email,
            };
          } else {
            console.error('Password does not match');
            throw new Error('Invalid credentials');
          }
        } catch (error) {
          console.error('Error finding user:', error);
          throw new Error('Invalid credentials');
        }
      },
    }),
    // Add other providers like Google, Credentials, etc.
    // Google({}),
    // GitHub({ // Example: GitHub Provider
    //   clientId: process.env.AUTH_GITHUB_ID,
    //   clientSecret: process.env.AUTH_GITHUB_SECRET,
    // }),
  ],
  session: {
    // Use JSON Web Tokens for session management
    strategy: 'jwt',
  },
  callbacks: {
    // Optional: Customize session/token data
    async session({ session, token }) {
      // Add user id and potentially other fields to the session
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      // Add custom fields like role here if needed
      // if (token.role && session.user) {
      //  session.user.role = token.role as string;
      //}
      return session;
    },
    async jwt({ token, user }) {
      // Add custom fields to the JWT token
      // This is called first, then session callback
      if (user) {
        token.id = user.id; // Add user ID to the token
        // Add other properties from the user object if needed
        // token.role = user.role; // Example: adding role
      }
      return token;
    },
  },
  // Optional: Add custom pages for sign-in, error, etc.
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
  },
  secret: process.env.AUTH_SECRET,
  // signOut: '/auth/signout',
  // error: '/auth/error', // Error code passed in query string as ?error=
  //   // verifyRequest: '/auth/verify-request', // (used for email/passwordless login)
  //   // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out to disable)
  // }
};

const handler = NextAuth(authOptions);
export { handler as auth };

// helper to use in server components
export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  return session?.user;
}
