import styled from 'styled-components';

export const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  color: #343a40;
  font-family: var(--font-geist-sans);
`;

export const Home = styled.div`
  font-weight: bold;
  font-size: 1.25rem;
  color: inherit; /* Inherit color from navbar */
  text-decoration: none;
`;

export const AuthActions = styled.div`
  display: flex;
  gap: 1rem;
`;


