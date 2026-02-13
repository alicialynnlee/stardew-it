import styled from 'styled-components';
import { woodBrown } from '@/styles/colors';

export const DropdownHeader = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  width: 100%;

  .chevron {
    margin-top: 0.25rem;
    rotate: 0deg;
    transition: all 0.3s;
    &.open {
      rotate: 90deg;
    }
  }
`;

export const TaskContainer = styled.div<{ $isOpen: boolean }>`
  display: ${(props) => (props.$isOpen ? `block` : `none`)};
  transition: all 0.3s allow-discrete;
`;

export const BundleContainer = styled.div`
  border: 2px solid ${woodBrown};
  box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1rem 0;
`;
