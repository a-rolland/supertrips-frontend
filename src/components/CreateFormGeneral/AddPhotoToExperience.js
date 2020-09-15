import React from "react";
import CreateFormGeneral from "./CreateFormGeneral";

const AddPhotoToExperience = (props) => {
  const formInputs = [
    {
      label: "New photo (max. 10 Mo)",
      type: "file",
      name: "imageUrl",
    },
  ];

  const initialState = {
    imageUrl: "",
    archive: null,
  };

  return (
    <CreateFormGeneral
      addPhotoToExperience
      formType="experience photo"
      formInputs={formInputs}
      initialState={initialState}
      tripId={props.match.params.id}
      experienceId={props.experienceId}
      closeShowAddPhoto={props.closeShowAddPhoto}
      handleUpdateNewPicture={props.updateNewPicture}
      {...props}
    />
  );
};

export default AddPhotoToExperience;
