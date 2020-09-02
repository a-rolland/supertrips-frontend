import React, { useState } from "react";
import tripService from "../Services/trip-service";
import stepService from "../Services/step-service";
import experienceService from "../Services/experience-service";
import { StyledCreateForm, Error } from "./styles"
import { Link } from "react-router-dom";
import FormGeneral from "../FormGeneral/FormGeneral";

const CreateFormGeneral = (props) => {
  const [showError, setShowError] = useState("")
  const handleFormSubmit = (formObject) => {
    const dynamicService = props.tripForm
      ? tripService.newTrip(formObject)
      : props.stepForm
      ? stepService.newStep(formObject)
      : experienceService.newExperience(formObject)
    dynamicService  
      .then((response) => {
        console.log(`New ${props.formType} created !`, response)
        props.tripForm
          ? props.history.push("/trips")
          : props.history.push(`/trips/${props.tripId}`)
      })
      .catch((error) => {
        console.log(`Error while getting ${props.formType} details :`, error)
        setShowError(error.response.data.message)
      });
  };

  return (
    <StyledCreateForm>
      <FormGeneral
        formTitle={`Create a new ${props.formType}`}
        formSubmit={handleFormSubmit}
        formState={props.initialState}
        formInputs={props.formInputs}
        formButton="CREATE"
      />
      { showError &&
        <Error>
          {showError}
        </Error>
      }
      <p><Link to={`/trips/${props.tripId}`}>Back</Link></p>
    </StyledCreateForm>
  );
};

export default CreateFormGeneral;
