import styled from "styled-components"

const DigitalTime = styled.p`

  color: ${props=> props.color || '#9466a1'};
  font-family: var(--mainFont);
  font-size: ${props => props.size || '2rem'};
  & .ms{
    font-size: 1.4rem;
    font-weight: normal;
  }
`

export default DigitalTime; 