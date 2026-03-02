'use client';

import { useState } from 'react';
import { Flex, Separator, Text, TextField } from '@radix-ui/themes';
import type { Farm } from '@prisma/client';
import { Button, ChecklistItem } from '@/components';
import styled from 'styled-components';
import { sageDark, sageMist } from '@/styles/colors';
import { PiPlusCircleFill, PiTrashLight } from 'react-icons/pi';

const FarmOption = styled(Button)<{
  $isSelected: boolean;
}>`
  flex: 1;
  margin: 0;
  justify-content: space-between;
  border-radius: 8px;

  ${({ $isSelected }) =>
    $isSelected &&
    `
    background-color: ${sageMist};
  `}

  &:hover:not(:disabled) {
    background: rgba(0, 0, 0, 0.05);
  }
`;

interface FarmListProps {
  farms: Farm[];
  selectedFarmId: string | null;
  onSelectFarm: (farmId: string) => void;
  onDeleteFarm: (farmId: string) => void;
  onAddFarm: (farmName: string) => void;
  showOptions: boolean;
}

export default function FarmList({
  farms,
  selectedFarmId,
  onSelectFarm,
  onDeleteFarm,
  onAddFarm,
  showOptions,
}: FarmListProps) {
  const [newFarm, setNewFarm] = useState('');
  const [showInput, setShowInput] = useState(false);

  const handleAdd = () => {
    if (!newFarm.trim()) return;
    onAddFarm(newFarm.trim());
    setNewFarm('');
  };

  return (
    <ul
      style={{
        listStyle: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        padding: 0,
        margin: 0,
      }}
    >
      {farms.map((farm) => (
        <Flex
          gapX="1"
          align="center"
          justify="between"
          style={{ width: '100%' }}
          key={farm.id}
        >
          <FarmOption
            variant="ghost"
            size="sm"
            color="gray"
            onClick={() =>
              selectedFarmId === farm.id
                ? onSelectFarm('')
                : onSelectFarm(farm.id)
            }
            $isSelected={farm.id === selectedFarmId}
            aria-label={
              selectedFarmId === farm.id
                ? `deselect farm ${farm.name}`
                : `select farm ${farm.name}`
            }
          >
            <Flex direction={'column'} align={'start'}>
              <Text weight="bold">{farm.name}</Text>
              <Text size="1" weight="regular">
                {farm.date}
              </Text>
            </Flex>
            <Flex direction="row" gap="1" align="center">
              {farm.id === selectedFarmId && <ChecklistItem isCompleted />}
              {showOptions && (
                <Button
                  variant="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteFarm(farm.id);
                  }}
                  aria-label="Delete farm"
                  style={{ height: '25px', width: '25px' }}
                >
                  <PiTrashLight />
                </Button>
              )}
            </Flex>
          </FarmOption>
        </Flex>
      ))}
      <Separator orientation="horizontal" style={{ width: '100%' }} />

      {showInput ? (
        <Flex
          gapX="1"
          align="center"
          justify="between"
          style={{
            width: '100%',
            flex: '1',
            padding: '8px 0',
            fontSize: '13px',
            borderRadius: '50px',
            gap: '6px',
          }}
        >
          <TextField.Root
            placeholder="Add a new farm..."
            value={newFarm}
            style={{ width: '80%', flex: '1' }}
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
          <Button
            size="sm"
            variant="primary"
            onClick={(e) => {
              e.stopPropagation();
              handleAdd();
            }}
            disabled={!newFarm.trim()}
          >
            Add
          </Button>
        </Flex>
      ) : (
        <Button variant="ghost" onClick={() => setShowInput(true)}>
          <PiPlusCircleFill />
          Add new farm
        </Button>
      )}
    </ul>
  );
}
