import styled from "styled-components";

export const AddLogo = styled.span`
  @keyframes slide-up {
    0% {
      transform: translateY(calc(100% + 10px));
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  position: fixed;
  bottom: 50px;
  right: 90px;
  animation: slide-up 0.65s ease-in-out forwards;

  border-radius: 20px;
  background-color: white;
  padding: 8px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.1);

  a{
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;

    span {
      margin-top: 5px;
    }
  }

  @media (max-width: 767px) {
    bottom: 30px;
    right: 30px;
  }
`

export const SearchBarContainer = styled.div`
  margin: 0 20px;
`