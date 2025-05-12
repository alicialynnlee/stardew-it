'use client';

import Link from 'next/link';
import {
  CalendarIcon,
  Cross2Icon,
  HomeIcon,
  MixerHorizontalIcon,
} from '@radix-ui/react-icons';
import * as Styled from './SideNav.styled';
import { useState } from 'react';

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

  const toggleSideNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Styled.SideNavContainer $isOpen={isOpen}>
      <Styled.CloseButton onClick={toggleSideNav} $isOpen={isOpen}>
        <Cross2Icon width={18} height={18} />
      </Styled.CloseButton>
      <Styled.NavList>
        {NAV_ITEMS.map((item) => (
          <Styled.NavItem key={item.label}>
            <Link href={item.href}>
              <item.icon width={18} height={18} />
              <Styled.LinkLabel size="2" $isOpen={isOpen}>
                {item.label}
              </Styled.LinkLabel>
            </Link>
          </Styled.NavItem>
        ))}
      </Styled.NavList>
    </Styled.SideNavContainer>
  );
};

export default SideNav;
