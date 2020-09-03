import styled from "styled-components";

export const MapContainer = styled.div`
  width: ${(props) => props.width || "500px"};
  height: ${(props) => props.height || "200px"};

  @media (max-width: 667px) {
    width: 300px;
    height: 200px;
  }
`;