import styled, { css } from "styled-components";

export const Nav = styled.div`
    margin: 0;
    padding: 0;
`;

export const Ul = styled.ul`
    display: flex;
    flex-direction: row;
    list-style-type: none;
    padding: 0 20px;
`;

export const Li = styled.li`
    margin: 10px;

    ${props =>
    props.expandRight &&
    css`
      margin-right: auto;
    `};
`;

export const A = styled.a`
    text-decoration: none;
`;