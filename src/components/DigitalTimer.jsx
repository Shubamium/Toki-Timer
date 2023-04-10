import styled from "styled-components"

const DigitalTime = styled.p`

  color: ${props=> props.color || '#000000'};
  font-weight: bold;
  font-family: var(--mainFont);
  font-size: 2rem;
  & .ms{
    font-size: small;
    font-weight: normal;
    color: #272727;
  }
`

export default DigitalTime; 