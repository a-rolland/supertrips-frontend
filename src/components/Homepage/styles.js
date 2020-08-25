import styled from "styled-components";

export const Input = styled.input`
  width: 100px;
  padding: 14px 20px 12px;
  margin: 8px;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: white;

  &.btn {
    &:hover {
      cursor: pointer;
      background-color: lightsteelblue;
    }
  }
`;