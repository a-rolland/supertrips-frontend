import styled from "styled-components";

export const StyledTrip = styled.div`
  a {
    text-decoration: none;
  }

  svg {
    margin: 0 10px;
    padding-top: 4px;
  }

  img {
    max-height: 300px;
    width: auto;
  }
`

export const Duration = styled.div`
  margin: 20px auto;
`

export const OwnerControls = styled.p`
  svg {
    margin: 0 10px;
  }
`

export const Ul = styled.ul`
  margin: 20px auto;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Box = styled.div`
  margin: 0 auto;
  width: 100%;
`;

export const Li = styled.li`
  margin: 20px;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  svg {
    margin: 0 10px;
    padding-top: 4px;
  }
`;