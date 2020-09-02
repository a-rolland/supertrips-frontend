import styled from "styled-components";

export const StyledTrip = styled.div`
  a {
    text-decoration: none;
  }
`
export const OwnerControls = styled.p`
  svg {
    margin: 0 10px;
  }
`

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

export const Back = styled.p`
  position: absolute;
  margin: 0 auto;
  left: 0;
  right: 0;
  bottom: 40px;
  text-align: center;
`