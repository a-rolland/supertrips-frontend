import React from "react";
import experienceService from "../Services/experience-service";
import FormGeneral from "../FormGeneral/FormGeneral";

const AddExperienceForm = (props) => {
  const handleFormSubmit = (formObject) => {
    experienceService
      .newexperience(formObject)
      .then((response) => console.log("New experience created !", response))
      .catch((error) => console.log("Error while creating experience :", error));
    props.history.push({ pathname: `/trips/${props.match.params.id}`, state: { from: props.location, userInSession: props.userInSession } })
  };

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
    <div>
      <FormGeneral
        formTitle="Add a new experience to this step :"
        formSubmit={handleFormSubmit}
        formState={initialState}
        formInputs={formInputs}
        formButton="CREATE"
      />
    </div>
  );
};

export default AddExperienceForm;
