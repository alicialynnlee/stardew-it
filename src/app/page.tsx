'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useFarms } from '@/hooks/useFarms';
import { useSetSelectedDay } from '@/contexts/SeasonalContext';
import { Spinner } from '@radix-ui/themes';
import LandingPage from './home/LandingPage';
import NoFarmSelected from './home/NoFarmSelected';
import DashboardClient from './home/DashboardClient';

export default function Home() {
  const { data: session } = useSession();
  const { selectedFarmId, isLoading, farms } = useFarms();
  const setSelectedDay = useSetSelectedDay();

  useEffect(() => {
    if (selectedFarmId && farms.length > 0) {
      const farm = farms.find((f) => f.id === selectedFarmId);
      if (farm?.date) setSelectedDay(farm.date);
    }
  }, [selectedFarmId, farms, setSelectedDay]);

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

  // Logged in but farm loading
  if (isLoading) {
    return <Spinner />;
  }

  // Logged in but no farm selected → Show prompt
  if (!selectedFarmId) {
    return <NoFarmSelected username={session.user.name} />;
  }

  // Logged in + farm selected → Show dashboard
  return (
    <DashboardClient
      username={session.user.name}
      selectedFarmId={selectedFarmId}
    />
  );
}
