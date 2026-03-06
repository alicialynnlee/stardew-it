import styled from 'styled-components';
import { charcoalBlack, mainWhite, whiteSmoke, mainDarkText } from '@/styles/colors';
import { sizeStyles } from '../ui/Button';
import { BREAKPOINTS } from '@/styles/responsive';

export const NavbarWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Navbar = styled.nav`
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  border-bottom: 1px solid #e9ecef;
  height: 5rem;
  gap: 1rem;

  @media (max-width: ${BREAKPOINTS.mobile}px) {
    padding: 0.75rem 1rem;
    height: auto;
    min-height: 4rem;
  }
`;

export const NavbarContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 1rem;

  @media (max-width: ${BREAKPOINTS.mobile}px) {
    gap: 0.5rem;
  }
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;

  .hamburger-btn {
    display: none;
  }

  @media (max-width: ${BREAKPOINTS.mobile}px) {
    gap: 0.5rem;

    .hamburger-btn {
      display: flex;
    }
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

export const BrandText = styled.h3`
  @media (max-width: ${BREAKPOINTS.mobile}px) {
    display: none;
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

/* Mobile Menu Styles */
export const MobileMenu = styled.div`
  display: none;
  background-color: ${mainWhite};
  border-bottom: 1px solid #e9ecef;
  animation: slideDown 0.3s ease-out;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: ${BREAKPOINTS.mobile}px) {
    display: block;
  }
`;

export const MobileMenuContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0;
`;

export const MobileMenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  color: ${mainDarkText};
  text-decoration: none;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: #f9f9f9;
  }

  &:last-child {
    border-bottom: none;
  }

  span {
    font-weight: 500;
    font-size: 1rem;
  }
`;
