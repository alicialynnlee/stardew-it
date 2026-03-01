'use client';

import React, { ReactNode, useCallback, useEffect } from 'react';
import styled, { css } from 'styled-components';
import {
  mainWhite,
  mainBlack,
  mainCreamDark,
  mainDarkText,
  pumpkinOrange,
} from '@/styles/colors';

export interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  title?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  showCloseButton?: boolean;
  closeOnEscape?: boolean;
  closeOnBackdropClick?: boolean;
  className?: string;
}

const sizeMap = {
  sm: css`
    max-width: 400px;
    width: 90%;
  `,
  md: css`
    max-width: 600px;
    width: 90%;
  `,
  lg: css`
    max-width: 800px;
    width: 90%;
  `,
};

const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};
  transition: opacity 0.2s ease;
  padding: 16px;
`;

const ModalContent = styled.div<{ $size: 'sm' | 'md' | 'lg'; $isOpen: boolean }>`
  background: ${mainWhite};
  border: 1px solid ${mainCreamDark};
  border-radius: 32px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  max-height: 90vh;
  overflow: hidden;
  transform: ${({ $isOpen }) =>
    $isOpen ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(-20px)'};
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;

  ${({ $size }) => sizeMap[$size]}
`;

const ModalHeader = styled.div`
  padding: 28px 32px 20px;
  border-bottom: 1px solid ${mainCreamDark};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-shrink: 0;
`;

const ModalTitle = styled.h2`
  font-family: var(--font-publicSans), sans-serif;
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
  color: ${mainBlack};
  margin: 0;
  flex: 1;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${mainDarkText};
  border-radius: 50%;
  transition: background 0.15s ease;
  flex-shrink: 0;

  &:hover {
    background: ${mainCreamDark};
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const ModalBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px 32px;
`;

const ModalFooter = styled.div`
  padding: 20px 32px 28px;
  border-top: 1px solid ${mainCreamDark};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  flex-shrink: 0;
`;

const CloseIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 4L16 16M16 4L4 16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  showCloseButton = true,
  closeOnEscape = true,
  closeOnBackdropClick = true,
  className,
}) => {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (closeOnEscape && e.key === 'Escape' && onClose) {
        onClose();
      }
    },
    [closeOnEscape, onClose]
  );

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (
        closeOnBackdropClick &&
        e.target === e.currentTarget &&
        onClose
      ) {
        onClose();
      }
    },
    [closeOnBackdropClick, onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, handleEscape]);

  return (
    <Overlay $isOpen={isOpen} onClick={handleBackdropClick}>
      <ModalContent
        $size={size}
        $isOpen={isOpen}
        className={className}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {title && (
          <ModalHeader>
            <ModalTitle id="modal-title">{title}</ModalTitle>
            {showCloseButton && (
              <CloseButton
                onClick={onClose}
                aria-label="Close modal"
                type="button"
              >
                <CloseIcon />
              </CloseButton>
            )}
          </ModalHeader>
        )}

        <ModalBody>{children}</ModalBody>

        {footer && <ModalFooter>{footer}</ModalFooter>}
      </ModalContent>
    </Overlay>
  );
};

export default Modal;
