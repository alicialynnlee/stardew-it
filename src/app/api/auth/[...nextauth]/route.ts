import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import path from 'path';

// Define the path for the database file
const dbPath = path.join(process.cwd(), 'db', 'dev.db');

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign-in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) {
          console.log('Missing credentials');
          return null;
        }

        const db = new Database(dbPath, { readonly: true }); // Open in read-only mode for safety

        try {
          const stmt = db.prepare('SELECT id, name, username, hashedPassword FROM users WHERE username = ?');
          const user = stmt.get(credentials.username) as { id: number; name: string | null; username: string; hashedPassword: string } | undefined;

          if (user) {
            // Check password
            const passwordsMatch = await bcrypt.compare(credentials.password, user.hashedPassword);

            if (passwordsMatch) {
              console.log('Credentials match for user:', user.username);
              // Return user object without the password hash
              return {
                id: user.id.toString(), // Must be a string for NextAuth
                name: user.name,
                username: user.username,
                // You can add other properties here if needed
              };
            } else {
              console.log('Password does not match for user:', credentials.username);
            }
          } else {
            console.log('No user found with username:', credentials.username);
          }
        } catch (error) {
          console.error('Database error during authorization:', error);
        } finally {
          db.close(); // Always close the database connection
        }

        // If you return null then an error will be displayed advising the user to check their details.
        return null;

        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
      }
    })
  ],
  session: {
    // Use JSON Web Tokens for session handling
    strategy: 'jwt',
  },
  // Add secret for production environments
  // You should generate a strong secret using: openssl rand -base64 32
  // and set it as an environment variable (e.g., NEXTAUTH_SECRET)
   secret: process.env.NEXTAUTH_SECRET || 'fallback-secret-for-development', // IMPORTANT: Use env variable in production!
  pages: {
    signIn: '/auth/signin', // Optional: Custom sign-in page path
    // error: '/auth/error', // Optional: Error code passed in query string as ?error=
    // Add other custom pages if needed (e.g., signOut, verifyRequest, newUser)
  },
  callbacks: {
      // Include user id, name, and username in the JWT and session
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id;
          token.name = user.name;
          token.username = (user as any).username;
        }
        return token;
      },
      async session({ session, token }) {
        if (session.user) {
          session.user.id = token.id as string;
          session.user.name = token.name;
          session.user.username = token.username as string;
        }
        return session;
      },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 