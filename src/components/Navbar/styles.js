import styled from "styled-components";

export const Nav = styled.div`
  margin: 0 40px;
  padding: 0;
  border-bottom: 1px solid lightgrey;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0;

  @media (max-width: 767px) {
    justify-content: space-between;
  }

  h3 {
    a {
      text-decoration: none;
    }
  }

  span {
    @media (min-width: 768px) {
      display: none;
    }
  }
`;

export const Dropdown = styled.ul`
  @media (max-width: 767px) {
    display: ${(props) => props.showDropdown};
    flex-direction: column;
    align-items: flex-start;
    list-style-type: none;
    padding: 0;

    li {
      margin: auto 10px auto 10px;

      input {
        margin: 0;
        padding: 10px 16px 8px;
      }

      a {
        text-decoration: none;

        &:hover {
          color: lightgrey;
        }
      }
    }
  }

  @media (min-width: 768px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    list-style-type: none;
    padding: 0;
    width: 100%;

    li {
      margin: auto 10px auto 10px;

      input {
        margin: 0;
        padding: 10px 16px 8px;
      }

      a {
        text-decoration: none;

        &:hover {
          color: lightgrey;
        }
      }
    }
  }
`;
