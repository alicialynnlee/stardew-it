import styled from 'styled-components';
import { charcoalBlack, mainWhite, whiteSmoke } from '@/styles/colors';
import { sizeStyles } from '../ui/Button';
import { BREAKPOINTS } from '@/styles/responsive';

export const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  border-bottom: 1px solid #e9ecef;
  height: 5rem;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: ${BREAKPOINTS.mobile}px) {
    padding: 0.75rem 1rem;
    height: auto;
    min-height: 4rem;
    flex-direction: row;
  }
`;

export const HomeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;

  @media (max-width: ${BREAKPOINTS.mobile}px) {
    gap: 0.25rem;

    h3,
    h4,
    h5,
    h6 {
      font-size: 1rem;
    }
  }
`;

export const Home = styled.div`
  font-weight: bold;
  color: inherit; /* Inherit color from navbar */
  text-decoration: none;
`;

export const AuthActions = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 1;

  @media (max-width: ${BREAKPOINTS.mobile}px) {
    width: 100%;
    order: 3;
  }

  .auth-bar {
    ${sizeStyles.sm}
    background-color: ${mainWhite};

    @media (max-width: ${BREAKPOINTS.mobile}px) {
      width: 100%;

      > div {
        flex-direction: column;
        width: 100%;

        > div:first-child {
          width: 100%;
        }
      }
    }
  }
`;

export const AuthButton = styled.button`
  background: transparent;
  color: ${charcoalBlack};
  border: 1px solid ${charcoalBlack};
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
`;
