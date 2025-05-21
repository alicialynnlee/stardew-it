import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import CalendarClient from './CalendarClient';
import { redirect } from 'next/navigation';

interface Props {
  searchParams: { farmId?: string };
}

export default async function CalendarPage({ searchParams }: Props) {
  const user = await getCurrentUser();
  const { farmId: paramFarmId } = await searchParams;

  if (!user?.id) {
    return <CalendarClient userId={null} selectedFarmId={null} />;
  }

  if (!paramFarmId) {
    const userRecord = await prisma.user.findUnique({ where: { id: user.id } });
    const selectedFarmId = userRecord?.selectedFarmId;
    if (selectedFarmId) {
      redirect(`/calendar?farmId=${selectedFarmId}`);
    }
  } else if (paramFarmId) {
    return <CalendarClient userId={user.id} selectedFarmId={paramFarmId} />;
  }

  return <CalendarClient userId={user.id} selectedFarmId={null} />;
}
