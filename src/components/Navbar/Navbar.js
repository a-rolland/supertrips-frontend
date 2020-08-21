import React, { useState, useRef, useEffect } from 'react';
import service from '../Services/auth-service';
import { Nav, Li } from "./styles";
import { Link } from 'react-router-dom'

const Navbar = props => {

    const initialState = { loggedInUser: null }
    const [state, setState] = useState(initialState)

    // CHECK --> ComponentWillReceiveProps
    const isFirstRun = useRef(true);
    
    useEffect (() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        console.log('User In Session :', props.userInSession);
        setState({loggedInUser: props.userInSession})
    }, [props.userInSession]);

    const logoutUser = () => {
        service.logout()
        .then(() => {
          setState({ loggedInUser: null });
          props.getUser(null);  
        })
    }

    return (
        <Nav>
            <ul>
                <Li><Link to="/">Supertrips</Link></Li>
                <Li expandRight><Link to="/trips">Trips</Link></Li>
                {
                    state.loggedInUser ?
                        <Li>
                            <Link to='/'>
                                <button onClick={() => logoutUser()}>Logout</button>
                            </Link>
                        </Li>
                    :
                    <>
                        <Li><Link to="/signup">Signup</Link></Li>
                        <Li><Link to="/login">Login</Link></Li>
                    </>
                }
            </ul>
        </Nav>
    )
}

export default Navbar
