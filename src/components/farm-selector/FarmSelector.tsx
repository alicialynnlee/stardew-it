'use client';

import { useFarms } from '@/hooks/useFarms';
import * as Styled from './FarmSelector.styled';
import { useCallback, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { CaretDownIcon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';
import FarmList from './FarmList';

// TODO: Add error handling
export default function FarmSelector() {
  const {
    farms,
    addNewFarm,
    deleteFarm,
    selectedFarmId,
    setSelectedFarm,
  } = useFarms();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSelectFarm = useCallback(
    (farmId: string) => {
      if (!farmId || farmId === '') {
        setSelectedFarm('');
        setIsDropdownOpen(false);
        router.push('/tracker');
      } else {
        setSelectedFarm(farmId);
        setIsDropdownOpen(false);
        const params = new URLSearchParams(searchParams.toString());
        params.set('farmId', farmId);
        const path = pathname === '/calendar' ? pathname : '/tracker';
        router.push(`${path}?${params.toString()}`);
      }
    },
    [pathname, router, searchParams, setSelectedFarm]
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
    <Styled.FarmSelector>
      <Button
        className="farm-selector-open-button"
        variant="soft"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {farms.find((farm) => farm.id === selectedFarmId)?.name ||
          'Select a farm...'}
        <CaretDownIcon />
      </Button>
      <Styled.DropdownContainer $isDropdownOpen={isDropdownOpen}>
        <FarmList
          farms={farms}
          selectedFarmId={selectedFarmId}
          onSelectFarm={handleSelectFarm}
          onDeleteFarm={handleDeleteFarm}
          onAddFarm={handleAddNewFarm}
        />
      </Styled.DropdownContainer>
    </Styled.FarmSelector>
  );
}
