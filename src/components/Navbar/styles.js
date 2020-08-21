import styled, { css } from "styled-components";

export const Nav = styled.div`
    margin: 0;
    padding: 0;

    ul {
        display: flex;
        flex-direction: row;
        list-style-type: none;
        padding: 0 20px;
    }
`;

export const Li = styled.li`
    margin: 10px;

    ${props =>
    props.expandRight &&
    css`
    margin-right: auto;
    `};

    a {
        text-decoration: none;
    }
`;

// export const Li = styled.li`
//     margin: 10px;

//     ${props =>
//     props.expandRight &&
//     css`
//       margin-right: auto;
//     `};
// `;