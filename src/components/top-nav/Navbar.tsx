'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import FarmSelector from '../farm-selector/FarmSelector';
import UserMenu from '../user-menu/UserMenu';
import * as Styled from './Navbar.styled';
import { Flex, Heading, Separator } from '@radix-ui/themes';
import Jumino from '../jumino/Jumino';
import { Card, Button } from '@/components';

export default function Navbar() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <Styled.Navbar>
        <Styled.HomeContainer>
          <Link href="/">
            <div>
              <Jumino size="sm" state="idle" />
              <Heading>Stardew It</Heading>
            </div>
          </Link>
        </Styled.HomeContainer>
      </Styled.Navbar>
    );
  }

  return (
    <Styled.Navbar>
      <div>
        <Link href="/">
          <Styled.HomeContainer>
            <Jumino size="sm" state="idle" />
            <Heading>Stardew It</Heading>
          </Styled.HomeContainer>
        </Link>
      </div>
      <Styled.AuthActions>
        {session ? (
          <Card className="auth-bar" variant="flat">
            <Flex direction="row" gap="2" align="center">
              <FarmSelector />
              <Separator orientation="vertical" decorative />
              <UserMenu />
            </Flex>
          </Card>
        ) : (
          <Link href="/auth">
            <Button variant="primary">Sign In</Button>
          </Link>
        )}
      </Styled.AuthActions>
    </Styled.Navbar>
  );
}
