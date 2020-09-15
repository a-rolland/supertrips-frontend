import styled from "styled-components";

export const StyledTrips = styled.div`
  margin: 0 20px;

  ul {
    ${(props) => props.searchTrips && "padding: 0;"}
    ${(props) => props.myFavoriteTrips && "padding: 0;"}
  }
`;
