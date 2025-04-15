import TrackerClient from './TrackerClient';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function TrackerPage() {
  const user = await getCurrentUser();

  if (!user?.id) {
    return <TrackerClient userId={null} selectedFarmId={null} />;
  }

  const userRecord = await prisma.user.findUnique({ where: { id: user.id } });
  const selectedFarmId = userRecord?.selectedFarmId;

  if (!selectedFarmId) {
    return <TrackerClient userId={user.id} selectedFarmId={null} />;
  }

  return <TrackerClient userId={user.id} selectedFarmId={selectedFarmId} />;
}
