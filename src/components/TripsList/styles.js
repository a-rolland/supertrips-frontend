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
  margin: 40px;
  text-align: left;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

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
    "display: flex; flex-direction: column; align-items: center;"
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

  div {
    @media (max-width: 767px) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    a {
      display: inline-block;
    }

    h3 {
      margin-right: 20px;
      
      @media (min-width: 992px) {
        font-size: 26px;
      }
    }

    div {
      @media (max-width: 767px) {
        display: flex;
        flex-direction: row;
        justify-content: center;
      }

      a {
        display: inline-block;
      }
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