import styled from "styled-components";

export const StyledStep = styled.div`
  @keyframes slide-left {
    0% {
      transform: translateX(calc(100% - 5px));
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }

  animation: slide-left 0.65s ease-in-out forwards;
`;

export const OwnerControls = styled.p`
  svg {
    margin: 0 10px;
  }
`

export const StyledStepHeader = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

export const Ul = styled.ul`
  margin: 0 auto;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Box = styled.div`
  margin: 0 auto;
`;

export const Li = styled.li`
  margin: 20px auto;
  text-align: left;
  display: flex;
  align-items: center;

  svg {
    margin: 0 10px;
    padding-top: 4px;
  }
`;