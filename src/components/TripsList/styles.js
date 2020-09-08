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
      margin-right: 20px;
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