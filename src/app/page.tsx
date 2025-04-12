'use client'; // Make this a client component to use hooks

import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react"; // Import NextAuth hooks

export default function Home() {
  const { data: session, status } = useSession(); // Get session status and data

  return (
    <div>
      Welcome to the home page!
    </div>
  );
}
