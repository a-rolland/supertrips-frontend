import styled from "styled-components";

export const Form = styled.form`
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
  margin: 20px auto;
  max-width: 350px;
`;

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

export const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  resize: none;

  &.btn {
    &:hover {
      cursor: pointer;
      background-color: lightsteelblue;
    }
  }
`;
