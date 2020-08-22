import styled from "styled-components";

export const Nav = styled.div`
  margin: 0;
  padding: 0;

  ul {
    display: flex;
    flex-direction: row;
    list-style-type: none;
    padding: 0 20px;

    li {
      margin: 10px;

      a {
        text-decoration: none;

        &:hover {
          color: lightgrey;
        }
      }
    }
  }
`;
