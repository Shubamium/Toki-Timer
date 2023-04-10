import styled from "styled-components";

const StyledButton = styled.button`
    background-color: ${props => props.bgColor || '#E8A0BF'};
    color: white;
    font-family: var(--secondFont);
    border: ${props => props.color === 'none' ? '2px solid pink' : 'none'};
    padding:.2em .5em;
    font-size: 1.2rem;
    cursor: pointer;
    border-radius: .21em;


    &:hover{
        scale: 1.05;
    }
    &:active{
        scale:.9;
    }
`

export default StyledButton