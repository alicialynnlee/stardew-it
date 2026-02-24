import styled from 'styled-components';
import { Form } from 'radix-ui';
import { lightRed } from '@/styles/colors';

export const SettingsContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 0 1.5rem;
`;

export const SettingsCard = styled.div`
  padding: 2rem;
  background: var(--background);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
`;

export const AvatarRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

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

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
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

export const ReadOnlyField = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  gap: 0.25rem;
`;

export const Message = styled.div<{ $type: 'error' | 'success' }>`
  color: ${(props) => (props.$type === 'error' ? '#dc2626' : '#16a34a')};
  margin-top: 1rem;
  text-align: center;
  padding: 0.75rem;
  border-radius: 4px;
  background: ${(props) =>
    props.$type === 'error' ? '#fee2e2' : '#dcfce7'};
`;
