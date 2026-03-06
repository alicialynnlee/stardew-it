import styled from 'styled-components';
import { sageGreen } from '@/styles/colors';
import { spacing, BREAKPOINTS } from '@/styles/responsive';
import { Card } from '@radix-ui/themes';

export const Wrapper = styled.div`
  width: 100%;
  overflow-y: auto;
  padding: ${spacing.mobile.sectionHorizontal};

  @media (min-width: ${BREAKPOINTS.mobile + 1}px) {
    padding: ${spacing.tablet.sectionHorizontal};
  }

  @media (min-width: ${BREAKPOINTS.desktop}px) {
    padding: ${spacing.desktop.sectionHorizontal};
  }
`;

export const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: ${spacing.mobile.sectionVertical};
  padding: ${spacing.mobile.sectionVertical} 0;

  @media (min-width: ${BREAKPOINTS.mobile + 1}px) {
    gap: ${spacing.tablet.sectionVertical};
    padding: ${spacing.tablet.sectionVertical} 0;
  }

  @media (min-width: ${BREAKPOINTS.desktop}px) {
    gap: ${spacing.desktop.sectionVertical};
    padding: ${spacing.desktop.sectionVertical} 0;
  }
`;

export const Tagline = styled.p`
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${sageGreen};
  margin: 0;
  margin-bottom: 0.75rem;

  @media (min-width: ${BREAKPOINTS.desktop}px) {
    font-size: 0.85rem;
    letter-spacing: 2.5px;
  }
`;

export const SubHeading = styled.p`
  font-size: 1rem;
  color: #666;
  max-width: 100%;
  line-height: 1.8;
  margin: 0;

  @media (min-width: ${BREAKPOINTS.desktop}px) {
    font-size: 1.25rem;
    max-width: 700px;
  }
`;
