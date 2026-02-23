'use client';

import { useFarms } from '@/hooks/useFarms';
import * as Styled from './FarmSelector.styled';
import { useCallback, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  CaretDownIcon,
  CrossCircledIcon,
  PlusCircledIcon,
  TrashIcon,
} from '@radix-ui/react-icons';
import { Button, Flex, IconButton, TextField } from '@radix-ui/themes';

// TODO: Add error handling
export default function FarmSelector() {
  const {
    farms,
    // isLoading,
    // error,
    addNewFarm,
    deleteFarm,
    selectedFarmId,
    setSelectedFarm,
  } = useFarms();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [newFarm, setNewFarm] = useState('');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // const [newFarmError, setNewFarmError] = useState('');

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

  const handleAddNewFarm = async () => {
    if (!newFarm.trim()) return;

    const result = await addNewFarm(newFarm.trim());
    if (!result.success) {
      console.error(result.error);
      // setNewFarmError(result.error || '');
    } else {
      handleSelectFarm(result.farm?.id ?? '');
    }

    setNewFarm('');
  };

  const handleDeleteFarm = async (farmId: string) => {
    const result = await deleteFarm(farmId);
    // If the deleted farm was the selected farm, reset the selected farm
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
        <Styled.FarmSelectorList>
          {farms.map((farm) => (
            <Flex
              gapX="1"
              align="center"
              justify="between"
              style={{ width: '100%' }}
              key={farm.id}
            >
              <Button
                variant="ghost"
                color="gray"
                onClick={() => handleSelectFarm(farm.id)}
                style={{ flex: '1', margin: '0' }}
              >
                {farm.name}
              </Button>

              {selectedFarmId === farm.id && (
                <IconButton
                  size="1"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectFarm('');
                  }}
                >
                  <CrossCircledIcon />
                </IconButton>
              )}
              <IconButton
                size="1"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteFarm(farm.id);
                }}
              >
                <TrashIcon width="15" height="15" />
              </IconButton>
            </Flex>
          ))}
          <Flex
            gapX="1"
            align="center"
            justify="between"
            style={{ width: '100%' }}
          >
            <TextField.Root
              placeholder="Add a new farm..."
              style={{ flex: '1' }}
              onChange={(e) => {
                e.stopPropagation();
                setNewFarm(e.target.value);
              }}
              onKeyDown={(e) => {
                e.stopPropagation();
                if (e.key === 'Enter') {
                  handleAddNewFarm();
                  setNewFarm('');
                }
                if (e.key === 'Escape') {
                  setIsDropdownOpen(false);
                  setNewFarm('');
                }
              }}
            />
            <IconButton
              size="1"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                handleAddNewFarm();
                setNewFarm('');
              }}
              disabled={!newFarm.trim()}
            >
              <PlusCircledIcon height="15" width="15" />
            </IconButton>
          </Flex>
        </Styled.FarmSelectorList>
      </Styled.DropdownContainer>
    </Styled.FarmSelector>
  );
}
