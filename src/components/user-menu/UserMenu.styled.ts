import styled from 'styled-components';
import { dustySage } from '@/styles/colors';

export const TriggerButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.75rem;
  border: 1.5px solid ${dustySage};
  border-radius: 8px;
  background: transparent;
  color: inherit;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--accent-a3);
  }

  &[data-state='open'] {
    background-color: var(--accent-a3);
  }
`;
