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
  margin: 0 40px;

  @media (max-width: 768px) {
    justify-content: space-between;
    margin: 0 20px;
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
    top: 65px;
    right: 0px;
    padding-left: 0;
    width: 200px;
    position: absolute;
    z-index: 2;
    height: fit-content;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    animation-name: menu-transition;
    animation-duration: .3s;
    font-size: 12px;

    li {
      margin: ${props => props.margin || "10px auto"};
      list-style-type: none;
      display: flex;

      a {
        text-decoration: none;
      }
    }
  }

  @media (max-width: 576px) {
    top: 48px;
  }
  
  @media (min-width: 576) and (max-width: 768px) {
    top: 72px;
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
      font-weight: 400;

      a {
        text-decoration: none;
      }
    }
  }

  @media (min-width: 992px) {

    li {
      padding-top: 6px;

      a {
        font-size: 18px;
      }
    }
  }
`;

export const BrandLogo = styled.img`
  padding-top: 6px;

  @media (max-width: 576px) {
    width: 125px;
    margin: 10px 10px 10px 0;
  }

  @media (min-width: 576px) and (max-width: 767px) {
    width: 150px;
    margin: 15px 15px 15px 0;
  }
  
  @media (min-width: 767px) and (max-width: 992px) {
    width: 175px;
    margin: 15px 15px 15px 0;
  }

  @media (min-width: 992px) {
    width: 200px;
    margin: 25px 25px 25px 0;
  }


`
