import styled from "styled-components";

export const MapContainer = styled.div`
  @media (max-width: 667px) {
    width: ${(props) => props.tripMap ? "100%" : "300px"};
    height: 200px;
  }

  @media (min-width: 667px) {
    width: ${(props) => props.tripMap ? "100%" : "600px"};
    height: ${(props) => props.tripMap ? "300px" : "250px"};
  }

  @media (min-width: 992px) {
    width: ${(props) => props.tripMap ? "100%" : "800px"};
    height: ${(props) => props.tripMap ? "400px" : "300px"};
  }
`;