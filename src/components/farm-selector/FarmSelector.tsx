'use client';

import { useFarms } from '@/app/hooks/useFarms';
import * as Styled from './FarmSelector.styled';
import { useCallback, useEffect, useState } from 'react';
import type { Farm } from '@prisma/client';

export default function FarmSelector({ userId }: { userId: string }) {
  const { farms, isLoading, error: fetchError, addNewFarm, isAddingFarm, deleteFarm, isDeletingFarm } = useFarms(userId);
  const [selectedFarm, setSelectedFarm] = useState<Farm | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [newFarm, setNewFarm] = useState('');
  const [newFarmError, setNewFarmError] = useState('');
  // Update options when initialOptions change.  Crucial for external updates.

const handleOptionChange = useCallback((value: string) => {
    setSelectedFarm(farms.find(farm => farm.id === value) || null);
}, [farms]);

const handleAddNewFarm = async () => {
    if (!newFarm.trim()) return;

    const result = await addNewFarm(newFarm.trim());
    if (!result.success) {
        console.error(result.error);
        setNewFarmError(result.error || '');
    }

    setNewFarm('');
  };

  const handleDeleteFarm = async (farmId: string) => {
    const result = await deleteFarm(farmId);
    if (result.success && selectedFarm?.id === farmId) {
        setSelectedFarm(null);
    } else {
        console.error(result.error);
    }
  }
  return (
    <Styled.FarmSelector>
        <Styled.FarmSelectorButton
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
            {selectedFarm?.name || 'Select a farm...'}
        </Styled.FarmSelectorButton>
        <Styled.FarmSelectorList $isDropdownOpen={isDropdownOpen}>
            {farms.map((farm) => (
                <Styled.FarmSelectorListItem key={farm.id}>
                    <Styled.ListItemWithButton>
                        <button type="button" onClick={() => handleOptionChange(farm.id)}>
                            {farm.name}
                        </button>
                        <button type="button" onClick={() => handleDeleteFarm(farm.id)}>
                            Delete
                        </button>
                    </Styled.ListItemWithButton>
                </Styled.FarmSelectorListItem>
            ))}
            <li>
                <Styled.ListItemWithButton>
                    <input 
                        type="text"
                        placeholder="Add a new farm" 
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
            </li>
        </Styled.FarmSelectorList>
    </Styled.FarmSelector>
  );
} 