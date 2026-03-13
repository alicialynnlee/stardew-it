'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import {
  HamburgerMenuIcon,
  Cross2Icon,
  HomeIcon,
  MixerHorizontalIcon,
  CalendarIcon,
} from '@radix-ui/react-icons';
import FarmSelector from '../farm-selector/FarmSelector';
import UserMenu from '../user-menu/UserMenu';
import * as Styled from './Navbar.styled';
import { Flex, Separator } from '@radix-ui/themes';
import Jumino from '../jumino/Jumino';
import { Card, Button } from '@/components';

const NAV_ITEMS = [
  {
    label: 'Home',
    icon: HomeIcon,
    href: '/',
  },
  {
    label: 'Tracker',
    icon: MixerHorizontalIcon,
    href: '/tracker',
  },
  {
    label: 'Calendar',
    icon: CalendarIcon,
    href: '/calendar',
  },
];

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  if (status === 'loading') {
    return (
      <Styled.Navbar>
        <Styled.HomeContainer>
          <Link href="/">
            <div>
              <Jumino size="sm" state="idle" />
              <Styled.BrandText>Stardew It</Styled.BrandText>
            </div>
          </Link>
        </Styled.HomeContainer>
      </Styled.Navbar>
    );
  }

  return (
    <Styled.NavbarWrapper>
      <Styled.Navbar>
        <Styled.NavbarContent>
          <Styled.LeftSection>
            <Button
              variant="icon"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="hamburger-btn"
            >
              {isMobileMenuOpen ? (
                <Cross2Icon width={20} height={20} />
              ) : (
                <HamburgerMenuIcon width={20} height={20} />
              )}
            </Button>
            <Link href="/">
              <Styled.HomeContainer>
                <Jumino size="sm" state="idle" />
                <Styled.BrandText>Stardew It</Styled.BrandText>
              </Styled.HomeContainer>
            </Link>
          </Styled.LeftSection>
          <Styled.AuthActions>
            {session ? (
              <Card className="auth-bar" variant="flat" padding="sm">
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
        </Styled.NavbarContent>
      </Styled.Navbar>

      {/* Mobile Menu */}
      {isMobileMenuOpen && session && (
        <Styled.MobileMenu>
          <Styled.MobileMenuContent>
            {NAV_ITEMS.map((item) => (
              <Link key={item.label} href={item.href}>
                <Styled.MobileMenuItem onClick={closeMobileMenu}>
                  <item.icon width={18} height={18} />
                  <span>{item.label}</span>
                </Styled.MobileMenuItem>
              </Link>
            ))}
          </Styled.MobileMenuContent>
        </Styled.MobileMenu>
      )}
    </Styled.NavbarWrapper>
  );
}
