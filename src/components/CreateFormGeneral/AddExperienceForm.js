import React from "react";
import CreateFormGeneral from "./CreateFormGeneral";

const AddExperienceForm = (props) => {
  const formInputs = [
    {
      label: "Title",
      type: "text",
      name: "title",
      placeholder: 'Ex.: "Dinner in Camden Town"'
    }
  ];

  const initialState = {
    title: "",
    step: props.match.params.stepId
  };

  return (
    <CreateFormGeneral
      experienceForm
      formType="experience"
      formInputs={formInputs}
      initialState={initialState}
      tripId={props.match.params.id}
      {...props}
    />
  );
};

export default AddExperienceForm;
