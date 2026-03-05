'use client';

import { mainDarkText } from '@/styles/colors';
import FarmSelector from '@/components/farm-selector/FarmSelector';
import * as Styled from './home.styled';
import { Heading } from '@radix-ui/themes';

export default function NoFarmSelected({
  username,
}: {
  username: string | null;
}) {
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
    </Styled.Wrapper>
  );
}
