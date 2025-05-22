import { Button, Card } from '@radix-ui/themes';
import styled from 'styled-components';

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
  box-shadow: var(--shadow-2);
  border-radius: var(--radius-3);
  padding: 1.5rem;
  margin: 1rem 0;
`;
