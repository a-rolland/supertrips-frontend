import styled from "styled-components";

export const Nav = styled.div`
  margin: 0 40px;
  padding: 0;
  border-bottom: 1px solid lightgrey;

  ul {
    display: flex;
    flex-direction: row;
    list-style-type: none;
    padding: 0;

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
