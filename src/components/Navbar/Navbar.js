import React, { useState, useEffect } from "react";
import authService from "../Services/auth-service";
import { Nav, Dropdown, BrandLogo } from "./styles";
import { Link } from "react-router-dom";
import Button from "../ElementalComponents/Button/Button";
import FontAwesomeIconComponent from "../ElementalComponents/FontAwesomeIconComponent/FontAwesomeIconComponent";

const Navbar = (props) => {
  const initialState = { loggedInUser: null };
  const [state, setState] = useState(initialState);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropDownButtonColor, setDropdownButtonColor] = useState("grey");
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // equiv. componentWillReceiveProps
  useEffect(() => {
    // On each screen size change, check if the dropdown menu should be closed
    const getSize = () => {
      return {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    };
    const handleResize = () => setSize(getSize());
    window.addEventListener("resize", handleResize);
    size.width >= 767 && closeDropdown();
    setState({ loggedInUser: props.userInSession });
  }, [props.userInSession, size.width]);

  const logoutUser = () => {
    authService.logout().then(() => {
      setState({ loggedInUser: null });
      props.getUser(null);
    });
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  const toggleDropdownButtonColor = () => {
    dropDownButtonColor === "grey"
      ? setDropdownButtonColor("black")
      : setDropdownButtonColor("grey");
  };

  return (
    <Nav>
      <Link to="/" onClick={closeDropdown}>
        <BrandLogo src="/supertrips_logo_blue.png" alt="Supertrips" />
      </Link>
      {/* <Link to="/" onClick={closeDropdown}><BrandLogo src="/supertrips_logo_blue_ocre.png" alt="Supertrips" /></Link> */}
      <span>
        <FontAwesomeIconComponent
          chosenIcon={showDropdown ? "faTimes" : "faBars"}
          size="lg"
          color={dropDownButtonColor}
          handleMouseEnter={toggleDropdownButtonColor}
          handleMouseLeave={toggleDropdownButtonColor}
          toggleDropdown={toggleDropdown}
        />
      </span>
      <Dropdown
        userInSession={props.userInSession}
        showDropdown={showDropdown ? "flex" : "none"}
      >
        <li>
          <Link to="/trips" onClick={closeDropdown}>
            TRIPS
          </Link>
        </li>
        {state.loggedInUser ? (
          <>
            <li>
              <Link to="/profile" onClick={closeDropdown}>
                PROFILE
              </Link>
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
              <Link to="/signup" onClick={closeDropdown}>
                SIGNUP
              </Link>
            </li>
            <li>
              <Link to="/login" onClick={closeDropdown}>
                LOGIN
              </Link>
            </li>
          </>
        )}
      </Dropdown>
    </Nav>
  );
};

export default Navbar;
