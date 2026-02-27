'use client';

import {
  CalendarIcon,
  ChevronLeftIcon,
  HomeIcon,
  MixerHorizontalIcon,
} from '@radix-ui/react-icons';
import * as Styled from './SideNav.styled';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Card, Flex } from '@radix-ui/themes';
import Link from 'next/link';

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
const SideNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  const toggleSideNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Styled.SideNavContainer $isOpen={isOpen}>
      <Card style={{ height: '100%', width: '100%' }}>
        <Flex
          direction="column"
          justify="between"
          align="start"
          height="100%"
          width="100%"
        >
          <Styled.NavList>
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={
                    pathname === item.href ? 'active nav-item' : 'nav-item'
                  }
                >
                  <item.icon width={18} height={18} />
                  <Styled.LinkLabel size="2" $isOpen={isOpen}>
                    {item.label}
                  </Styled.LinkLabel>
                </Link>
              </li>
            ))}
          </Styled.NavList>
          <Flex direction="column" width="100%">
            {/* TODO: add cute peeking <Jumino /> */}
            <Styled.CloseButton
              onClick={toggleSideNav}
              $isOpen={isOpen}
              className="nav-item"
            >
              <ChevronLeftIcon width={18} height={18} />
              {isOpen && 'Collapse'}
            </Styled.CloseButton>
          </Flex>
        </Flex>
      </Card>
    </Styled.SideNavContainer>
  );
};

export default SideNav;
