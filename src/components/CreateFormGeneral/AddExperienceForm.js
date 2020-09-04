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
      label: "Date*",
      type: "date",
      name: "date",
    },
    {
      label: "Time*",
      type: "time",
      name: "time"
    },
    {
      label: "Make date/time public ? (Hidden by default)",
      type: "checkbox",
      name: "showDateTime",
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
    date: "",
    time: "",
    showDateTime: false,
    step: props.match.params.stepId,
    description: "",
    place: null
  };

  return (
    <>
      <CreateFormGeneral
        experienceForm
        formType="experience"
        formInputs={formInputs}
        initialState={initialState}
        tripId={props.match.params.id}
        {...props}
      />
    </>
  );
};

export default AddExperienceForm;
