import styled from 'styled-components';
import { whiteSmoke, darkGreen } from '@/styles/colors';

export const HomeWrapper = styled.div`
  max-width: 48rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

export const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.75rem;
  padding: 2rem 0 1rem;
`;

export const HeroTitle = styled.h1`
  font-size: 3rem;
  color: var(--foreground);
  margin: 0;
`;

export const HeroTagline = styled.p`
  font-size: 1.25rem;
  color: var(--gray-11);
  margin: 0;
`;

export const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
`;

export const FeatureCard = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 2rem 1.5rem;
  background: ${whiteSmoke};
  border: 2px solid ${darkGreen};
  box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow:
      inset 0 0 0 2px rgba(255, 255, 255, 0.3),
      0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

export const FeatureIcon = styled.span`
  font-size: 2.5rem;
  line-height: 1;
`;

export const FeatureTitle = styled.h2`
  font-size: 1.5rem;
  margin: 0;
`;

export const FeatureDescription = styled.p`
  font-size: 0.95rem;
  color: var(--gray-11);
  text-align: center;
  margin: 0;
`;

export const TipsSection = styled.section`
  background: ${whiteSmoke};
  border: 2px solid ${darkGreen};
  box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  padding: 2rem;
`;

export const TipsTitle = styled.h2`
  font-size: 1.75rem;
  margin: 0 0 1.25rem;
  text-align: center;
`;

export const TipsList = styled.ol`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-left: 1.5rem;
  margin: 0;
`;

export const TipItem = styled.li`
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--foreground);

  strong {
    color: ${darkGreen};
  }
`;