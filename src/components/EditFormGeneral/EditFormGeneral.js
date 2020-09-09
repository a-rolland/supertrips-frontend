import React, { useState, useEffect} from "react";
import authService from "../Services/auth-service";
import tripService from "../Services/trip-service";
import stepService from "../Services/step-service";
import experienceService from "../Services/experience-service";
import FormGeneral from "../FormGeneral/FormGeneral";
import Button from "../ElementalComponents/Button/Button";
import { StyledEditForm, Loading, Error } from "./styles"
import { Link } from "react-router-dom";
import FontAwesomeIconComponent from "../ElementalComponents/FontAwesomeIconComponent/FontAwesomeIconComponent";

const EditFormGeneral = (props) => {
  const [state, setState] = useState({})
  const [showDeleteConfirmation, setshowDeleteConfirmation] = useState(
    false
  );
  const [showError, setShowError] = useState("")
  const [loading, setLoading] = useState("")

  const toggleDeleteConfirmation = () => {
    setshowDeleteConfirmation(!showDeleteConfirmation);
  }
  
  const closeDeleteConfirmation = () => {
    setshowDeleteConfirmation(false);
  }

  useEffect(() => {
    const { params } = props.match;
    const dynamicService = props.tripForm
      ? tripService.tripDetails(params.id)
      : props.stepForm
      ? stepService.stepDetails(params.stepId)
      : props.experienceForm
      ? experienceService.experienceDetails(params.experienceId)
      : authService.loggedIn();
      
    dynamicService  
      .then(response => {
        props.tripForm
          ? setState({...response, imageUrl:"", originalImg: response.imageUrl})
          : props.profilePictureForm
          ? setState({profilePicture:"", originalImg: response.profilePicture})
          : setState(response)
      })
      .catch((error) =>
        console.log(`Error while getting ${props.formType} details :`, error)
      );
  }, [props.formType, props.stepForm, props.tripForm, props.experienceForm, props.profilePictureForm, props.match]);

  const handleFormSubmit = (formObject) => {
    const { params } = props.match;
    setLoading(true)
    console.log("FORM OBJECT", formObject)
    const uploadData = new FormData();
    if (props.tripForm) {
      uploadData.append("title", formObject.title);
      formObject.archive
        ? uploadData.append("imageUrl", formObject.archive)
        : uploadData.append("imageUrl", formObject.originalImg)
      uploadData.append("isPublic", formObject.isPublic);
      uploadData.append("startDate", formObject.startDate);
      uploadData.append("endDate", formObject.endDate);
      console.log("uploadData",uploadData)
    }
    if (props.profilePictureForm) {
      formObject.archive
        ? uploadData.append("profilePicture", formObject.archive)
        : uploadData.append("profilePicture", formObject.originalImg)
      console.log("uploadData",uploadData)
    }

    const dynamicService = props.tripForm
      ? tripService.editTrip(params.id, uploadData)
      : props.stepForm
      ? stepService.editStep(params.stepId, formObject)
      : props.experienceForm
      ? experienceService.editExperience(params.experienceId, formObject)
      : authService.editProfilePicture(props.user._id, uploadData)
      
    dynamicService
      .then((response) => {
        console.log(`${props.formType} edited!`, response);
        setLoading(false)
        props.profilePictureForm
          ? props.updateProfilePicture()
          : props.history.push({
            pathname: `/trips/${params.id}`,
          });
      })
      .catch((error) => {
        setLoading(false)
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
      : props.experienceForm
      ? experienceService.deleteExperience(params.experienceId)
      : authService.editProfilePicture(props.user._id, {profilePicture: "https://res.cloudinary.com/nutriapp/image/upload/v1599217287/profileDefault_jr9j16.png"})
    
    const dynamicRedirectLink = props.tripForm
      ? "/trips"
      : props.profilePictureForm
      ? "/profile"
      : `/trips/${params.id}`

    dynamicService
      .then((response) => {
        console.log(response)
        props.profilePictureForm && props.updateProfilePicture()
        props.history.push(dynamicRedirectLink);
      })
      .catch((err) => {
        console.log(`Error while deleting ${props.formType}: `, err);
      });
  };

  return (
    <StyledEditForm>
      {loading
        ? <Loading><FontAwesomeIconComponent chosenIcon={"faSpinner"} size="2x" /><p>Loading</p></Loading>
        : <FormGeneral
            formTitle={props.formTitle}
            formSubmit={handleFormSubmit}
            formState={state}
            formInputs={props.formInputs}
            formButton="SAVE"
          />
      }
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
                closeDeleteConfirmation={closeDeleteConfirmation}
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
          { props.profilePictureForm ||
            <React.Fragment>
              { showError &&
                <Error>
                  {showError}
                </Error>
              }
              <p>
                <Link to={`/trips/${props.match.params.id}`}>
                  <FontAwesomeIconComponent chosenIcon={"faArrowCircleLeft"} size="2x" />
                </Link>
              </p> 
            </React.Fragment>
          }
        </>
    </StyledEditForm>
  );
};

export default EditFormGeneral;
