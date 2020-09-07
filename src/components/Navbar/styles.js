import styled from "styled-components";

export const Nav = styled.div`
  @keyframes menu-transition {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  padding: 0;
  border-bottom: 1px solid lightgrey;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0;

  @media (max-width: 768px) {
    justify-content: space-between;
  }

  h3 {
    padding-bottom: 2px;  
    
    a {
      text-decoration: none;
    }
  }

  span {
    align-self: center;

    &:hover {
      cursor: pointer;
    }

    @media (min-width: 767px) {
      display: none;
    }
  }
`;

export const Dropdown = styled.ul`
  @media (max-width: 767px) {
    display: ${(props) => props.showDropdown};
    flex-direction: column;
    list-style-type: none;
    top: 50px;
    right: 0px;
    padding-left: 0;
    width: 200px;
    position: absolute;
    height: fit-content;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    animation-name: menu-transition;
    animation-duration: .3s;

    li {
      margin: ${props => props.margin || "10px auto"};
      list-style-type: none;
      display: flex;

      a {
        text-decoration: none;

        &:hover {
          color: lightgrey;
        }
      }
    }
  }

  @media (min-width: 767px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    list-style-type: none;
    padding: 0;
    width: 100%;

    li {
      margin: ${props => props.margin || "auto 10px auto 10px"};

      a {
        text-decoration: none;

        &:hover {
          color: lightgrey;
        }
      }
    }
  }
`;
