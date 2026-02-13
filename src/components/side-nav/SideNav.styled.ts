import styled from 'styled-components';
import { navbarBg, woodBrown } from '@/styles/colors';
import { Text } from '@radix-ui/themes';

export const SideNavContainer = styled.aside<{ $isOpen: boolean }>`
  min-height: 100%;
  width: ${(props) => (props.$isOpen ? '17rem' : '5.3rem')};
  background-color: ${navbarBg};
  border-right: 2px solid ${woodBrown};
  padding: 1.5rem;
  transition: width 0.3s ease-in-out;
  z-index: 2;
`;

export const NavList = styled.ul`
  list-style: none;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const LinkLabel = styled(Text)<{ $isOpen: boolean }>`
  position: absolute;
  margin-left: 30px;
  line-height: 20px;
  visibility: ${(props) => (props.$isOpen ? `visible` : `hidden`)};
  transition: all 0.2s allow-discrete;
`;

export const NavItem = styled.li`
  a {
    text-decoration: none;
    display: flex;
    align-items: center;
    padding: 0.5rem;
    border-radius: 8px;
    gap: 0.5rem;
    transition: all 0.3s;

    &:hover {
      background-color: var(--accent-a3);
      color: var(--accent-a12);
    }
  }
`;

export const CloseButton = styled.button<{ $isOpen: boolean }>`
  background: none;
  border: none;
  padding: 0.5rem;
  border-radius: 8px;
  transform: ${(props) =>
    props.$isOpen
      ? `translateX(12rem) rotate(0);`
      : `translateX(0) rotate(45deg);`};
  transition: all 0.3s ease-in-out;

  &:hover {
    color: var(--accent-a12);
  }
`;
