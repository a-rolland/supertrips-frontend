import styled from "styled-components";

export const StyledFooter = styled.div`
  background-color: white;
  width: 100%;
  height: 60px;
  position: fixed;
  bottom: 0px;

  @media (min-width: 768px) {
    display: none;
  }

  ul {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    list-style: none;
    border-top: 1px solid lightgrey;
    margin: 0 30px;
    padding: 0;
    align-items: center;
    height: 100%;
    justify-content: space-around;

    a {
      display: flex;
      flex-direction: column;
      text-decoration: none;

      img {
        align-self: center;
        height: 25px;
        width: 25px;
        margin-bottom: 5px;
      }
    }
  }
`