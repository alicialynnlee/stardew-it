import styled from 'styled-components';
import { whiteSmoke } from '@/styles/colors';

export const SideNavContainer = styled.aside<{ $isOpen: boolean }>`
  min-height: 100%;
  width: 17rem;
  background-color: ${whiteSmoke};
  border-right: 1px solid #e9ecef;
  padding: 2rem 1rem;
  transform: translateX(${(props) => (props.$isOpen ? '0' : '-100%')});
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
`;

export const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 2rem 0;
`;

export const NavItem = styled.li`
  margin: 1rem 0;

  a {
    text-decoration: none;
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    transition: background-color 0.2s;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;

  &:hover {
    opacity: 0.8;
  }
`;
