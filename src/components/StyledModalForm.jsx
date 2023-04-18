import styled from "styled-components";

const StyledModalForm = styled.form`
    
    & input {
        padding: .5em;
        width: 100%;
        margin: .4em 0;
        background-color: #eef9ff8b;
        border: none;
        border-bottom:2px solid #C0DBEA;
        outline: none;
        transition: all 250ms ease;
    }
    & input:focus{
        border-bottom:2px solid #E8A0BF;
        padding-bottom: 1em;
        outline: 1px solid #ffb0b9;
    }

    & input::placeholder{
        font-weight: lighter;
        opacity: .2;
    }

    & .stack {
        display: flex;
        gap: 1em;
    }
`

export default StyledModalForm;