import React, { useState } from "react";
import tripService from "../Services/trip-service";
import stepService from "../Services/step-service";
import experienceService from "../Services/experience-service";
import { StyledCreateForm, Loading, Error } from "./styles"
import { Link } from "react-router-dom";
import FormGeneral from "../FormGeneral/FormGeneral";
import FontAwesomeIconComponent from "../ElementalComponents/FontAwesomeIconComponent/FontAwesomeIconComponent";

const CreateFormGeneral = (props) => {
  const [showError, setShowError] = useState("")
  const [loading, setLoading] = useState("")

  const handleFormSubmit = (formObject) => {
    setLoading(true)
    const uploadData = new FormData();
    if (props.tripForm) {
      uploadData.append("title", formObject.title);
      uploadData.append("imageUrl", formObject.archive);
      uploadData.append("isPublic", formObject.isPublic);
      uploadData.append("startDate", formObject.startDate);
      uploadData.append("endDate", formObject.endDate);
      console.log("uploadData",uploadData)
    }
    if (props.addPhotoToExperience) {
      uploadData.append("imageUrl", formObject.archive);
    }
    const dynamicService = props.tripForm
      ? tripService.newTrip(uploadData)
      : props.stepForm
      ? stepService.newStep(formObject)
      : props.experienceForm
      ? experienceService.newExperience(formObject)
      : experienceService.addPictureToExperience(props.experienceId, uploadData)
    dynamicService  
      .then((response) => {
        setLoading(false)
        console.log(`New ${props.formType} created !`, response)
        props.addPhotoToExperience && props.closeShowAddPhoto()
        props.addPhotoToExperience && props.updateNewPicture()
        props.tripForm
          ? props.history.push("/trips")
          : props.history.push(`/trips/${props.tripId}`)
      })
      .catch((error) => {
        setLoading(false)
        console.log(`Error while getting ${props.formType} details :`, error)
        setShowError(error.response.data.message)
      });
  };

  const redirectLink = props.match.path === "/create-trip"
                          ? "/trips"
                          : `/trips/${props.match.params.id}`

  return (
    <StyledCreateForm>
      {loading
        ? <Loading><FontAwesomeIconComponent chosenIcon={"faSpinner"} size="2x" /><p>Loading</p></Loading>
        : <FormGeneral
            formType={props.formType}
            formTitle={props.addPhotoToExperience || `Create a new ${props.formType}`}
            formSubmit={handleFormSubmit}
            formState={props.initialState}
            formInputs={props.formInputs}
            formButton={props.addPhotoToExperience ? "ADD" : "CREATE"}
          />
}
      { showError &&
        <Error>
          {showError}
        </Error>
      }
      {
        props.addPhotoToExperience ||
          <p>
            <Link to={`${redirectLink}`}>
              <FontAwesomeIconComponent chosenIcon={"faArrowCircleLeft"} size="2x" />
            </Link>
          </p>
      }
    </StyledCreateForm>
  );
};

export default CreateFormGeneral;
