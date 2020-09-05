import styled from "styled-components";

export const StyledProfilePicture = styled.div`
  display: ${(props) => props.display || "block"};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  background-image: url(${(props) => props.src});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50%;
`