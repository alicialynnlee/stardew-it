import styled from 'styled-components';
import { charcoalBlack, navbarBg, woodBrown } from '@/styles/colors';

export const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: ${navbarBg};
  border-bottom: 2px solid ${woodBrown};
  height: 5rem;
`;

export const HomeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const AppTitle = styled.span`
  font-family: var(--font-heading), 'VT323', monospace;
  font-size: 1.75rem;
  line-height: 1;
`;

export const Home = styled.div`
  font-weight: bold;
  color: inherit; /* Inherit color from navbar */
  text-decoration: none;
`;

export const AuthActions = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  font-size: 1rem;
`;

export const AuthButton = styled.button`
  background: transparent;
  color: ${charcoalBlack};
  border: 1px solid ${charcoalBlack};
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
`;
