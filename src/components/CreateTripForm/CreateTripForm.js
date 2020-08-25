import React from "react";
import tripService from "../Services/trip-service";
import FormGeneral from "../FormGeneral/FormGeneral";

const CreateTripForm = (props) => {
  const handleFormSubmit = (formObject) => {
    console.log("LIFTED STATE :", formObject)
    tripService.newtrip(formObject)
      .then(response => 
        console.log("New trip created !", response)
      )
      .catch((error) => console.log(error));
    props.toggleForm()
  };

  const formInputs = [{
    label: "Title",
    type: "text",
    name: "title",
    placeholder: "Ex.: My magical trip to Paris"
  },
  {
    label: "Do you want to make it public ?",
    type: "checkbox",
    name: "isPublic",
  }]

  const initialState = {
    title: "",
    isPublic: false
  }

  return (
    <div>
      <FormGeneral formSubmit={handleFormSubmit} formState={initialState} formInputs={formInputs} formButton="CREATE" />
    </div>
  );
};

export default CreateTripForm;
