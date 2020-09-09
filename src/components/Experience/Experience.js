import React, { useState, useEffect, useCallback } from "react";
// import stepService from "../Services/step-service";
import experienceService from "../Services/experience-service";
import {
  StyledExperience,
  StyledDateTime,
  Description,
  MapContainer,
  AddPhotoLogo,
  EditPhotoLogo,
  PicturesContainer,
  OwnerControls,
  StyledStepHeader,
  SinglePictureContainer
} from "./styles";
import { Link } from "react-router-dom";
import Map from "../Map/Map";
import FontAwesomeIconComponent from "../ElementalComponents/FontAwesomeIconComponent/FontAwesomeIconComponent";
import AddPhotoToExperience from "../CreateFormGeneral/AddPhotoToExperience";

const Experience = (props) => {
  const initialState = {
    loggedInUser: null,
    experience: [],
    expanded: false,
    showAddPhoto: false,
    editingPhotos: false
  };
  const [state, setState] = useState(initialState);

  const toggleExpand = () => {
    setState((state) => ({
      ...state,
      expanded: !state.expanded,
    }));
  };

  const toggleShowAddPhoto = () => {
    !state.showAddPhoto && handleCloseEditingPhotos()
    setState((state) => ({
      ...state,
      showAddPhoto: !state.showAddPhoto,
    }));
  };

  const toggleEditingPhotos = () => {
    !state.editingPhotos && handleCloseShowAddPhoto()
    setState((state) => ({
      ...state,
      editingPhotos: !state.editingPhotos,
    }));
  };

  const handleCloseEditingPhotos = () => {
    setState((state) => ({
      ...state,
      editingPhotos: false,
    }));
  };

  const handleCloseShowAddPhoto = () => {
    setState((state) => ({
      ...state,
      showAddPhoto: false,
    }));
  };

  const handleUpdateNewPicture = useCallback(
    () =>
      experienceService
        .experienceDetails(state.experience._id)
        .then((response) => {
          setState((state) => ({
            ...state,
            experience: response,
          }));
        })
        .catch((error) =>
          console.log("Error while getting experience details :", error)
        ),
    [state.experience._id]
  );

  const handleDeletePicture = (imageId) => {
    console.log("Picture with imageId ",imageId," will be deleted")
    experienceService.deleteExperiencePicture(state.experience._id, imageId)
      .then((response) => {
        console.log("Picture deleted !", response)
        handleUpdateNewPicture()
      })
  }


  const experiencePictures =
    state.experience.pictures &&
    state.experience.pictures.map((picture, index) => {
      return <SinglePictureContainer key={index} style={{display:"inline-block"}}>
                <img key={picture._id} src={picture.url} alt="experience" />
                {props.author._id === state.loggedInUser._id && state.editingPhotos &&
                  <FontAwesomeIconComponent
                    chosenIcon={"faTrashAlt"}
                    color="red"
                    deleteExperiencePicture={handleDeletePicture}
                    picture={picture}
                  />
                }
              </SinglePictureContainer>
    });

  useEffect(() => {
    experienceService
      .experienceDetails(props.experience._id)
      .then((response) => {
        console.log("Experience details :", response);
        setState((state) => ({
          ...state,
          loggedInUser: props.userInSession,
          experience: response,
        }));
      })
      .catch((error) =>
        console.log("Error while getting experience details :", error)
      );
  }, [props.userInSession, props.experience._id]);

  return (
    <StyledExperience>
      <StyledStepHeader onClick={toggleExpand}>
        {state.expanded ? (
          <FontAwesomeIconComponent chosenIcon={"faChevronDown"} />
        ) : (
          <FontAwesomeIconComponent chosenIcon={"faChevronRight"} />
        )}
        <span>
          {state.experience.title}
          {state.experience.date && (
            <React.Fragment>
              {(state.experience.showDate ||
                props.author._id === state.loggedInUser._id) && (
                <StyledDateTime
                  opacity={!state.experience.showDate ? "0.4" : "1"}
                >
                  <FontAwesomeIconComponent
                    chosenIcon={"faCalendarAlt"}
                    color="grey"
                  />
                  {state.experience.date}
                  {!state.experience.showDate && " (Hidden for other users)"}
                </StyledDateTime>
              )}
              {(state.experience.showTime ||
                props.author._id === state.loggedInUser._id) && (
                <StyledDateTime
                  opacity={!state.experience.showTime ? "0.4" : "1"}
                >
                  <FontAwesomeIconComponent
                    chosenIcon={"faClock"}
                    color="grey"
                  />
                  {state.experience.time}
                  {!state.experience.showTime && " (Hidden for other users)"}
                </StyledDateTime>
              )}
            </React.Fragment>
          )}
        </span>
      </StyledStepHeader>
      {state.expanded && (
        <>
          {state.experience.description && (
            <Description>
              <FontAwesomeIconComponent chosenIcon={"faCommentDots"} color="grey" />
              {state.experience.description}
            </Description>
          )}
          {state.experience.place && (
            <MapContainer>
              <Map
                experienceMap
                address={state.experience.place.address}
                lat={state.experience.place.lat}
                lng={state.experience.place.lng}
                zoom="15"
              />
            </MapContainer>
          )}
          {state.experience.pictures && (
            <PicturesContainer>{experiencePictures}</PicturesContainer>
          )}
          {state.loggedInUser && props.author._id === state.loggedInUser._id && (
            <React.Fragment>
              <EditPhotoLogo onClick={toggleEditingPhotos}>
                <FontAwesomeIconComponent
                  chosenIcon={
                    state.editingPhotos ? "faMinusSquare" : "faPenSquare"
                  }
                  color="dimgrey"
                />
                {state.editingPhotos ? "Close" : "Edit photos"}
              </EditPhotoLogo>
              <AddPhotoLogo onClick={toggleShowAddPhoto}>
                <FontAwesomeIconComponent
                  chosenIcon={
                    state.showAddPhoto ? "faMinusSquare" : "faPlusSquare"
                  }
                  color="dimgrey"
                />
                {state.showAddPhoto ? "Close" : "Add a photo"}
              </AddPhotoLogo>
            </React.Fragment>
          )}
          {state.showAddPhoto && (
            <AddPhotoToExperience
              experienceId={state.experience._id}
              closeShowAddPhoto={handleCloseShowAddPhoto}
              updateNewPicture={handleUpdateNewPicture}
              {...props}
            />
          )}
          {state.loggedInUser && state.loggedInUser._id === props.author._id && (
            <>
              <OwnerControls>
                <Link
                  to={`/trips/${state.experience.step.trip}/steps/${state.experience.step._id}/edit-experience/${state.experience._id}`}
                >
                  <FontAwesomeIconComponent chosenIcon={"faFeatherAlt"} />
                  <span>Edit experience</span>
                </Link>
              </OwnerControls>
            </>
          )}
        </>
      )}
    </StyledExperience>
  );
};

export default Experience;
