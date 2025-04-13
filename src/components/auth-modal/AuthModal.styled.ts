import { barnRed, charcoalBlack, whiteSmoke } from '@/styles/colors';
import styled from 'styled-components';

/*
max-width: 400px;
  margin: 50px auto;
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  text-align: center;
  h1 {
    margin-bottom: 25px;
    color: #333;
  }
*/

export const Container = styled.div`
  background-color: ${whiteSmoke};
  border: 1px solid ${charcoalBlack};
  position: absolute;
  top: 0;
  right: 0;
  margin: 3.6rem 1.6rem;
  padding: 3.6rem;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

/*

  display: flex;
  flex-direction: column;
  text-align: left;
  label {
    margin-bottom: 5px;
    font-weight: 500;
    color: #555;
  }
  input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
    &:focus {
      outline: none;
      border-color: #0070f3;
      box-shadow: 0 0 0 2px rgba(0, 112, 243, 0.2);
    }
  }
*/
export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  label {
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  input {
    padding: 0.5rem;
    border: 1px solid ${charcoalBlack};
    border-radius: 4px;
    font-size: 1rem;
  }
`;

/*
padding: 12px;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: #005bb5;
  }
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
*/
export const Button = styled.button`
  padding: 0.5rem;
  border: 1px solid ${charcoalBlack};
  border-radius: 4px;
  font-size: 1rem;
`;

/*
margin-top: 20px;
  font-size: 0.9rem;
  color: #555;
  a {
    color: #0070f3;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
*/

export const LinkText = styled.p`
  a {
    color: ${barnRed};
  }
`;
/*
  color: #ff4d4f;
  background-color: #fff1f0;
  border: 1px solid #ffccc7;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
  text-align: center;
*/
export const ErrorMessage = styled.p`

`;

/*
  color: #52c41a;
  background-color: #f6ffed;
  border: 1px solid #b7eb8f;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
  text-align: center;
*/
export const SuccessMessage = styled.p`
  
`;











