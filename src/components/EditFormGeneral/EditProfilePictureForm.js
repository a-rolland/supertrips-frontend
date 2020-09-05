import React, { useState, useEffect} from "react";
import authService from "../Services/auth-service";
import EditFormGeneral from "./EditFormGeneral";

const EditProfilePictureForm = (props) => {
  const [userState, setUserState] = useState({})

  useEffect(() => {
    authService
      .loggedIn()
      .then(response => {
        setUserState(response)
      })
      .catch((error) =>
        console.log("Error while getting user details :", error)
      );
  }, []);

  const formInputs = [
    {
      type: "file",
      value: "",
      name: "profilePicture"
    }
  ];

  return (
    <EditFormGeneral
      profilePictureForm
      formType="profile picture"
      formInputs={formInputs}
      formTitle={"Edit Profile Picture"}
      updateProfilePicture={props.updateProfilePicture}
      user={userState}
      {...props}
    />
  );
};

export default EditProfilePictureForm;
