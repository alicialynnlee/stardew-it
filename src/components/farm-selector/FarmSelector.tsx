'use client';

import { useFarms } from '@/app/hooks/useFarms';
import * as Styled from './FarmSelector.styled';
import { useCallback, useEffect, useState } from 'react';
import type { Farm } from '@prisma/client';
import { ThemeProvider } from 'styled-components';

export default function FarmSelector() {
  const { farms, isLoading, error: fetchError, addNewFarm, isAddingFarm, deleteFarm, isDeletingFarm } = useFarms();
  const [selectedFarm, setSelectedFarm] = useState<Farm | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAddingNewFarm, setIsAddingNewFarm] = useState(false);
  const [newFarm, setNewFarm] = useState('');
  const [newFarmError, setNewFarmError] = useState('');
  // Update options when initialOptions change.  Crucial for external updates.

const handleOptionChange = useCallback((value: string) => {
    if (value === 'adding') {
        setIsAddingNewFarm(true);
    } else {
        setSelectedFarm(farms.find(farm => farm.id === value) || null);
        setIsAddingNewFarm(false);
        setNewFarm('');
    }
}, [farms]);

const handleAddNewFarm = async () => {
    if (!newFarm.trim()) return;

    // store farms here?
    const result = await addNewFarm({ name: newFarm.trim() });
    if (result.success) {
        setSelectedFarm(result.farm as Farm);
    } else {
        console.error(result.error);
        setNewFarmError(result.error || '');
    }

    // Reset
    setNewFarm('');
    setIsAddingNewFarm(false);
  };

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
                <li key={farm.id}>
                    <button type="button" onClick={() => handleOptionChange(farm.id)}>
                        {farm.name}
                    </button>
                </li>
            ))}
            <li>hi</li>
            <li>hey</li>
            <li>
                {isAddingNewFarm ?
                    <input type="text" placeholder="Add a new farm" />
                : 
                    <button type="button" onClick={() => setIsAddingNewFarm(true)}>
                        Add
                    </button>   
                    
                }
            </li>
        </Styled.FarmSelectorList>
    </Styled.FarmSelector>
            //</Styled.FarmSelector> {farms.map((farm) =>
            //     <option
            //         key={farm.id}
            //         value={farm.id}
            //     >
            //         {farm.name}
            //     </option>
            // )}
            // <option value="adding">
            //     {isAddingNewFarm ? (
            //         <div style={{ display: 'flex', gap: '0.5rem' }}>
            //         <input
            //             type="text"
            //             placeholder="New farm"
            //             value={newFarm}
            //             onChange={(e) => setNewFarm(e.target.value)}
            //         />
            //         <button type="button" onClick={handleAddNewFarm}>
            //             Add
            //         </button>
            //         </div>
            //     ) : 'Add a new farm'}
            // </option>
  );
} 