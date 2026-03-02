'use client';

import { useFarms } from '@/hooks/useFarms';
import { useCallback, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { CaretDownIcon } from '@radix-ui/react-icons';
import { DropdownMenu } from '@radix-ui/themes';
import { Button as ButtonUI } from '@/components';
import FarmList from './FarmList';
import { useSetSelectedDay } from '@/contexts/SeasonalContext';
import { mainDarkText } from '@/styles/colors';

// TODO: Add error handling
export default function FarmSelector() {
  const { farms, addNewFarm, deleteFarm, selectedFarmId, setSelectedFarm } =
    useFarms();
  const setSeasonalDay = useSetSelectedDay();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSelectFarm = useCallback(
    (farmId: string) => {
      if (!farmId || farmId === '') {
        setSelectedFarm('');
        setSeasonalDay('Spring 1');
        setOpen(false);
        router.push('/tracker');
      } else {
        setSelectedFarm(farmId);
        const newDate = farms.find((f) => f.id === farmId)?.date ?? 'Spring 1';
        setSeasonalDay(newDate);
        setOpen(false);
        const params = new URLSearchParams(searchParams.toString());
        params.set('farmId', farmId);
        const path = pathname === '/calendar' ? pathname : '/tracker';
        router.push(`${path}?${params.toString()}`);
      }
    },
    [farms, pathname, router, searchParams, setSelectedFarm, setSeasonalDay]
  );

  const handleAddNewFarm = async (farmName: string) => {
    const result = await addNewFarm(farmName);
    if (!result.success) {
      console.error(result.error);
    } else {
      handleSelectFarm(result.farm?.id ?? '');
    }
  };

  const handleDeleteFarm = async (farmId: string) => {
    const result = await deleteFarm(farmId);
    if (result.success && selectedFarmId === farmId) {
      setSelectedFarm('');
    } else if (result.error) {
      console.error(result.error);
    }
  };

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger>
        <ButtonUI variant="ghost" size="sm" color={mainDarkText}>
          {farms.find((farm) => farm.id === selectedFarmId)?.name ||
            'Select a farm...'}
          <CaretDownIcon
            style={{
              transform: open ? `rotate(180deg)` : `rotate(0)`,
              transition: 'all 0.3s ease-in-out',
            }}
          />
        </ButtonUI>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content align="end" sideOffset={8}>
        <FarmList
          farms={farms}
          selectedFarmId={selectedFarmId}
          onSelectFarm={handleSelectFarm}
          onDeleteFarm={handleDeleteFarm}
          onAddFarm={handleAddNewFarm}
          showOptions={false}
        />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
