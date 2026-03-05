import styled from 'styled-components';
import { sageGreen } from '@/styles/colors';
import { Card } from '@radix-ui/themes';

export const Wrapper = styled.div`
  width: 100%;
  overflow-y: auto;
`;

export const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 2rem;
  padding: 3rem 0;
`;

export const Tagline = styled.p`
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: ${sageGreen};
  margin: 0;
  margin-bottom: 0.75rem;
`;

export const SubHeading = styled.p`
  font-size: 1.25rem;
  color: #666;
  max-width: 700px;
  line-height: 1.8;
  margin: 0;
`;
