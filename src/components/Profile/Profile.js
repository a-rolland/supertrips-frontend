import React from "react";
import Button from "../Button/Button.js";
import { Link } from "react-router-dom";

const Profile = (props) => {

  return (
    <div>
      <h1>Profile</h1>
      <h2>Welcome to your profile, {props.userInSession.username} !</h2>
      <Link to="/create-trip">
        <Button formButton="CREATE TRIP" />
      </Link>
    </div>
  );
};

export default Profile;
