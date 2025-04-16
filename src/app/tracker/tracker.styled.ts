import { charcoalBlack, whiteSmoke } from '@/styles/colors';
import styled from 'styled-components';

export const WarningBanner = styled.div`
  background-color: #fff3cd;
  border: 1px solid #ffeeba;
  color: #856404;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  text-align: center;

  a {
    color: inherit;
    text-decoration: underline;
    font-weight: bold;

    &:hover {
      text-decoration: none;
    }
  }
`;

export const RoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid ${charcoalBlack};
  padding: 1.6rem;
  border-radius: 4px;
  margin: 2.4rem 0;
`;

export const TaskContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.8rem;
`;
