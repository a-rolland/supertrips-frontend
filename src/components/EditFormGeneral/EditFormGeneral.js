import React, { useState, useEffect} from "react";
import tripService from "../Services/trip-service";
import stepService from "../Services/step-service";
import experienceService from "../Services/experience-service";
import FormGeneral from "../FormGeneral/FormGeneral";
import Button from "../Button/Button";
import { StyledEditForm, Error } from "./styles"
import { Link } from "react-router-dom";

const EditFormGeneral = (props) => {
  const [state, setState] = useState({})
  const [showDeleteConfirmation, setshowDeleteConfirmation] = useState(
    false
  );
  const [showError, setShowError] = useState("")

  const toggleDeleteConfirmation = () =>
    setshowDeleteConfirmation(!showDeleteConfirmation);

  useEffect(() => {
    const { params } = props.match;
    const dynamicService = props.tripForm
      ? tripService.tripDetails(params.id)
      : props.stepForm
      ? stepService.stepDetails(params.stepId)
      : experienceService.experienceDetails(params.experienceId)
      
    dynamicService  
      .then(response => {
        setState(response)
      })
      .catch((error) =>
        console.log(`Error while getting ${props.formType} details :`, error)
      );
  }, [props.formType, props.stepForm, props.tripForm, props.match]);

  const handleFormSubmit = (formObject) => {
    const { params } = props.match;
    const dynamicService = props.tripForm
      ? tripService.editTrip(params.id, formObject)
      : props.stepForm
      ? stepService.editStep(params.stepId, formObject)
      : experienceService.editExperience(params.experienceId, formObject)
    
    dynamicService
      .then((response) => {
        console.log(`${props.formType} edited!`, response);
        props.history.push({
          pathname: `/trips/${params.id}`,
        });
      })
      .catch((error) => {
        console.log(`Error while editing ${props.formType}:`, error)
        setShowError(error.response.data.message)
      });
  };

  const deleteItem = () => {
    const { params } = props.match;
    const dynamicService = props.tripForm
      ? tripService.deleteTrip(params.id)
      : props.stepForm
      ? stepService.deleteStep(params.stepId)
      : experienceService.deleteExperience(params.experienceId)
    
    const dynamicRedirectLink = props.tripForm
      ? "/trips"
      : `/trips/${params.id}`

    dynamicService
      .then(() => {
        props.history.push(dynamicRedirectLink);
      })
      .catch((err) => {
        console.log(`Error while deleting ${props.formType}: `, err);
      });
  };

  return (
    <StyledEditForm>
      <FormGeneral
        formTitle={props.formTitle}
        formSubmit={handleFormSubmit}
        formState={state}
        formInputs={props.formInputs}
        formButton="SAVE"
      />
        <>
          <Button
            toggleDeleteConfirmation={toggleDeleteConfirmation}
            formButton="DELETE"
            theme="lightcoral"
            color="white"
          />
          {showDeleteConfirmation && (
            <>
              <h4>Are you sure you want to delete this {props.formType} ? </h4>
              <Button
                deleteItem={deleteItem}
                formButton="YES"
                theme="lightcoral"
                color="white"
              />
              <Button
                toggleDeleteConfirmation={toggleDeleteConfirmation}
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
          <p><Link to={`/trips/${props.match.params.id}`}>Back to trip</Link></p>
        </>
    </StyledEditForm>
  );
};

export default EditFormGeneral;
