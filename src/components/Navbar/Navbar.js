import React, { useState, useEffect } from "react";
import authService from "../Services/auth-service";
import { Nav, Dropdown } from "./styles";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import Button from "../Button/Button";

const Navbar = (props) => {
  const initialState = { loggedInUser: null };
  const [state, setState] = useState(initialState);
  const [showDropdown, setShowDropdown] = useState(false)

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

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown)
  }

  return (
    <Nav>
      <h3>
        <Link to="/">Supertrips</Link>
      </h3>
      <span>
        { showDropdown
            ? <FontAwesomeIcon icon={faChevronDown} onClick={toggleDropdown} />
            : <FontAwesomeIcon icon={faChevronRight} onClick={toggleDropdown} />
        }
      </span>
      <Dropdown showDropdown={showDropdown ? "flex" : "none"}>
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
                <Button logoutUser={logoutUser} formButton="LOGOUT" />
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
      </Dropdown>
    </Nav>
  );
};

export default Navbar;
