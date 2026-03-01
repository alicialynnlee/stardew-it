'use client';

import React, { useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import {
  mainWhite,
  mainBlack,
  mainCreamDark,
  mainDarkText,
} from '@/styles/colors';

export type ToastType = 'success' | 'warning' | 'error' | 'info';
export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export interface ToastProps {
  id?: string;
  type?: ToastType;
  title?: string;
  message: string;
  position?: ToastPosition;
  duration?: number | null;
  onClose?: () => void;
  className?: string;
  isVisible?: boolean;
}

const slideInUp = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideInDown = keyframes`
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideOutDown = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(20px);
    opacity: 0;
  }
`;

const slideOutUp = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-20px);
    opacity: 0;
  }
`;

function getTypeColors(type: ToastType) {
  switch (type) {
    case 'success':
      return {
        bg: '#dcfce7',
        border: '#bbf7d0',
        text: '#15803d',
        icon: '✓',
      };
    case 'error':
      return {
        bg: '#fee2e2',
        border: '#fecaca',
        text: '#b91c1c',
        icon: '✕',
      };
    case 'warning':
      return {
        bg: '#fef3c7',
        border: '#fde68a',
        text: '#92400e',
        icon: '⚠',
      };
    case 'info':
    default:
      return {
        bg: '#dbeafe',
        border: '#bfdbfe',
        text: '#0e7490',
        icon: 'ⓘ',
      };
  }
}

function getAnimationStyles(
  position: ToastPosition,
  isExiting: boolean
) {
  const isTop = position.startsWith('top');
  const isBottom = position.startsWith('bottom');

  if (isExiting) {
    return isTop ? slideOutUp : slideOutDown;
  }
  return isTop ? slideInDown : slideInUp;
}

const ToastContainer = styled.div<{
  $position: ToastPosition;
  $isExiting: boolean;
}>`
  position: fixed;
  z-index: 2000;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 20px;
  background: ${mainWhite};
  border: 1px solid ${mainCreamDark};
  border-radius: 16px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  min-width: 300px;
  max-width: 500px;

  ${({ $position }) => {
    const [vertical, horizontal] = $position.split('-');
    let styles = '';

    if (vertical === 'top') {
      styles += 'top: 20px; ';
    } else {
      styles += 'bottom: 20px; ';
    }

    if (horizontal === 'left') {
      styles += 'left: 20px; ';
    } else if (horizontal === 'center') {
      styles += 'left: 50%; transform: translateX(-50%); ';
    } else {
      styles += 'right: 20px; ';
    }

    return styles;
  }}

  animation: ${({ $isExiting, $position }) =>
      getAnimationStyles($position, $isExiting)}
    0.3s ease-out forwards;

  @media (max-width: 600px) {
    min-width: auto;
    max-width: calc(100% - 40px);
    left: 20px !important;
    right: 20px !important;
    transform: none !important;
  }
`;

const ToastContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

const ToastIcon = styled.div<{ $color: string }>`
  font-size: 20px;
  color: ${({ $color }) => $color};
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
`;

const ToastTitle = styled.div<{ $color: string }>`
  font-family: var(--font-publicSans), sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: ${({ $color }) => $color};
  line-height: 20px;
`;

const ToastMessage = styled.div<{ $color: string }>`
  font-family: var(--font-roboto), sans-serif;
  font-size: 13px;
  color: ${({ $color }) => $color};
  line-height: 18px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${mainDarkText};
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
  transition: color 0.15s ease;

  &:hover {
    color: ${mainBlack};
  }
`;

const ProgressBar = styled.div<{ $color: string; $duration: number }>`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: ${({ $color }) => $color};
  border-radius: 0 0 16px 0;
  animation: ${() => keyframes`
    from {
      width: 100%;
    }
    to {
      width: 0%;
    }
  `} ${({ $duration }) => $duration}ms linear forwards;
`;

export const Toast: React.FC<ToastProps> = ({
  id,
  type = 'info',
  title,
  message,
  position = 'bottom-right',
  duration = 4000,
  onClose,
  className,
  isVisible = true,
}) => {
  const [isExiting, setIsExiting] = useState(false);
  const colors = getTypeColors(type);

  useEffect(() => {
    if (!isVisible) {
      setIsExiting(true);
      const timer = setTimeout(() => {
        onClose?.();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  useEffect(() => {
    if (duration && isVisible && !isExiting) {
      const timer = setTimeout(() => {
        setIsExiting(true);
        const closeTimer = setTimeout(() => {
          onClose?.();
        }, 300);
        return () => clearTimeout(closeTimer);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, isVisible, isExiting, onClose]);

  const handleClose = () => {
    setIsExiting(true);
    const timer = setTimeout(() => {
      onClose?.();
    }, 300);
    return () => clearTimeout(timer);
  };

  return (
    <ToastContainer
      $position={position}
      $isExiting={isExiting}
      className={className}
      role="status"
      aria-live="polite"
    >
      <ToastIcon $color={colors.text}>{colors.icon}</ToastIcon>
      <ToastContent>
        {title && <ToastTitle $color={colors.text}>{title}</ToastTitle>}
        <ToastMessage $color={colors.text}>{message}</ToastMessage>
      </ToastContent>
      <CloseButton
        onClick={handleClose}
        aria-label="Close notification"
        type="button"
      >
        ×
      </CloseButton>
      {duration && <ProgressBar $color={colors.text} $duration={duration} />}
    </ToastContainer>
  );
};

export default Toast;
