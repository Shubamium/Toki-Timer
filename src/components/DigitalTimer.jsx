import styled from "styled-components"

const DigitalTime = styled.p`

  color: ${props=> props.color || '#9466a1'};
  font-weight: bold;
  font-family: var(--mainFont);
  font-size: ${props => props.size || '2rem'};
  & .ms{
    font-size: small;
    font-weight: normal;
  }
`

export default DigitalTime; 