import styled from "styled-components";

export const VideoContainer = styled.div`
  position: relative;

  h2 {
    color: rgba(255, 255, 255, 0.8);
  }

  h2:first-of-type {
    position: absolute;
    left: 5%;
    top: 2%;
    font-size: 4vw;
  }

  h2:nth-of-type(2) {
    position: absolute;
    right: 5%;
    bottom: 2%;
    font-size: 4vw;
  }

  video {
    width: 100%;
  }

  form {
    position: absolute;
    height: 100px;
    width: 500px;
    left: 50%;
    margin-left: -250px;
    top: 50%;
    margin-top: -50px;

    @media (max-width: 768px) {
      width: 300px;
      margin-left: -150px;
    }

    @media (min-width: 992px) {
      width: 700px;
      margin-left: -350px;
    }
  }
`;

export const HomepageBody = styled.ul`
  padding: 0;

  h2 {
    text-align: left;
    padding-left: 40px;
    margin-bottom: 0;
  }
`;

export const CreateATrip = styled.div`
  position: relative;
  img {
    width: 100%;
    height: auto;
  }

  h2 {
    position: absolute;
    height: 50px;
    width: 300px;
    left: 50%;
    margin-left: -150px;
    top: 20%;
    margin-top: -20px;
    color: darkslategrey;
    font-size: 30px;
    background-color: rgba(176, 196, 222, 0.5);
    padding-top: 10px;
    border-radius: 4px;

    @media (max-width: 768px) {
      font-size: 24px;
      padding-top: 15px;
    }

    @media (min-width: 992px) {
      font-size: 40px;
      padding: 20px 5px;
    }
  }

  input {
    position: absolute;
    height: 50px;
    width: 500px;
    left: 50%;
    margin-left: -250px;
    top: 50%;
    margin-top: -30px;

    @media (max-width: 768px) {
      width: 300px;
      margin-left: -150px;
    }

    @media (min-width: 992px) {
      width: 700px;
      margin-left: -350px;
    }
  }
`;
