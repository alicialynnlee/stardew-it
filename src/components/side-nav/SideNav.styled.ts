import styled from 'styled-components';
import { Text } from '@radix-ui/themes';
import Link from 'next/link';
import { sageDark } from '@/styles/colors';
import { sizeStyles } from '../ui/Button';

export const SideNavContainer = styled.aside<{ $isOpen: boolean }>`
  height: 100%;
  flex-shrink: 0;
  overflow-y: auto;
  width: ${(props) => (props.$isOpen ? '17rem' : '9.3rem')};
  padding: 1.5rem;
  transition: width 0.3s ease-in-out;
  z-index: 2;

  .nav-card {
    height: 100%;
  }

  .nav-item {
    text-decoration: none;
    font-weight: 700;
    display: flex;
    align-items: center;
    transition: all 0.3s;
    ${sizeStyles.md}

    &:not(.active):hover {
      background-color: var(--accent-a3);
      color: var(--accent-a12);
    }
    &.active {
      background-color: ${sageDark};
      color: var(--custom-contrast);
    }
  }
`;

export const NavList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

export const LinkLabel = styled(Text)<{ $isOpen: boolean }>`
  position: absolute;
  margin-left: 30px;
  line-height: 20px;
  visibility: ${(props) => (props.$isOpen ? `visible` : `hidden`)};
  transition: all 0.2s allow-discrete;
`;

export const NavItem = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: 8px;
  gap: 0.5rem;
  transition: all 0.3s;

  &:not(.active):hover {
    background-color: var(--accent-a3);
    color: var(--accent-a12);
  }
  &.active {
    background-color: var(--accent-a9);
    color: var(--custom-contrast);
  }
`;

export const CloseButton = styled.button<{ $isOpen: boolean }>`
  border: none;
  padding: 0.5rem;
  border-radius: 8px;
  width: 100%;
  svg {
    transform: ${(props) => (props.$isOpen ? `rotate(0);` : `rotate(180deg);`)};
    transition: all 0.3s ease-in-out;
  }

  &:hover {
    color: var(--accent-a12);
  }
`;
