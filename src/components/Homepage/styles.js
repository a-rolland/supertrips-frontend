import styled from "styled-components";

export const VideoContainer = styled.div`
  position: relative;

  h2 {
    color: rgba(255,255,255,.8);
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
`