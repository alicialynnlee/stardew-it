import styled from 'styled-components';
import { charcoalBlack, whiteSmoke } from '@/styles/colors';
export const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: ${whiteSmoke};
  border-bottom: 1px solid #e9ecef;
  height: 5rem;
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
