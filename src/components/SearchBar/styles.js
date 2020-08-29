import styled from "styled-components";

export const Search = styled.input`
  padding: 12px 20px;
  border: 1px solid lightgrey;
  margin: 8px 0 24px;
  font-size: 17px;
  border-radius: 4px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 100%;
    margin: 8px 20px 24px
  }
`;
