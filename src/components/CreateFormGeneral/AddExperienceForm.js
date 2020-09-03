import React from "react";
import CreateFormGeneral from "./CreateFormGeneral";

const AddExperienceForm = (props) => {
  const formInputs = [
    {
      label: "Title*",
      type: "text",
      name: "title",
      placeholder: 'Ex.: "Dinner in Camden Town"'
    },
    {
      label: "Description",
      type: "textarea",
      name: "description",
      placeholder: 'Ex.: "This restaurant was absolutely incredible !"'
    },
    {
      label: "Find the place",
      type: "text",
      name: "place",
      placeholder: 'Ex: "Paris..."'
    }
  ];

  const initialState = {
    title: "",
    step: props.match.params.stepId,
    description: "",
    place: {}
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
