'use client';

import { useState } from 'react';
import {
  CrossCircledIcon,
  PlusCircledIcon,
  TrashIcon,
  CheckCircledIcon,
} from '@radix-ui/react-icons';
import { Button, Flex, IconButton, TextField } from '@radix-ui/themes';
import type { Farm } from '@prisma/client';

interface FarmListProps {
  farms: Farm[];
  selectedFarmId: string | null;
  onSelectFarm: (farmId: string) => void;
  onDeleteFarm: (farmId: string) => void;
  onAddFarm: (farmName: string) => void;
}

export default function FarmList({
  farms,
  selectedFarmId,
  onSelectFarm,
  onDeleteFarm,
  onAddFarm,
}: FarmListProps) {
  const [newFarm, setNewFarm] = useState('');

  const handleAdd = () => {
    if (!newFarm.trim()) return;
    onAddFarm(newFarm.trim());
    setNewFarm('');
  };

  return (
    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: 0, margin: 0 }}>
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
            onClick={() => onSelectFarm(farm.id)}
            style={{ flex: '1', margin: '0', justifyContent: 'space-between' }}
          >
            {farm.name}
            {selectedFarmId === farm.id && (
              <CheckCircledIcon />
            )}
          </Button>

          {selectedFarmId === farm.id && (
            <IconButton
              size="1"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                onSelectFarm('');
              }}
              title="Deselect farm"
            >
              <CrossCircledIcon />
            </IconButton>
          )}
          <IconButton
            size="1"
            variant="ghost"
            color="red"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteFarm(farm.id);
            }}
            title="Delete farm"
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
          value={newFarm}
          style={{ flex: '1' }}
          onChange={(e) => {
            e.stopPropagation();
            setNewFarm(e.target.value);
          }}
          onKeyDown={(e) => {
            e.stopPropagation();
            if (e.key === 'Enter') {
              handleAdd();
            }
          }}
        />
        <IconButton
          size="1"
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation();
            handleAdd();
          }}
          disabled={!newFarm.trim()}
        >
          <PlusCircledIcon height="15" width="15" />
        </IconButton>
      </Flex>
    </ul>
  );
}
