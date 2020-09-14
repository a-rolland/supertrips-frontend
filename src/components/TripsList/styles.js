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
  ${(props) => props.popularTrips && 
    "display: flex; flex-direction: row; width: 100%; align-items: flex-start; overflow-x: scroll"
  }
`;

export const Li = styled.li`
  margin: 40px 0;
  text-align: left;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  ${(props) => props.popularTrips && 
    "margin: 40px;"
  }

  @media (max-width: 767px) {
    justify-content: center;
  }

  svg {
    margin: 0 10px 0 0;
    padding-top: 4px;
  }

  a {
    text-decoration: none;
  }
`;

export const TripContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  ${(props) => props.popularTrips && 
    "display: flex; flex-direction: column; align-items: flex-start;"
  }

  @media (max-width: 767px) {
    display: flex;
    flex-direction: column;
  }

  img {
    @keyframes slow-popup {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }

    height: auto;
    width: 300px;
    max-width: 400px;
    min-width: 125px;
    margin-right: 40px;
    animation: slow-popup 0.5s ease-in-out forwards;

    @media (max-width:768px) {
      margin-right: 0;
      height: auto;
      width: 100%;
    }

    @media (min-width: 992px) {
      height: auto;
      width: 400px;
      margin-right: 40px;
    }
  }
`

export const SinglePictureContainer = styled.div`
  position: relative;
  text-align: center;
  
  a {
    img {
      @keyframes slow-popup {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }

      height: auto;
      width: 300px;
      max-width: 400px;
      margin-right: 40px;
      animation: slow-popup 0.5s ease-in-out forwards;

      @media (max-width:768px) {
        margin-right: 0;
        height: auto;
        width: 100%;
      }

      @media (min-width: 992px) {
        height: auto;
        width: 400px;
        margin-right: 40px;
      }
    }
  }

  svg {
    position: absolute;
    bottom: 20px;
    left: 15px;
    background-color: rgba(255,255,255,.6);
    border: 1px solid rgba(0,0,0,0.2);
    border-radius: 25%;
    padding: 10px;

    &:hover {
      cursor: pointer;
    }
  }
`

export const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  ${(props) => props.popularTrips && 
    "justify-content: flex-start; align-items: flex-start"
  }

  @media (max-width: 767px) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
`

export const TripTitle = styled.span`
  margin: 0 auto;

  h3 {
    display: inline-block;

    @media (min-width: 992px) {
      font-size: 26px;
    }
  }

  span {
    margin-left: 10px;
  }
`

export const LowerPart = styled.div`
  width: 100%;
  @media (max-width: 767px) {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    align-content: center;
    ${(props) => props.popularTrips && 
      "flex-direction: column; flex-start; align-items: flex-start"
    }
  }

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    align-content: center;
    margin: 15px 0;
    ${(props) => !props.popularTrips && 
      "margin: 10px 0"
    }

    @media (max-width: 767px) {
      margin: 2px 0;
    }
  }

  div:nth-of-type(1) {
    svg {
      margin-right: 18px;
      ${(props) => !props.popularTrips && 
        "padding: 0"
      }
    }
  }

  div:nth-of-type(2) {
    span {
      margin-right: 5px;
      
      svg {
        ${(props) => !props.popularTrips && 
          "padding: 0"
        }
      }
    }
  }

  div:nth-of-type(3) {
    div {
      margin: 0 10px 0 0;

    }
  }

  a {
    display: inline-block;
  }
`