'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { Button, Card, ChecklistItem } from '@/components/ui';
import {
  sageGreen,
  pumpkinOrange,
  mainWhite,
  mainBlack,
  mainDarkText,
  sageMist,
  sageDark,
  pumpkinCream,
  pumpkinRust,
  summerBg,
  summerText,
  mainCreamDark,
} from '@/styles/colors';
import { Flex, Grid, Heading, IconButton, Text } from '@radix-ui/themes';
import {
  PiCalendarDotsLight,
  PiChartPieLight,
  PiListChecksLight,
} from 'react-icons/pi';
import { ProgressBar } from '@/components';
import * as Styled from './home.styled';
import TipsSection from './TipsSection';

const CTAContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 1rem;
`;

const FeatureCard = styled(Card)`
  transition: all 0.3s ease;
  height: 400px;

  &:hover {
    transform: translateY(-4px);
    border-color: ${sageGreen};
  }
`;

const FeatureIcon = styled(IconButton)<{
  $iconColor: string;
  $backgroundColor: string;
}>`
  cursor: unset;
  background-color: ${({ $backgroundColor }) => $backgroundColor ?? mainWhite};
  box-shadow: none;

  svg {
    stroke: ${({ $iconColor }) => $iconColor ?? mainBlack};
    fill: ${({ $iconColor }) => $iconColor ?? mainBlack};
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${mainBlack};
  margin: 0;
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  color: #666;
  margin: 0;
  line-height: 1.6;
`;

const SampleItems = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0.5rem 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 0.95rem;
  color: #666;

  li {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &::before {
      content: '✓';
      color: ${sageGreen};
      font-weight: bold;
    }
  }
`;

const CallToActionLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  width: fit-content;

  @media (max-width: 480px) {
    width: 100%;

    button {
      width: 100%;
    }
  }
`;

export default function LandingPage() {
  return (
    <Styled.Wrapper>
      {/* Hero Section */}
      <Styled.HeroSection>
        <Styled.Tagline>Organize Your Homestead</Styled.Tagline>
        <Heading size="9" weight="bold" style={{ color: mainDarkText }}>
          Year 1 Completion Guide
        </Heading>
        <Styled.SubHeading>
          Manage your crops, tasks, and festivals across all your farms in one
          cozy place. Track your progress season by season.
        </Styled.SubHeading>
        <CTAContainer>
          <Link href="/auth">
            <Button variant="primary" size="lg" color={pumpkinOrange}>
              Get Started
            </Button>
          </Link>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => {
              // Scroll to features section
              document.querySelector('#tips')?.scrollIntoView({
                behavior: 'smooth',
              });
            }}
          >
            Read Tips
          </Button>
        </CTAContainer>
      </Styled.HeroSection>

      {/* Features Section */}
      <Grid columns="3" gap="6" mb="6">
        {/* Track Seasons */}
        <Link href="/tracker">
          <FeatureCard>
            <Flex direction="column" gap="3">
              <FeatureIcon $iconColor={sageDark} $backgroundColor={sageMist}>
                <PiListChecksLight />
              </FeatureIcon>
              <Text size="4" weight="bold" style={{ color: mainDarkText }}>
                Track Tasks
              </Text>
              <Text size="2" color="gray">
                Keep your daily farm tasks in order.
              </Text>
              {/* TODO: center this card vertically in the remaining card space*/}
              <Card variant="flat">
                <Flex direction="column" gap="1">
                  <Button
                    variant="ghost"
                    size="sm"
                    style={{
                      justifyContent: 'flex-start',
                      backgroundColor: 'white',
                      border: `1px solid ${mainCreamDark}`,
                      overflow: 'hidden',
                    }}
                  >
                    <ChecklistItem isCompleted label="Blueberry" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    style={{
                      justifyContent: 'flex-start',
                      backgroundColor: 'white',
                      border: `1px solid ${mainCreamDark}`,
                      overflow: 'hidden',
                    }}
                  >
                    <ChecklistItem isCompleted={false} label="Bream" />
                  </Button>
                </Flex>
              </Card>
            </Flex>
          </FeatureCard>
        </Link>

        {/* Manage Progress */}
        <Link href="/calendar">
          <FeatureCard>
            <Flex direction="column" gap="3">
              <FeatureIcon $iconColor={summerText} $backgroundColor={summerBg}>
                <PiChartPieLight />
              </FeatureIcon>
              <Text size="4" weight="bold" style={{ color: mainDarkText }}>
                Manage your progress
              </Text>
              <Text size="2" color="gray">
                Monitor your progress through each season.
              </Text>
              {/* TODO: center this card vertically in the remaining card space*/}
              <Card variant="flat">
                <Flex direction="column" gap="1">
                  <Text size="2" weight="bold" style={{ color: mainDarkText }}>
                    Year Progress
                  </Text>
                  <Text size="1" weight="bold" color="gray">
                    Spring 23
                  </Text>
                  <ProgressBar value={65} />
                </Flex>
              </Card>
            </Flex>
          </FeatureCard>
        </Link>

        {/* Plan Ahead */}
        <Link href="/calendar">
          <FeatureCard>
            <Flex direction="column" gap="3">
              <FeatureIcon
                $iconColor={pumpkinRust}
                $backgroundColor={pumpkinCream}
              >
                <PiCalendarDotsLight />
              </FeatureIcon>
              <Text size="4" weight="bold" style={{ color: mainDarkText }}>
                Plan Ahead
              </Text>
              <Text size="2" color="gray">
                Never miss a bundle or harvest day again
              </Text>
              {/* TODO: center this card vertically in the remaining card space*/}
              {/* TODO: fill this card in with something from the calendar, maybe a day box*/}
              <Card variant="flat">{'stuff'}</Card>
            </Flex>
          </FeatureCard>
        </Link>
      </Grid>

      {/* Tips Section */}
      <TipsSection />
    </Styled.Wrapper>
  );
}
