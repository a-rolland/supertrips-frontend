import React, { useState } from "react";
import stepService from "../Services/step-service";
import FormGeneral from "../FormGeneral/FormGeneral";
import { StyledAddStepForm, Error } from "./styles"
import { Link } from "react-router-dom";

const AddStepForm = (props) => {
  const [showError, setShowError] = useState("")
  const handleFormSubmit = (formObject) => {
    stepService
      .newStep(formObject)
      .then((response) => {
        console.log("New step created !", response)
        props.history.push({ pathname: `/trips/${props.location.state.trip._id}`, state: { from: props.location, userInSession: props.userInSession } })
      })
      .catch((error) => {
        console.log("Error while creating step :", error)
        setShowError(error.response.data.message)
      });
  };

  const formInputs = [
    {
      label: "Title",
      type: "text",
      name: "title",
      placeholder: 'Ex.: "First day - London South and East"'
    }
  ];

  const initialState = {
    title: "",
    trip: props.location.state.trip._id
  };

  return (
    <StyledAddStepForm>
      <FormGeneral
        formTitle="Add a new step to this trip :"
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
      <p><Link to={`/trips/${props.match.params.id}`}>Back</Link></p>
    </StyledAddStepForm>
  );
};

export default AddStepForm;
