import styled from "styled-components";

export const Ul = styled.ul`
  margin: 0 auto;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LiContainer = styled.div`
  margin: 0 auto;
`;

export const Li = styled.li`
  margin: 40px;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  svg {
    margin: 0 10px;
    padding-top: 4px;
  }

  a {
    text-decoration: none;
  }
`;
