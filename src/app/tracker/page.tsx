import TrackerClient from './TrackerClient';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

interface Props {
  searchParams: { farmId?: string };
}

export default async function TrackerPage({ searchParams }: Props) {
  const user = await getCurrentUser();

  if (!user?.id) {
    return <TrackerClient userId={null} selectedFarmId={null} />;
  }

  if (!searchParams.farmId) {
    const userRecord = await prisma.user.findUnique({ where: { id: user.id } });
    const selectedFarmId = userRecord?.selectedFarmId;
    if (selectedFarmId) {
      redirect(`/tracker?farmId=${selectedFarmId}`);
    }
  } else if (searchParams.farmId) {
    return (
      <TrackerClient userId={user.id} selectedFarmId={searchParams.farmId} />
    );
  }

  return <TrackerClient userId={user.id} selectedFarmId={null} />;
}
