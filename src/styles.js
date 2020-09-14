import styled from "styled-components";

export const StyledApp = styled.div`
  margin: 0;
  text-align: center;
  font-family: 'Roboto', 'Arial', 'Helvetica', sans-serif;
  color: darkslategray;

  a {
    color: darkslategray;

    &:hover {
      color: lightgrey;
    }
  }
`

export const Body = styled.div`
  @media (max-width: 768px) {
    padding-bottom: 60px;
  }
`