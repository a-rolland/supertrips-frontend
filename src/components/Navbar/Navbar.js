import React, { useState, useEffect } from "react";
import authService from "../Services/auth-service";
import { Nav } from "./styles";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  const initialState = { loggedInUser: null };
  const [state, setState] = useState(initialState);

  // equiv. componentWillReceiveProps
  useEffect(() => {
    console.log("User In Session :", props.userInSession);
    setState({ loggedInUser: props.userInSession });
  }, [props.userInSession]);

  const logoutUser = () => {
    authService.logout().then(() => {
      setState({ loggedInUser: null });
      props.getUser(null);
    });
  };

  return (
    <Nav>
      <ul>
        <li>
          <Link to="/">Supertrips</Link>
        </li>
        <li style={{ marginRight: "auto" }}>
          <Link to="/trips">Trips</Link>
        </li>
        {state.loggedInUser ? (
          <>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/">
                <button onClick={() => logoutUser()}>Logout</button>
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </Nav>
  );
};

export default Navbar;
