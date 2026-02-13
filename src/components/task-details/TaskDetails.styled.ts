import styled from 'styled-components';
import { Button, IconButton } from '@radix-ui/themes';
import { parchment, woodBrown } from '@/styles/colors';

export const TaskLabel = styled(Button)`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  padding: 1.5rem;
  margin: 1rem 0;
`;

export const Overlay = styled.div<{ $isOpen: boolean }>`
  background-color: var(--black-a5);
  position: fixed;
  display: ${(props) => (props.$isOpen ? `block` : `none`)};
  animation: opacity 0.3s ease;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 3;
`;

export const Dialog = styled.div`
  background: ${parchment};
  width: 400px;
  max-width: 90%;
  padding: 24px;
  border: 2px solid ${woodBrown};
  box-shadow:
    inset 0 0 0 2px rgba(255, 255, 255, 0.3),
    0 10px 25px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const CloseButton = styled(IconButton)`
  position: absolute;
  top: 10px;
  right: 10px;
`;
