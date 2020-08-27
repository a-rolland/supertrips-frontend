import React, { useState, useEffect} from "react";
// import tripService from "../Services/trip-service";
import stepService from "../Services/step-service";
import FormGeneral from "../FormGeneral/FormGeneral";

const EditStepForm = (props) => {
  const [state, setState] = useState({})

  useEffect(() => {
    stepService
      .stepDetails(props.match.params.stepId)
      .then(response => {
        setState(response);
      })
      .catch((error) =>
        console.log("Error while getting step details :", error)
      );
  }, [props.match.params.stepId]);

  const handleFormSubmit = (formObject) => {
    const { params } = props.match;
    stepService
      .editStep(params.stepId, formObject)
      .then((response) => {
        console.log("Step edited !", response);
        props.history.push({
          pathname: `/trips/${params.id}`,
        });
      })
      .catch((error) => console.log("Error while editing step :", error));
  };

  const formInputs = [
    {
      label: "Title",
      type: "text",
      name: "title",
      value: state.title,
      placeholder: "Ex.: My magical trip to Paris",
    }
  ];

  return (
    <div>
      <FormGeneral
        formSubmit={handleFormSubmit}
        formState={state}
        formInputs={formInputs}
        formButton="SAVE"
      />
    </div>
  );
};

export default EditStepForm;
