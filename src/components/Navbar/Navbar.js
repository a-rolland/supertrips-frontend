import React, { useState, useEffect  } from "react";
import authService from "../Services/auth-service";
import { Nav, Dropdown } from "./styles";
import { Link } from "react-router-dom";
import Button from "../ElementalComponents/Button/Button";
import FontAwesomeIconComponent from "../ElementalComponents/FontAwesomeIconComponent/FontAwesomeIconComponent";

const Navbar = (props) => {
  const initialState = { loggedInUser: null };
  const [state, setState] = useState(initialState);
  const [showDropdown, setShowDropdown] = useState(false)
  const [dropDownButtonColor, setDropdownButtonColor] = useState("grey")
  const [ size, setSize ] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  // equiv. componentWillReceiveProps
  useEffect(() => {
    // On each screen size change, check if the dropdown menu should be closed
    const getSize = () => {
      return {
        width: window.innerWidth,
        height: window.innerHeight
      };
    }
    size.width > 767 && closeDropdown()
    const handleResize = () => setSize(getSize())
    window.addEventListener('resize', handleResize)

    console.log("User In Session :", props.userInSession);
    setState({ loggedInUser: props.userInSession });
  }, [props.userInSession, size.width]);

  const logoutUser = () => {
    authService.logout().then(() => {
      setState({ loggedInUser: null });
      props.getUser(null);
    });
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown)
  }

  const closeDropdown = () => {
    setShowDropdown(false)
  }

  const toggleDropdownButtonColor = () => {
    dropDownButtonColor === "grey"
      ? setDropdownButtonColor("black")
      : setDropdownButtonColor("grey")
  }
    
  return (
    <Nav>
      <h3>
        <Link to="/" onClick={closeDropdown}>Supertrips</Link>
      </h3>
      <span>
        <FontAwesomeIconComponent
          chosenIcon={showDropdown ? "faTimes" : "faBars"}
          size="lg"
          color={dropDownButtonColor}
          handleMouseEnter={toggleDropdownButtonColor}
          handleMouseLeave={toggleDropdownButtonColor}
          handleClick={toggleDropdown}
        />
      </span>
      <Dropdown showDropdown={showDropdown ? "flex" : "none"}>
        <li style={showDropdown ? {margin:"20px auto"} : {margin:"auto auto auto 20px"} }>
          <Link to="/trips" onClick={closeDropdown}>Trips</Link>
        </li>
        {state.loggedInUser ? (
          <>
            <li>
              <Link to="/profile" onClick={closeDropdown}>Profile</Link>
            </li>
            <li>
              <Link to="/" onClick={closeDropdown}>
                <Button logoutUser={logoutUser} formButton="LOGOUT" />
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/signup" onClick={closeDropdown}>Signup</Link>
            </li>
            <li>
              <Link to="/login" onClick={closeDropdown}>Login</Link>
            </li>
          </>
        )}
      </Dropdown>
    </Nav>
  );
};

export default Navbar;
