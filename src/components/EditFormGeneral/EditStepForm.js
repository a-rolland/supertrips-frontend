import React, { useState, useEffect } from "react";
import stepService from "../Services/step-service";
import EditFormGeneral from "./EditFormGeneral";

const EditStepForm = (props) => {
  const [stepState, setStepState] = useState({});

  useEffect(() => {
    stepService
      .stepDetails(props.match.params.stepId)
      .then((response) => {
        setStepState(response);
      })
      .catch(() => console.log("Error while getting step details"));
  }, [props.match.params.stepId]);

  const formInputs = [
    {
      label: "Title*",
      type: "text",
      name: "title",
      value: stepState.title,
      placeholder: "Ex.: My magical trip to Paris",
    },
  ];

  return (
    <EditFormGeneral
      stepForm
      formType="step"
      formInputs={formInputs}
      formTitle={`Edit "${stepState.title}"`}
      step={stepState}
      {...props}
    />
  );
};

export default EditStepForm;
