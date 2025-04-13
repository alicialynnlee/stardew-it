// app/hooks/useFarms.ts
'use client'; // Hooks run on the client

import { useState, useEffect, useCallback, useTransition } from 'react';
import { getFarms, addFarm, deleteFarmAction } from '@/app/actions/farmActions';
import type { Farm } from '@prisma/client';

export function useFarms(userId: string) {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdding, startTransitionAdd] = useTransition();
  const [isDeleting, startTransitionDelete] = useTransition();

  const fetchFarms = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getFarms(userId);
      if (result.success && result.farms) {
        setFarms(result.farms);
      } else {
        setError(result.error ?? 'Failed to fetch farms.');
      }
    } catch (err) {
      console.error('useFarms fetch error:', err);
      setError('An unexpected error occurred while fetching farms.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFarms();
  }, [fetchFarms]);

  const addNewFarm = useCallback(async (farmName: string): Promise<{ success: boolean; error?: string; fieldErrors?: any; farm?: Farm }> => {
    let result: { success: boolean; error?: string; fieldErrors?: any; farm?: Farm } = { success: false };

    await new Promise<void>((resolve) => {
        startTransitionAdd(async () => {
            result = await addFarm(farmName, userId);
            if (result.success && result.farm) {
                setFarms((prev) => [...prev, result.farm!].sort((a, b) => a.name.localeCompare(b.name)));
            } else {
                setError(result.error ?? 'Failed to add farm.');
            }
            resolve();
        });
    });

    return result;
  }, []);

  const deleteFarm = useCallback(async (farmId: string): Promise<{ success: boolean; error?: string }> => {
    let result: { success: boolean; error?: string } = { success: false };

    await new Promise<void>((resolve) => {
        startTransitionDelete(async () => {
            result = await deleteFarmAction(farmId, userId);
            if (result.success) {
                setFarms((prev) => prev.filter((farm) => farm.id !== farmId));
            }
            resolve();
        });
    });

    return result;
  }, []);

  return {
    farms,
    isLoading,
    error,
    fetchFarms,
    addNewFarm,
    isAddingFarm: isAdding,
    deleteFarm,
    isDeletingFarm: isDeleting,
  };
}