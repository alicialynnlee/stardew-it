'use client';

import { charcoalBlack, lighterGreen, whiteSmoke } from '@/styles/colors';
import styled from 'styled-components';

export default function Button({
  children,
  theme = 'primary',
  onClick,
  style,
}: {
  children: React.ReactNode | string;
  theme?: 'primary' | 'noBorder';
  onClick: () => void;
  style?: React.CSSProperties;
}) {
  let StyledButton = PrimaryButton;
  switch (theme) {
    case 'noBorder':
      StyledButton = NoBorderButton;
  }
  return (
    <StyledButton type="button" onClick={onClick} style={style}>
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex-direction: row;
`;

const NoBorderButton = styled(StyledButton)`
  background-color: transparent;
  border: none;
  padding: 0;
`;

const PrimaryButton = styled(StyledButton)`
  background-color: ${whiteSmoke};
  color: ${charcoalBlack};
  padding: 10px 20px;
  border-radius: 5px;
`;
