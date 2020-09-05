import styled from "styled-components";

export const StyledExperience = styled.div`
  @keyframes slide-up {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  animation: slide-up 0.65s ease-in-out forwards;
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
  margin: 10px;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  svg {
    margin: 0 10px;
    padding-top: 4px;
  }
`;

export const StyledDateTime = styled.span`
  margin: 15px 5px 5px 40px;
  display: block;
  opacity: ${(props) => props.opacity};
`