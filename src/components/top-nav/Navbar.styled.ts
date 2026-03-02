import styled from 'styled-components';
import { charcoalBlack, mainWhite, whiteSmoke } from '@/styles/colors';
import { sizeStyles } from '../ui/Button';

export const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  border-bottom: 1px solid #e9ecef;
  height: 5rem;
`;

export const HomeContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Home = styled.div`
  font-weight: bold;
  color: inherit; /* Inherit color from navbar */
  text-decoration: none;
`;

export const AuthActions = styled.div`
  .auth-bar {
    ${sizeStyles.sm}
    background-color: ${mainWhite};
  }
`;

export const AuthButton = styled.button`
  background: transparent;
  color: ${charcoalBlack};
  border: 1px solid ${charcoalBlack};
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
`;
