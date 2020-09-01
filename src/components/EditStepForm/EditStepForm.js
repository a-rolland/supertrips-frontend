import React, { useState, useEffect} from "react";
import stepService from "../Services/step-service";
import FormGeneral from "../FormGeneral/FormGeneral";
import Button from "../Button/Button";
import { Error } from "./styles"

const EditStepForm = (props) => {
  const [stepState, setStepState] = useState({})
  const [showDeleteStepConfirmation, setShowDeleteStepConfirmation] = useState(
    false
  );
  const [showError, setShowError] = useState("")

  const toggleDeleteStepConfirmation = () =>
    setShowDeleteStepConfirmation(!showDeleteStepConfirmation);

  useEffect(() => {
    stepService
      .stepDetails(props.match.params.stepId)
      .then(response => {
        setStepState(response);
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
      .catch((error) => {
        console.log("Error while editing step :", error.response.data.message)
        setShowError(error.response.data.message)
      });
  };

  const formInputs = [
    {
      label: "Title",
      type: "text",
      name: "title",
      value: stepState.title,
      placeholder: "Ex.: My magical trip to Paris",
    }
  ];

  const deleteStep = () => {
    const { params } = props.match;
    stepService
      .deleteStep(params.stepId)
      .then(() => {
        props.history.push(`/trips/${params.id}`);
      })
      .catch((err) => {
        console.log("Error while deleting step: ", err);
      });
  };

  return (
    <div>
      <FormGeneral
        formSubmit={handleFormSubmit}
        formState={stepState}
        formInputs={formInputs}
        formButton="SAVE"
      />
      <Button
        toggleDeleteStepConfirmation={toggleDeleteStepConfirmation}
        formButton="DELETE"
        theme="lightcoral"
        color="white"
      />
      {showDeleteStepConfirmation && (
        <>
          <h4>Are you sure you want to delete this step ? </h4>
          <Button
            deleteStep={deleteStep}
            formButton="YES"
            theme="lightcoral"
            color="white"
          />
          <Button
            toggleDeleteStepConfirmation={toggleDeleteStepConfirmation}
            formButton="CANCEL"
            theme="lightgrey"
            color="black"
          />
        </>
      )}
      { showError &&
        <Error>
          {showError}
        </Error>
      }
    </div>
  );
};

export default EditStepForm;
