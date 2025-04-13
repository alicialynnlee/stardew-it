import styled from 'styled-components';

export const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

export const AuthForm = styled.form`
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background: var(--background);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const AuthToggle = styled.div`
  display: flex;
  margin-bottom: 2rem;
  border-radius: 4px;
  overflow: hidden;
`;

export const ToggleButton = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 0.75rem;
  border: none;
  background: ${props => props.$active ? 'var(--foreground)' : 'transparent'};
  color: ${props => props.$active ? 'var(--background)' : 'var(--foreground)'};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.$active ? 'var(--foreground)' : 'rgba(0, 0, 0, 0.1)'};
  }
`;

export const InputGroup = styled.div`
  margin-bottom: 1rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
  }

  input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--foreground);
    border-radius: 4px;
    background: transparent;
    color: var(--foreground);

    &:focus {
      outline: none;
      border-color: #2563eb;
    }
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: var(--foreground);
  color: var(--background);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
  transition: opacity 0.2s ease;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const Message = styled.div<{ $type: 'error' | 'success' }>`
  color: ${props => props.$type === 'error' ? '#dc2626' : '#16a34a'};
  margin-bottom: 1rem;
  text-align: center;
  padding: 0.75rem;
  border-radius: 4px;
  background: ${props => props.$type === 'error' ? '#fee2e2' : '#dcfce7'};
`; 