import React, { useState, useCallback } from "react";
import Button from "../ElementalComponents/Button/Button.js";
import { Link } from "react-router-dom";
import { StyledProfile } from "./styles";
import EditProfilePictureForm from "../EditFormGeneral/EditProfilePictureForm"
import authService from "../Services/auth-service.js";
import ProfilePicture from "../ElementalComponents/ProfilePicture/ProfilePicture.js";

const Profile = (props) => {
  const [userState, setUserState] = useState({ loggedInUser: props.userInSession})
  const [showProfilePictureForm, setShowProfilePictureForm] = useState(false)

  const toggleProfilePictureForm = () => {
    setShowProfilePictureForm(!showProfilePictureForm)
  }

  const closeProfilePictureForm = () => {
    setShowProfilePictureForm(false)
  }

  const updateProfilePicture = useCallback(() => 
    authService.loggedIn()
      .then(response => {
        closeProfilePictureForm()
        setUserState({loggedInUser: response})
      })
      .catch(error => console.log("Error updating profile picture: ", error))
  , []);

  return (
    <StyledProfile>
      <h1>Profile</h1>
      <ProfilePicture src={userState.loggedInUser.profilePicture} width="150px" height="150px" margin="0 auto 20px" />
      { showProfilePictureForm &&
        <EditProfilePictureForm updateProfilePicture={updateProfilePicture} {...props} />
      }
      <Button formButton={ showProfilePictureForm ? "CLOSE" : "EDIT" } toggleProfilePictureForm={toggleProfilePictureForm} />
      <h2>Welcome to your profile, {props.userInSession.username} !</h2>
      <Link to="/profile/my-trips">
        <Button formButton="MY TRIPS" width={"250px"} />
      </Link>
      <Link to="/profile/favorite-trips">
        <Button formButton="FAVORITE TRIPS" width={"250px"} />
      </Link>
      <Link to="/create-trip">
        <Button formButton="CREATE A NEW TRIP" width={"250px"} />
      </Link>
    </StyledProfile>
  );
};

export default Profile;
