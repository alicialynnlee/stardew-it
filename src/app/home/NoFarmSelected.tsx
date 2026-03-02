'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { Button } from '@/components/ui';
import {
  sageGreen,
  pumpkinOrange,
  mainWhite,
  mainBlack,
} from '@/styles/colors';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #f9f6f2 0%, #faf8f5 100%);
`;

const CardWrapper = styled.div`
  background: ${mainWhite};
  border: 2px solid #e0d5ca;
  border-radius: 20px;
  padding: 3rem 2rem;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  text-align: center;

  @media (max-width: 480px) {
    padding: 2rem 1.5rem;
  }
`;

const Icon = styled.div`
  font-size: 4rem;
  margin-bottom: 1.5rem;
`;

const Heading = styled.h1`
  font-size: 2rem;
  color: ${mainBlack};
  margin: 0 0 1rem;
  font-weight: 700;
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: #666;
  margin: 0 0 2rem;
  line-height: 1.6;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  a {
    text-decoration: none;
    color: inherit;
    width: 100%;
  }

  button {
    width: 100%;
  }
`;

export default function NoFarmSelected() {
  return (
    <Container>
      <CardWrapper>
        <Icon>🚜</Icon>
        <Heading>No Farm Selected</Heading>
        <Description>
          You haven't selected a farm yet. Let's get you started by creating or selecting a farm to manage.
        </Description>
        <ButtonGroup>
          <Link href="/tracker">
            <Button variant="primary" size="lg" color={pumpkinOrange}>
              Select or Create a Farm
            </Button>
          </Link>
          <Link href="/calendar">
            <Button variant="secondary" size="lg">
              Explore Calendar
            </Button>
          </Link>
        </ButtonGroup>
      </CardWrapper>
    </Container>
  );
}
