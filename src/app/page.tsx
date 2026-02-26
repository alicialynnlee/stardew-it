'use client';

import Image from 'next/image';
import Link from 'next/link';
import * as Styled from './home.styled';

export default function Home() {
  return (
    <Styled.HomeWrapper>
      <Styled.HeroSection>
        <Image
          src="/favicon.png"
          alt="Junimo mascot"
          width={120}
          height={120}
        />
        <Styled.HeroTitle>Welcome to Stardew It!</Styled.HeroTitle>
        <Styled.HeroTagline>Your Year 1 field guide</Styled.HeroTagline>
      </Styled.HeroSection>

      <Styled.FeatureGrid>
        <Link href="/tracker">
          <Styled.FeatureCard>
            <Styled.FeatureIcon>📦</Styled.FeatureIcon>
            <Styled.FeatureTitle>Bundle Tracker</Styled.FeatureTitle>
            <Styled.FeatureDescription>
              Track every Community Center bundle and check off items as you go.
            </Styled.FeatureDescription>
          </Styled.FeatureCard>
        </Link>
        <Link href="/calendar">
          <Styled.FeatureCard>
            <Styled.FeatureIcon>📅</Styled.FeatureIcon>
            <Styled.FeatureTitle>Season Calendar</Styled.FeatureTitle>
            <Styled.FeatureDescription>
              See what to plant, forage, and catch each season at a glance.
            </Styled.FeatureDescription>
          </Styled.FeatureCard>
        </Link>
      </Styled.FeatureGrid>

      <Styled.TipsSection>
        <Styled.TipsTitle>Year 1 Survival Tips</Styled.TipsTitle>
        <Styled.TipsList>
          <Styled.TipItem>
            <strong>Choose the fruit bat cave.</strong> It drops forageable
            fruits you need for bundles — the mushroom cave is tempting but
            harder to replace.
          </Styled.TipItem>
          <Styled.TipItem>
            <strong>
              Check the Traveling Cart every Friday &amp; Saturday.
            </strong>{' '}
            She stocks rare items like Red Cabbage seeds that can save your Year
            1 run.
          </Styled.TipItem>
          <Styled.TipItem>
            <strong>Pick the Year 1 Completable option for Red Cabbage.</strong>{' '}
            In the remixed bundles setting, this guarantees Red Cabbage is
            obtainable without relying on luck.
          </Styled.TipItem>
          <Styled.TipItem>
            <strong>Save one of everything.</strong> Fish, crops, foraged items
            — if it looks unique, stash it in a chest. Future-you will be
            grateful.
          </Styled.TipItem>
          <Styled.TipItem>
            <strong>Plan your rainy days.</strong> Rain means free watering, so
            use those days to mine, fish, or forage instead. Every energy point
            counts in Year 1.
          </Styled.TipItem>
        </Styled.TipsList>
      </Styled.TipsSection>
    </Styled.HomeWrapper>
  );
}
