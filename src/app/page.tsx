'use client';

import { useSession } from 'next-auth/react';
import { useFarms } from '@/hooks/useFarms';
import { Spinner } from '@radix-ui/themes';
import LandingPage from './home/LandingPage';
import NoFarmSelected from './home/NoFarmSelected';
import DashboardClient from './dashboard/DashboardClient';

export default function Home() {
  const { data: session } = useSession();
  const { selectedFarmId, isLoading } = useFarms();

  // If loading, show spinner
  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <Spinner />
      </div>
    );
  }

  // Not logged in → Show landing page
  if (!session?.user) {
    return <LandingPage />;
  }

  // Logged in but no farm selected → Show prompt
  if (!selectedFarmId) {
    return <NoFarmSelected />;
  }

  // Logged in + farm selected → Show dashboard
  return (
    <DashboardClient
      userId={session.user.id}
      selectedFarmId={selectedFarmId}
    />
  );
}
