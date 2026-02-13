import styled from 'styled-components';
import { Form } from 'radix-ui';
import { lightRed, parchment, woodBrown } from '@/styles/colors';

export const Field = styled(Form.Field)`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  gap: 0.25rem;

  input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid var(--foreground);
    border-radius: 4px;
    background: transparent;
    color: var(--foreground);

    &:focus {
      outline: none;
      border-color: var(--accent-9);
    }
  }

  &[data-invalid] {
    input {
      border-color: ${lightRed};
    }
    span {
      color: ${lightRed};
      font-size: 12px;
    }
  }
`;

export const AuthForm = styled.div`
  width: 100%;
  padding: 2rem 4rem;
  background: ${parchment};
  border: 2px solid ${woodBrown};
  box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.3);
  border-radius: 12px;
`;

export const Message = styled.div<{ $type: 'error' | 'success' }>`
  color: ${(props) => (props.$type === 'error' ? '#dc2626' : '#16a34a')};
  margin-bottom: 1rem;
  text-align: center;
  padding: 0.75rem;
  border-radius: 4px;
  background: ${(props) => (props.$type === 'error' ? '#fee2e2' : '#dcfce7')};
`;
