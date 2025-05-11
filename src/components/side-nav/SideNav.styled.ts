import styled from 'styled-components';
import { whiteSmoke } from '@/styles/colors';

export const SideNavContainer = styled.aside<{ $isOpen: boolean }>`
  min-height: 100%;
  width: ${(props) => (props.$isOpen ? '17rem' : '5.3rem')};
  background-color: ${whiteSmoke};
  border-right: 1px solid #e9ecef;
  padding: 2rem;
  transition: width 0.3s ease-in-out;
  z-index: 1000;
`;

export const NavList = styled.ul`
  list-style: none;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const LinkLabel = styled.span<{ $isOpen: boolean }>`
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
    padding: 1rem 0;
    border-radius: 8px;
    gap: 1rem;
    transition: background-color 0.2s;

    &:hover {
      svg {
        transition: transform 0.3s;
        transform: scale(1.3);
      }
      font-weight: 600;
    }
  }
`;

export const CloseButton = styled.button<{ $isOpen: boolean }>`
  background: none;
  border: none;
  width: 100%;
  display: flex;
  flex-direction: row-reverse;

  &:hover {
    svg {
      transition: transform 0.3s;
      transform: scale(1.3);
    }
  }
`;
