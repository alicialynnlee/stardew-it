'use client';

import { useFarms } from '@/hooks/useFarms';
import * as Styled from './FarmSelector.styled';
import { useCallback, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { CaretDownIcon } from '@radix-ui/react-icons';
import { Button, DropdownMenu } from '@radix-ui/themes';
import FarmList from './FarmList';
import { useSetSelectedDay } from '@/contexts/SeasonalContext';

// TODO: Add error handling
export default function FarmSelector() {
  const { farms, addNewFarm, deleteFarm, selectedFarmId, setSelectedFarm } =
    useFarms();
  const setSeasonalDay = useSetSelectedDay();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSelectFarm = useCallback(
    (farmId: string) => {
      if (!farmId || farmId === '') {
        setSelectedFarm('');
        setSeasonalDay('Spring 1');
        setIsDropdownOpen(false);
        router.push('/tracker');
      } else {
        setSelectedFarm(farmId);
        const newDate = farms.find((f) => f.id === farmId)?.date ?? 'Spring 1';
        setSeasonalDay(newDate);
        setIsDropdownOpen(false);
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
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button
          className="farm-selector-open-button"
          variant="ghost"
          size="3"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          style={{ margin: '0 8px' }}
        >
          {farms.find((farm) => farm.id === selectedFarmId)?.name ||
            'Select a farm...'}
          <CaretDownIcon />
        </Button>
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
