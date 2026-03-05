'use client';

import Link from 'next/link';
import { Heading, Text } from '@radix-ui/themes';
import { PiQuestionLight, PiHouseLight } from 'react-icons/pi';
import { IconCircle, Button } from '@/components/ui';
import { pumpkinOrange, mainBackground, mainBlack } from '@/styles/colors';
import styled from 'styled-components';

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  background: ${mainBackground};
  text-align: center;
  padding: 2rem;
`;

const ReturnLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export default function NotFound() {
  return (
    <Container>
      <IconCircle
        icon={PiQuestionLight}
        color={pumpkinOrange}
        width="68px"
        height="68px"
        iconSize={28}
      />
      <Heading size="8" weight="bold" style={{ color: mainBlack }}>
        Page Not Found
      </Heading>
      <Text size="3" color="gray" style={{ maxWidth: '360px' }}>
        Looks like you&apos;ve wandered off the farm. Let&apos;s get you back on
        track.
      </Text>
      <ReturnLink href="/">
        <Button variant="primary" color={pumpkinOrange}>
          <PiHouseLight size={18} />
          Return Home
        </Button>
      </ReturnLink>
    </Container>
  );
}
