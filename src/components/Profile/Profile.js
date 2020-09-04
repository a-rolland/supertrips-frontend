import React from "react";
import Button from "../Button/Button.js";
import { Link } from "react-router-dom";
import { StyledProfile } from "./styles";

const Profile = (props) => {

  return (
    <StyledProfile>
      <h1>Profile</h1>
      <h2>Welcome to your profile, {props.userInSession.username} !</h2>
      <Link to="/profile/my-trips">
        <Button formButton="MY TRIPS" width={"250px"} />
      </Link>
      <Link to="/create-trip">
        <Button formButton="CREATE A NEW TRIP" width={"250px"} />
      </Link>
    </StyledProfile>
  );
};

export default Profile;
