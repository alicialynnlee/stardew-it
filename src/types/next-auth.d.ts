import { DefaultSession, DefaultUser } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's id. */
      id: string;
      /** The user's email. */
      email: string;
      /** The user's name. */
      name: string;
    } & DefaultSession['user']; // Keep the default properties
  }

  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User extends DefaultUser {
    // Add any custom properties you expect on the User object
    // id is already part of DefaultUser, but we ensure it's always a string here if needed
    // You might not need to extend User if DefaultUser is sufficient and you only add to Session/JWT
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends DefaultJWT {
    /** OpenID ID Token */
    id?: string; // Add the id property to the JWT token
    /** Custom username field */
    name?: string; // Add the username property to the JWT token
    // Add other custom properties to the token here if needed
  }
}
