import styled from "styled-components";

export const Error = styled.p`
  color: red;
  border: solid red 1px;
  border-radius: 4px;
  max-width: 350px;
  padding: 5px 5px 8px;
  margin: 0 auto;
  background-color: rgba(241, 169, 160, 0.2);

  @media (min-width: 768px) {
    width: 350px;
    margin: 0 auto;
  }
`;

export const FacebookLoginStyled = styled.p`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 50px;

  svg {
    margin: 0 20px 0 0;
  }

  @media (max-width: 667px) {
    flex-direction: column;

    svg {
      margin: 20px;
    }
  }
`;
