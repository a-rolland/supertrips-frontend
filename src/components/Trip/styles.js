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
  position: fixed;
  width: 100px;
  padding: 5px 5px 8px;
  background-color: white;
  margin: 0 auto;
  left: 0;
  right: 0;
  bottom: 40px;
  text-align: center;

  border-radius: 20px;
  background-color: white;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
`