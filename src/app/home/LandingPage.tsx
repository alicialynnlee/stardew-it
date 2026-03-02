'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { Button } from '@/components/ui';
import {
  sageGreen,
  pumpkinOrange,
  mainWhite,
  mainBlack,
  mainBackground,
} from '@/styles/colors';

const LandingWrapper = styled.div`
  width: 100%;
  background: linear-gradient(
    135deg,
    #f9f6f2 0%,
    #faf8f5 50%,
    #f5f2ed 100%
  );
  min-height: 100vh;
  overflow-y: auto;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 4rem;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
    gap: 3rem;
  }
`;

const Tagline = styled.p`
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${sageGreen};
  text-align: center;
  margin: 0;
  margin-bottom: 0.5rem;
`;

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 2rem;
  padding: 3rem 0;

  @media (max-width: 768px) {
    padding: 2rem 0;
    gap: 1.5rem;
  }
`;

const MainHeading = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  color: ${mainBlack};
  margin: 0;
  line-height: 1.2;
  letter-spacing: -1px;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const SubHeading = styled.p`
  font-size: 1.25rem;
  color: #666;
  max-width: 700px;
  line-height: 1.8;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const CTAContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 1rem;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.75rem;

    button {
      width: 100%;
    }
  }
`;

const FeaturesSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const FeatureCard = styled.div`
  background: ${mainWhite};
  border: 2px solid #e0d5ca;
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
    border-color: ${sageGreen};
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  background: #f5f2ed;
  border-radius: 12px;
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
    <LandingWrapper>
      <Container>
        {/* Hero Section */}
        <HeroSection>
          <Tagline>Stardew Valley Companion</Tagline>
          <MainHeading>Your Digital Farming Companion</MainHeading>
          <SubHeading>
            Manage your crops, tasks, and festivals across all your farms in one cozy place. Track your progress season by season.
          </SubHeading>
          <CTAContainer>
            <CallToActionLink href="/auth/signin">
              <Button
                variant="primary"
                size="lg"
                color={pumpkinOrange}
              >
                Get Started
              </Button>
            </CallToActionLink>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => {
                // Scroll to features section
                document.querySelector('[data-features]')?.scrollIntoView({
                  behavior: 'smooth',
                });
              }}
            >
              Learn More
            </Button>
          </CTAContainer>
        </HeroSection>

        {/* Features Section */}
        <FeaturesSection data-features>
          {/* Track Seasons */}
          <FeatureCard>
            <FeatureIcon>🌸</FeatureIcon>
            <FeatureTitle>Track Seasons</FeatureTitle>
            <FeatureDescription>
              Never miss a festival or harvest day again
            </FeatureDescription>
            <SampleItems>
              <li>Egg Festival (Spring 13)</li>
              <li>Flower Dance (Spring 24)</li>
              <li>Luau (Summer 11)</li>
              <li>Season progress tracking</li>
            </SampleItems>
          </FeatureCard>

          {/* Organize Chores */}
          <FeatureCard>
            <FeatureIcon>📋</FeatureIcon>
            <FeatureTitle>Organize Chores</FeatureTitle>
            <FeatureDescription>
              Keep your daily farm tasks in order.
            </FeatureDescription>
            <SampleItems>
              <li>Daily watering schedule</li>
              <li>Animal care checklist</li>
              <li>Bundle tracking</li>
              <li>Custom task management</li>
            </SampleItems>
          </FeatureCard>

          {/* Plan Ahead */}
          <FeatureCard>
            <FeatureIcon>🌤️</FeatureIcon>
            <FeatureTitle>Plan Ahead</FeatureTitle>
            <FeatureDescription>
              Weather forecasts to optimize your farming.
            </FeatureDescription>
            <SampleItems>
              <li>Weather predictions</li>
              <li>Crop calendar planning</li>
              <li>Seasonal crop guides</li>
              <li>Optimal harvest scheduling</li>
            </SampleItems>
          </FeatureCard>
        </FeaturesSection>

        {/* CTA Section at bottom */}
        <section
          style={{
            textAlign: 'center',
            padding: '3rem 0',
            borderTop: '2px solid #e0d5ca',
          }}
        >
          <h2 style={{ fontSize: '2rem', color: mainBlack, margin: '0 0 1rem' }}>
            Ready to organize your homestead?
          </h2>
          <p style={{ color: '#666', marginBottom: '2rem' }}>
            Join farmers everywhere in their quest for the perfect farm.
          </p>
          <CallToActionLink href="/auth/signin">
            <Button variant="primary" size="lg" color={pumpkinOrange}>
              Start Your Journey
            </Button>
          </CallToActionLink>
        </section>
      </Container>
    </LandingWrapper>
  );
}
