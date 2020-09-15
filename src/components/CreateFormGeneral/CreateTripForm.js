import React from "react";
import CreateFormGeneral from "./CreateFormGeneral";

const CreateTripForm = (props) => {
  const formInputs = [
    {
      label: "Title*",
      type: "text",
      name: "title",
      placeholder: "Ex.: My magical trip to Paris",
    },
    {
      label: "Image",
      type: "file",
      name: "imageUrl",
    },
    {
      label: "Do you want to make it public ?",
      type: "checkbox",
      name: "isPublic",
    },
    {
      label: "Start Date*",
      type: "date",
      name: "startDate",
    },
    {
      label: "End Date*",
      type: "date",
      name: "endDate",
    },
  ];

  const initialState = {
    title: "",
    isPublic: false,
    startDate: "",
    endDate: "",
    imageUrl: "",
    archive: null,
  };

  return (
    <CreateFormGeneral
      tripForm
      formType="trip"
      formInputs={formInputs}
      initialState={initialState}
      {...props}
    />
  );
};

export default CreateTripForm;
