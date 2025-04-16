'use client';

import Link from 'next/link';
import * as Styled from './SideNav.styled';
import { Box, Drawer, Toolbar } from '@mui/material';

// TODO: Implement side nav toggle
const SideNav: React.FC = () => {
  // const [isOpen, setIsOpen] = useState(true);

  // const toggleSideNav = () => {
  //   setIsOpen(!isOpen);
  // };

  const drawerWidth = 240;

  return (
    <Drawer
      variant="permanent"
      color="default"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />
      {/* <Styled.SideNavContainer $isOpen={true}> */}
      <Styled.CloseButton onClick={() => {}}>&times;</Styled.CloseButton>
      <Styled.NavList>
        <Styled.NavItem>
          <Link href="/">Home</Link>
        </Styled.NavItem>
        <Styled.NavItem>
          <Link href="/tracker">Tracker</Link>
        </Styled.NavItem>
        <Styled.NavItem>
          <Link href="/calendar">Calendar</Link>
        </Styled.NavItem>
        <Styled.NavItem>
          <Link href="/settings">Settings</Link>
        </Styled.NavItem>
      </Styled.NavList>
      {/* </Styled.SideNavContainer> */}
    </Drawer>
  );
};

export default SideNav;
