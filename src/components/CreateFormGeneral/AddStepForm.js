import React from "react";
import CreateFormGeneral from "./CreateFormGeneral";

const AddStepForm = (props) => {
  const formInputs = [
    {
      label: "Title*",
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
      <CreateFormGeneral
        stepForm
        formType="step"
        formInputs={formInputs}
        initialState={initialState}
        tripId={props.match.params.id}
        {...props}
      />
  );
};

export default AddStepForm;
