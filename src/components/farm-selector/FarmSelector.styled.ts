import styled from 'styled-components';
import { parchment, woodBrown } from '@/styles/colors';

export const FarmSelector = styled.div`
  .farm-selector-open-button {
    width: 10rem;
    justify-content: space-between;
  }
`;

export const DropdownContainer = styled.div<{ $isDropdownOpen: boolean }>`
  position: absolute;
  visibility: ${(props) => (props.$isDropdownOpen ? 'visible' : 'hidden')};
  transform: ${(props) =>
    props.$isDropdownOpen ? 'translateY(0)' : 'translateY(-30px)'};
  transition-property: transform;
  transition-duration: 0.3s;
  transition-delay: 0s;
  border-radius: 12px;
  border: 2px solid ${woodBrown};
  box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.3);
  background-color: ${parchment};
  padding: 0.5rem 1rem;
  width: 15rem;
  z-index: 2;
`;

export const FarmSelectorList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  button {
    justify-content: space-between;
  }
`;

export const ListItemWithButton = styled.div`
  display: flex;
  flex-direction: row;
`;
