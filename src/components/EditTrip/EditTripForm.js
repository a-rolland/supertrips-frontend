import React from "react";
import tripService from "../Services/trip-service";
import FormGeneral from "../FormGeneral/FormGeneral";

const EditTripForm = (props) => {
  const initialState = props.location.state.trip

  const handleFormSubmit = (formObject) => {
    const { params } = props.match;
    tripService.editTrip(params.id, formObject)
      .then(response => {
          console.log("Trip edited !", response)
          props.history.push({ pathname: `/trips/${params.id}`, state: {userInSession: props.userInSession, trip: props.location.state.trip} })
        }
      )
      .catch((error) => console.log("Error while editing trip :", error)); 
  };

  const formInputs = [{
    label: "Title",
    type: "text",
    name: "title",
    value: initialState.title,
    placeholder: "Ex.: My magical trip to Paris"
  },
  {
    label: "Do you want to make it public ?",
    type: "checkbox",
    value: initialState.isPublic,
    checked: initialState.isPublic,
    name: "isPublic",
  }]

  return (
    <div>
      <FormGeneral formSubmit={handleFormSubmit} formState={initialState} formInputs={formInputs} />
    </div>
  );
};

export default EditTripForm;
