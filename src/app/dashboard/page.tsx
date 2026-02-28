'use client';

import { useSession } from 'next-auth/react';
import DashboardClient from './DashboardClient';

export default function DashboardPage() {
  const { data: session } = useSession();
  const userId = session?.user?.id || null;
  const selectedFarmId = null; // Can be pulled from session if available

  return <DashboardClient userId={userId} selectedFarmId={selectedFarmId} />;
}
