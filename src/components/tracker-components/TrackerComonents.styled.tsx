import styled from 'styled-components';

export const DropdownHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;

  .chevron {
    rotate: 0deg;
    transition: all 0.3s;
    &.open {
      rotate: 180deg;
    }
  }
`;

export const TaskContainer = styled.div<{ $isOpen: boolean }>`
  display: ${(props) => (props.$isOpen ? `block` : `none`)};
  transition: all 0.3s allow-discrete;
`;

export const TaskLabel = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  margin: 1rem;
`;
