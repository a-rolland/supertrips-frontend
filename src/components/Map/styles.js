import styled from "styled-components";

export const MapContainer = styled.div`
  ${(props) =>
    props.formMap &&
    "box-sizing: border-box; height: 200px; border-radius: 4px;"};

  @media (max-width: 600px) {
    ${(props) => props.tripMap && "width: 100%; height: 200px;"};
    ${(props) =>
      props.experienceMap && "width: 300px; height: 200px; margin: 0 auto;"};
  }

  @media (min-width: 576px) and (max-width: 667px) {
    ${(props) => props.tripMap && "width: 100%; height: 200px;"};
    ${(props) =>
      props.experienceMap && "width: 450px; height: 200px; margin: 0 auto;"};
  }

  @media (min-width: 667px) {
    ${(props) => props.tripMap && "width: 100%; height: 300px;"};
    ${(props) =>
      props.experienceMap && "width: 600px; height: 250px; margin: 0 auto;"};
  }

  @media (min-width: 992px) {
    ${(props) => props.tripMap && "width: 100%; height: 400px;"};
    ${(props) =>
      props.experienceMap && "width: 800px; height: 300px; margin: 0 auto;"};
  }
`;
