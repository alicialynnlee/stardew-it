'use client';

import { useFarms } from '@/hooks/useFarms';
import * as Styled from './FarmSelector.styled';
import { useCallback, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  CaretDownIcon,
  CrossCircledIcon,
  PlusCircledIcon,
  TrashIcon,
} from '@radix-ui/react-icons';
import { Button, Flex, IconButton, TextField } from '@radix-ui/themes';

// TODO: Add error handling
export default function FarmSelector() {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const {
    farms,
    // isLoading,
    // error,
    addNewFarm,
    deleteFarm,
    selectedFarmId,
    setSelectedFarm,
  } = useFarms(userId ?? '');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [newFarm, setNewFarm] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  // const [newFarmError, setNewFarmError] = useState('');

  const handleSelectFarm = useCallback(
    (farmId: string) => {
      if (!farmId || farmId === '') {
        setSelectedFarm('');
        router.push('/tracker');
      } else {
        setSelectedFarm(farmId);
        const params = new URLSearchParams(searchParams.toString());
        params.set('farmId', farmId);

        router.push(`/tracker?${params.toString()}`);
      }
    },
    [farms]
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
            <Button
              variant="ghost"
              color="gray"
              onClick={() => handleSelectFarm(farm.id)}
              key={farm.id}
            >
              {farm.name}
              <Flex gapX="1">
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
            </Button>
          ))}
          <Button variant="ghost" color="gray" disabled>
            <TextField.Root
              placeholder="Add a new farm..."
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
          </Button>
        </Styled.FarmSelectorList>
      </Styled.DropdownContainer>
    </Styled.FarmSelector>
  );
}
