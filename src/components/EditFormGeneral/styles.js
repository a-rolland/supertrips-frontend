import styled from "styled-components";

export const StyledEditForm = styled.div`
  a {
    text-decoration: none;
  }
`;

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

export const Loading = styled.div`
  margin: 40px;
`;
