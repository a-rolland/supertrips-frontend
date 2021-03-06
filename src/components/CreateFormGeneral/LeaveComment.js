import React from "react";
import FormGeneral from "../FormGeneral/FormGeneral";
import tripService from "../Services/trip-service";

const LeaveComment = (props) => {
  const handleFormSubmit = (formObject) => {
    const { params } = props.match;
    tripService
      .postComment(params.id, formObject)
      .then(() => {
        props.closeLeavingComment();
        props.updateTrips();
      })
      .catch(() => console.log("Error while leaving a comment"));
  };

  const formInputs = [
    {
      type: "textarea",
      name: "comment",
      placeholder: "Type here ..",
    },
  ];

  const initialState = {
    comment: "",
  };

  return (
    <FormGeneral
      comment
      formSubmit={handleFormSubmit}
      formState={initialState}
      formInputs={formInputs}
      formButton="POST"
    />
  );
};

export default LeaveComment;
