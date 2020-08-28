import React from "react";
import stepService from "../Services/step-service";
import FormGeneral from "../FormGeneral/FormGeneral";

const AddStepForm = (props) => {
  const handleFormSubmit = (formObject) => {
    stepService
      .newstep(formObject)
      .then((response) => console.log("New step created !", response))
      .catch((error) => console.log("Error while creating step :", error));
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
        formTitle="Add a new step to this trip :"
        formSubmit={handleFormSubmit}
        formState={initialState}
        formInputs={formInputs}
        formButton="CREATE"
      />
    </div>
  );
};

export default AddStepForm;
