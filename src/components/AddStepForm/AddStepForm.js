import React from "react";
// import tripService from "../Services/trip-service";
import stepService from "../Services/step-service";
import FormGeneral from "../FormGeneral/FormGeneral";

const AddStepForm = (props) => {
  const handleFormSubmit = (formObject) => {
    // CREATE STEP SERVICE WITH CREATE STEP
    stepService
      .newstep(formObject)
      .then((response) => console.log("New step created !", response))
      .catch((error) => console.log("Error while creating trip :", error));
    props.history.push({ pathname: `/trips/${props.location.state.trip._id}`, state: { from: props.location, userInSession: props.userInSession } })
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
    <div>
      <FormGeneral
        formSubmit={handleFormSubmit}
        formState={initialState}
        formInputs={formInputs}
        formButton="CREATE"
      />
    </div>
  );
};

export default AddStepForm;
