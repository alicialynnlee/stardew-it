import styled from 'styled-components';
import { charcoalBlack, whiteSmoke } from '@/styles/colors';
export const FarmSelector = styled.div`
`;

export const FarmSelectorButton = styled.button`
    background-color: ${charcoalBlack};
    color: ${whiteSmoke};
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
`;

export const FarmSelectorList = styled.ul<{ $isDropdownOpen: boolean }>`
    list-style: none;
    position: absolute;
    display: ${props => props.$isDropdownOpen ? 'block' : 'none'};
`;

