'use client';

import { useFarms } from '@/hooks/useFarms';
import * as Styled from './FarmSelector.styled';
import { useCallback, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { MenuItem, Select, TextField } from '@mui/material';
import { InputLabel } from '@mui/material';
import { FormControl } from '@mui/material';

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
    <FormControl fullWidth>
      <InputLabel id="farm-selector-label">Farm</InputLabel>
      <Select
        labelId="farm-selector-label"
        id="farm-selector"
        value={selectedFarmId}
        label="Farm"
        onChange={(e) => handleSelectFarm(e.target.value as string)}
      >
        <MenuItem value="">
          <em>Select a farm...</em>
        </MenuItem>
        {farms.map((farm) => (
          <MenuItem key={farm.id} value={farm.id}>
            {farm.name}
            <button type="button" onClick={() => handleDeleteFarm(farm.id)}>
              Delete
            </button>
          </MenuItem>
        ))}
        <Styled.ListItemWithButton>
          <TextField
            id="outlined-basic"
            label="Add a new farm"
            variant="outlined"
            value={newFarm}
            onChange={(e) => setNewFarm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddNewFarm();
              }
              if (e.key === 'Escape') {
                setIsDropdownOpen(false);
                setNewFarm('');
              }
            }}
          />
          <button
            type="button"
            onClick={handleAddNewFarm}
            disabled={!newFarm.trim()}
          >
            Add
          </button>
        </Styled.ListItemWithButton>
      </Select>
    </FormControl>
  );
}
