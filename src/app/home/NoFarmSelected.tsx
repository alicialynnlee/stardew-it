'use client';

import {
  mainDarkText,
  mainWhite,
  pumpkinCream,
  pumpkinOrange,
  pumpkinRust,
} from '@/styles/colors';
import { Box, Flex, Grid, Heading, Text } from '@radix-ui/themes';
import { Button, Card } from '@/components';
import { useFarms } from '@/hooks/useFarms';
import { useSetSelectedDay } from '@/contexts/SeasonalContext';
import { useCallback } from 'react';
import styled from 'styled-components';
import { PiArrowRightLight } from 'react-icons/pi';
import { useRouter } from 'next/navigation';
import * as Styled from './home.styled';

const FarmCard = styled(Card)`
  transition: all 0.3s ease;
  height: 200px;

  &:hover {
    transform: translateY(-4px);
    border-color: ${pumpkinOrange};
  }
`;

const FarmNewCard = styled(Card)`
  transition: all 0.3s ease;
  height: 200px;
  border: 2px dashed ${pumpkinCream};

  &:hover {
    transform: translateY(-4px);
    border-color: ${pumpkinOrange};
    background: ${mainWhite};
  }
`;

export default function NoFarmSelected({
  username,
}: {
  username: string | null;
}) {
  const { farms, setSelectedFarm } = useFarms();
  const router = useRouter();
  const setSeasonalDay = useSetSelectedDay();
  const handleSelectFarm = useCallback(
    (farmId: string) => {
      if (!farmId || farmId === '') {
        setSelectedFarm('');
        setSeasonalDay('Spring 1');
      } else {
        setSelectedFarm(farmId);
        const newDate = farms.find((f) => f.id === farmId)?.date ?? 'Spring 1';
        setSeasonalDay(newDate);
      }
      router.push('/');
    },
    [farms, setSelectedFarm, setSeasonalDay]
  );

  return (
    <Styled.Wrapper>
      {/* Hero Section */}
      <Styled.HeroSection
        style={{ textAlign: 'left', alignItems: 'flex-start' }}
      >
        <Heading size="9" weight="bold" style={{ color: mainDarkText }}>
          {`Welcome Back, ${username}!`}
        </Heading>

        <Styled.Tagline>
          Select a farm to get started, or create a new one to begin your
          journey.
        </Styled.Tagline>
      </Styled.HeroSection>

      {/* Farm Selector section */}
      <Grid
        columns={{ initial: '1', sm: '1', md: '2', lg: '3' }}
        gap={{ initial: '3', sm: '3', md: '4', lg: '6' }}
        mb="6"
      >
        {farms.map((farm, idx) => (
          <FarmCard onClick={() => handleSelectFarm(farm.id)}>
            <Flex
              direction="column"
              justify="between"
              style={{ height: '100%' }}
            >
              <Box>
                <Box
                  mb="3"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    backgroundColor: pumpkinCream,
                    height: '36px',
                    width: '36px',
                  }}
                >
                  <Text weight="bold" size="3" style={{ color: pumpkinRust }}>
                    {idx + 1}
                  </Text>
                </Box>
                <Text size="2" weight="bold" style={{ color: mainDarkText }}>
                  {farm.name}
                </Text>
                <Text size="1" style={{ color: mainDarkText }}>
                  <br />
                  {farm.date}
                </Text>
              </Box>
              <Button
                variant="ghost"
                style={{ justifyContent: 'flex-start', paddingLeft: 0 }}
              >
                Continue Farming
                <PiArrowRightLight />
              </Button>
            </Flex>
          </FarmCard>
        ))}
        <FarmNewCard
          variant="flat"
          onClick={() => router.push('/settings#farm-selector')}
        >
          <Flex direction="column" justify="between" style={{ height: '100%' }}>
            <Box>
              <Box
                mb="3"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  backgroundColor: pumpkinCream,
                  height: '36px',
                  width: '36px',
                }}
              >
                <Text weight="bold" size="3" style={{ color: pumpkinRust }}>
                  +
                </Text>
              </Box>
              <Text size="2" weight="bold" style={{ color: mainDarkText }}>
                Create a new farm
              </Text>
              <Text size="1" color="gray">
                <br />
                Start a new adventure
              </Text>
            </Box>
          </Flex>
        </FarmNewCard>
      </Grid>
    </Styled.Wrapper>
  );
}
