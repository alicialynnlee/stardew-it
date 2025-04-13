'use client';

import Link from 'next/link';
import * as Styled from './SideNav.styled';

// TODO: Implement side nav toggle
const SideNav: React.FC = () => {
  // const [isOpen, setIsOpen] = useState(true);

  // const toggleSideNav = () => {
  //   setIsOpen(!isOpen);
  // };

  return (
    <Styled.SideNavContainer $isOpen={true}>
      <Styled.CloseButton onClick={() => {}}>&times;</Styled.CloseButton>
      <Styled.NavList>
        <Styled.NavItem>
          <Link href="/">Home</Link>
        </Styled.NavItem>
        <Styled.NavItem>
          <Link href="/tasks">Tasks</Link>
        </Styled.NavItem>
        <Styled.NavItem>
          <Link href="/calendar">Calendar</Link>
        </Styled.NavItem>
        <Styled.NavItem>
          <Link href="/settings">Settings</Link>
        </Styled.NavItem>
      </Styled.NavList>
    </Styled.SideNavContainer>
  );
};

export default SideNav;
