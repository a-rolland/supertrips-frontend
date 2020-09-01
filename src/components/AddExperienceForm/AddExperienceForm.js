import React, { useState } from "react";
import experienceService from "../Services/experience-service";
import FormGeneral from "../FormGeneral/FormGeneral";
import { Error } from "./styles"

const AddExperienceForm = (props) => {
  const [showError, setShowError] = useState("")
  const handleFormSubmit = (formObject) => {
    experienceService
      .newExperience(formObject)
      .then((response) => {
        props.history.push({ pathname: `/trips/${props.match.params.id}`, state: { from: props.location, userInSession: props.userInSession } })
        console.log("New experience created !", response)
      })
      .catch((error) => {
        console.log("Error while creating experience :", error)
        setShowError(error.response.data.message)
      });
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
      { showError &&
        <Error>
          {showError}
        </Error>
      }
    </div>
  );
};

export default AddExperienceForm;
