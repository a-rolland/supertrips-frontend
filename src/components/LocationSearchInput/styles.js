import styled from "styled-components";

export const Input = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;

  &.btn {
    &:hover {
      cursor: pointer;
      background-color: lightsteelblue;
    }
  }
`;

export const PlaceSuggestion = styled.div`
  width: 100%;
  padding: 8px 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  box-sizing: border-box;
`;
