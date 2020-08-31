import React, { useState, useEffect  } from "react";
import authService from "../Services/auth-service";
import { Nav, Dropdown } from "./styles";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import Button from "../Button/Button";

const Navbar = (props) => {
  const initialState = { loggedInUser: null };
  const [state, setState] = useState(initialState);
  const [showDropdown, setShowDropdown] = useState(false)
  const [dropDownButtonColor, setDropdownButtonColor] = useState("grey")

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

  const toggleDropdownButtonColor = () => {
    dropDownButtonColor === "grey"
      ? setDropdownButtonColor("black")
      : setDropdownButtonColor("grey")
  }
    
  return (
    <Nav>
      <h3>
        <Link to="/" onClick={showDropdown && toggleDropdown}>Supertrips</Link>
      </h3>
      <span>
        <FontAwesomeIcon
          icon={ showDropdown ? faTimes : faBars}
          size="lg"
          color={dropDownButtonColor}
          onMouseEnter={toggleDropdownButtonColor}
          onMouseLeave={toggleDropdownButtonColor}
          onClick={toggleDropdown} 
        />
      </span>
      <Dropdown showDropdown={showDropdown ? "flex" : "none"}>
        <li style={showDropdown ? {margin:"20px auto"} : {margin:"auto auto auto 20px"} }>
          <Link to="/trips" onClick={showDropdown && toggleDropdown}>Trips</Link>
        </li>
        {state.loggedInUser ? (
          <>
            <li>
              <Link to="/profile" onCLick={showDropdown && toggleDropdown}>Profile</Link>
            </li>
            <li>
              <Link to="/" onClick={showDropdown && toggleDropdown}>
                <Button logoutUser={logoutUser} formButton="LOGOUT" />
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/signup" onClick={showDropdown && toggleDropdown}>Signup</Link>
            </li>
            <li>
              <Link to="/login" onClick={showDropdown && toggleDropdown}>Login</Link>
            </li>
          </>
        )}
      </Dropdown>
    </Nav>
  );
};

export default Navbar;
