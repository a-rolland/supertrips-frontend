import React from "react";
import { Link } from "react-router-dom";
import { StyledFooter } from "./styles";

const Footer = (props) => {
  return (
    <StyledFooter>
      <ul>
        <li>
          <Link to="/trips">
            <img src="/travel_icon_3.png" alt="Trip icon" />
            Trips
          </Link>
        </li>
        <li>
          {props.userInSession ? (
            <Link to="/profile">
              <img
                src={props.userInSession.profilePicture}
                alt="Profile icon"
              />
              Profile
            </Link>
          ) : (
            <Link to="/login">
              <img src="/profile_icon.png" alt="Login icon" />
              Login
            </Link>
          )}
        </li>
        {props.userInSession && (
          <li>
            <Link to="/create-trip">
              <img src="/add_icon.png" alt="Profile icon" />
              New
            </Link>
          </li>
        )}
      </ul>
    </StyledFooter>
  );
};

export default Footer;
