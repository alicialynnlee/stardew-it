import TrackerClient from './TrackerClient';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

interface Props {
  searchParams: { farmId?: string };
}

export default async function TrackerPage({ searchParams }: Props) {
  const user = await getCurrentUser();

  if (!user?.id) {
    return <TrackerClient userId={null} selectedFarmId={null} />;
  }

  if (!searchParams.farmId) {
    return <TrackerClient userId={user.id} selectedFarmId={null} />;
  }

  return (
    <TrackerClient userId={user.id} selectedFarmId={searchParams.farmId} />
  );
}
