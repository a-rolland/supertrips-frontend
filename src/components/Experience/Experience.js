import React, { useState, useEffect, useCallback } from "react";
import experienceService from "../Services/experience-service";
import {
  StyledExperience,
  StyledDateTime,
  Description,
  ExpandedSection,
  MapContainer,
  AddPhotoLogo,
  EditPhotoLogo,
  GalleryAndPictures,
  PicturesContainer,
  OwnerControls,
  StyledStepHeader,
  ExperienceTitle,
  SinglePictureContainer,
} from "./styles";
import { Link } from "react-router-dom";
import Map from "../Map/Map";
import FontAwesomeIconComponent from "../ElementalComponents/FontAwesomeIconComponent/FontAwesomeIconComponent";
import AddPhotoToExperience from "../CreateFormGeneral/AddPhotoToExperience";
import Gallery from "../Gallery/Gallery";
import "../../../node_modules/react-image-gallery/styles/css/image-gallery.css";
import Button from "../ElementalComponents/Button/Button";

const Experience = (props) => {
  const initialState = {
    loggedInUser: null,
    experience: [],
    expanded: false,
    showAddPhoto: false,
    editingPhotos: false,
    showInGallery: false,
  };
  const [state, setState] = useState(initialState);

  const toggleExpand = () => {
    setState((state) => ({
      ...state,
      expanded: !state.expanded,
    }));
  };

  const toggleShowAddPhoto = () => {
    !state.showAddPhoto && handleCloseEditingPhotos();
    setState((state) => ({
      ...state,
      showAddPhoto: !state.showAddPhoto,
    }));
  };

  const toggleEditingPhotos = () => {
    !state.editingPhotos && handleCloseShowAddPhoto();
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
        .catch(() => console.log("Error while getting experience details")),
    [state.experience._id]
  );

  const handleDeletePicture = (imageId) => {
    experienceService
      .deleteExperiencePicture(state.experience._id, imageId)
      .then((response) => {
        handleUpdateNewPicture();
      });
  };

  const handleToggleShowInGallery = () => {
    setState((state) => ({
      ...state,
      showInGallery: !state.showInGallery,
    }));
  };

  const closeGallery = () => {
    setState((state) => ({
      ...state,
      showInGallery: false,
    }));
  };

  const experiencePictures =
    state.experience.pictures &&
    state.experience.pictures.map((picture, index) => {
      return (
        <SinglePictureContainer key={index} style={{ display: "inline-block" }}>
          <img key={picture._id} src={picture.url} alt="experience" />
          {props.author._id === state.loggedInUser._id &&
            state.editingPhotos && (
              <FontAwesomeIconComponent
                chosenIcon={"faTrashAlt"}
                color="red"
                deleteExperiencePicture={handleDeletePicture}
                picture={picture}
              />
            )}
        </SinglePictureContainer>
      );
    });

  useEffect(() => {
    experienceService
      .experienceDetails(props.experience._id)
      .then((response) => {
        setState((state) => ({
          ...state,
          loggedInUser: props.userInSession,
          experience: response,
        }));
      })
      .catch(() => console.log("Error while getting experience details"));
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
          <ExperienceTitle>{state.experience.title}</ExperienceTitle>
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
        <ExpandedSection>
          {state.experience.description && (
            <Description>
              <FontAwesomeIconComponent
                chosenIcon={"faCommentDots"}
                color="grey"
              />
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
          {state.experience.pictures.length > 0 && (
            <GalleryAndPictures>
              <Button
                formButton={
                  state.showInGallery ? "CLOSE GALLERY" : "SHOW IN A GALLERY"
                }
                toggleShowInGallery={handleToggleShowInGallery}
              />
              {state.showInGallery ? (
                <Gallery
                  style={{ padding: "50px" }}
                  pictures={state.experience.pictures}
                />
              ) : (
                <PicturesContainer>{experiencePictures}</PicturesContainer>
              )}
            </GalleryAndPictures>
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
        </ExpandedSection>
      )}
    </StyledExperience>
  );
};

export default Experience;
