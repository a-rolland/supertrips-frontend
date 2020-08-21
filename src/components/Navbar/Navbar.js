import React from 'react'
import { Nav, Ul, Li, A } from "./styles";

function Navbar() {
    return (
        <Nav>
            <Ul>
                <Li><a href="#">Supertrips</a></Li>
                <Li expandRight><a href="#">Trips</a></Li>
                <Li><a href="#">Signup</a></Li>
                <Li><a href="#">Logout</a></Li>
            </Ul>
        </Nav>
    )
}

export default Navbar
