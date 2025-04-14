'use client';

import Link from 'next/link';
import { useTasks } from '@/app/hooks/useTasks';
import { useSession } from 'next-auth/react';

import { useFarms } from '@/app/hooks/useFarms';
import { useState } from 'react';
import { useEffect } from 'react';
import * as Styled from './tracker.styled';

export default function TrackerPage() {
  const { data: session } = useSession();
  const { selectedFarmId } = useFarms(session?.user?.id ?? '');
  const { rooms, isLoading, error } = useTasks(selectedFarmId);
  // const [newFarmError, setNewFarmError] = useState('');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {!session && (
        <Styled.WarningBanner>
          <span>
            ⚠️ You must be <Link href="/auth">signed in</Link> and have a farm
            selected to save your progress.
          </span>
        </Styled.WarningBanner>
      )}

      {session && !selectedFarmId && (
        <Styled.WarningBanner>
          <span>
            ⚠️ Please select a farm from the navigation bar to track your
            progress.
          </span>
        </Styled.WarningBanner>
      )}

      <h1>Tracker</h1>
      {rooms.map((room) => (
        <div key={room.id}>
          <h2>{room.name}</h2>
          {room.bundles.map((bundle) => (
            <div key={bundle.id}>
              <h3>{bundle.name}</h3>
              {bundle.tasks.map((task) => (
                <div key={task.id}>
                  <input type="checkbox" checked={task.completed} />
                  <h4>{task.name}</h4>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
