import styled from "styled-components";

export const StyledThumbsUpLogo = styled.span`
  &:hover {
    ${(props) => props.userInSession && !props.tripDescription ? "cursor: pointer" : ""}
  }
`