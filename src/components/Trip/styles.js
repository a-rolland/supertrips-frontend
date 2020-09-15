import styled from "styled-components";

export const StyledTrip = styled.div`
  a {
    text-decoration: none;
  }

  svg {
    margin: 0 10px;
    padding-top: 4px;
  }

  span {
    h1 {
      display: inline-block;
    }

    svg {
      margin-left: 20px;
      padding-bottom: 2px;
    }
  }
`;

export const Duration = styled.div`
  margin: 20px auto;
`;

export const OwnerControls = styled.p`
  svg {
    margin: 0 10px;
  }
`;

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

export const Error = styled.p`
  color: red;
  border: solid red 1px;
  border-radius: 4px;
  max-width: 350px;
  padding: 5px 5px 8px;
  margin: 0 auto;
  background-color: rgba(241, 169, 160, 0.2);

  @media (min-width: 768px) {
    width: 350px;
    margin: 50px auto;
  }
`;
export const TripPicture = styled.img`
  width: 100%;
  max-width: 600px;
`;

export const LeaveCommentToggleLogo = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    color: lightgrey;
  }
`;

export const Comment = styled.li`
  list-style: none;
  background-color: rgba(0, 0, 0, 0.1);
  width: 300px;
  border-radius: 10px;
  margin: 10px auto;

  span {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    a {
      margin-right: 5px;
    }
  }

  p {
    font-weight: 300;
    font-style: italic;
    padding: 10px;
  }
`;
