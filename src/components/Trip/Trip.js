import React, { useState, useEffect } from "react";
import tripService from "../Services/trip-service";
import stepService from "../Services/step-service";
import experienceService from "../Services/experience-service";
import {
  StyledTrip,
  Duration,
  OwnerControls,
  Ul,
  Box,
  Li,
  Error,
  TripPicture,
  LeaveCommentToggleLogo,
  Comment,
} from "./styles";
import Step from "../Step/Step";
import ProfilePicture from "../ElementalComponents/ProfilePicture/ProfilePicture";
import { Link } from "react-router-dom";
import Map from "../Map/Map";
import FontAwesomeIconComponent from "../ElementalComponents/FontAwesomeIconComponent/FontAwesomeIconComponent";
import AddToFavoritesLogo from "../ElementalComponents/AddToFavoritesLogo/AddToFavoritesLogo";
import LikeTripLogo from "../ElementalComponents/LikeTripLogo/LikeTripLogo";
import LeaveComment from "../CreateFormGeneral/LeaveComment";

const Trip = (props) => {
  const [showError, setShowError] = useState("");
  const initialState = {
    loggedInUser: null,
    trip: [],
    steps: [],
    experiences: [],
    leavingComment: false,
    lat: null,
    lng: null,
  };
  const [state, setState] = useState(initialState);

  const handleUpdateTrip = () => {
    tripService
      .tripDetails(props.match.params.id)
      .then((tripResponse) => {
        tripResponse === null
          ? setShowError("Sorry, this trip doesn't exist.")
          : setState((state) => ({
              ...state,
              loggedInUser: props.userInSession,
              trip: tripResponse,
            }));
      })
      .catch((error) => {
        console.log("Error while getting trip details");
        setShowError(`Error : ${error.response.data.message}`);
      });
  };

  useEffect(() => {
    experienceService
      .fullTripExperiences(props.match.params.id)
      .then((experienceResponse) => {
        const experienceLatAverage =
          experienceResponse
            .filter((experience) => experience.place)
            .reduce((acc, curr) => acc + curr.place.lat, 0)
            .toFixed(2) /
          experienceResponse.filter((experience) => experience.place).length;

        const experienceLngAverage =
          experienceResponse
            .filter((experience) => experience.place)
            .reduce((acc, curr) => acc + curr.place.lng, 0)
            .toFixed(2) /
          experienceResponse.filter((experience) => experience.place).length;

        setState((state) => ({
          ...state,
          experiences: experienceResponse,
          lat: experienceLatAverage,
          lng: experienceLngAverage,
        }));
      })
      .catch(() => console.log("Error while getting experiences"));
    tripService
      .tripDetails(props.match.params.id)
      .then((tripResponse) => {
        tripResponse === null
          ? setShowError("Sorry, this trip doesn't exist.")
          : setState((state) => ({
              ...state,
              loggedInUser: props.userInSession,
              trip: tripResponse,
            }));
        stepService
          .steps(props.match.params.id)
          .then((stepResponse) => {
            setState((state) => ({
              ...state,
              loggedInUser: props.userInSession,
              steps: stepResponse,
            }));
          })
          .catch(() => console.log("Error while getting steps"));
      })
      .catch((error) => {
        console.log("Error while getting trip details");
        setShowError(`Error : ${error.response.data.message}`);
      });
  }, [props.userInSession, props.match.params.id]);

  const stepsList = state.steps.map((step, index) => {
    return (
      <Li key={step._id}>
        <Step
          step={step}
          stepNumber={index + 1}
          author={state.trip.author}
          userInSession={state.loggedInUser}
          {...props}
        />
      </Li>
    );
  });

  const allExperiencesCoords = state.experiences
    .filter((experience) => experience.place)
    .map((experience) => {
      return {
        lat: experience.place.lat,
        lng: experience.place.lng,
      };
    });

  const toggleLeavingComment = () => {
    setState((state) => ({
      ...state,
      leavingComment: !state.leavingComment,
    }));
  };

  const handleCloseLeavingComment = () => {
    setState((state) => ({
      ...state,
      leavingComment: false,
    }));
  };

  const commentsList =
    state.trip.comments &&
    state.trip.comments.map((comment) => {
      return (
        <Comment key={comment._id}>
          <span>
            <ProfilePicture
              src={comment.commentAuthor.profilePicture}
              width="20px"
              height="20px"
              margin="5px 10px 5px 0"
              display="inline-block"
            />
            <Link
              to={
                props.userInSession &&
                props.userInSession._id === comment.commentAuthor._id
                  ? "/profile"
                  : `/profile/user/${comment.commentAuthor._id}`
              }
            >
              {comment.commentAuthor.username}
            </Link>{" "}
            said
          </span>
          <p>{comment.comment}</p>
        </Comment>
      );
    });

  return (
    <StyledTrip>
      {showError ? (
        <Error>{showError}</Error>
      ) : (state.trip && state.trip.isPublic) ||
        (state.trip &&
          state.loggedInUser &&
          state.trip.author._id === state.loggedInUser._id) ? (
        <React.Fragment>
          <span>
            <h1>{state.trip.title}</h1>
            {state.loggedInUser && (
              <AddToFavoritesLogo
                trip={state.trip}
                userInSession={state.loggedInUser}
                updateUser={props.updateUser}
              />
            )}
          </span>
          <Duration>
            <FontAwesomeIconComponent
              chosenIcon={"faHourglassHalf"}
              size="1x"
            />
            <span>{state.trip.duration} days</span>
          </Duration>
          {state.trip && (
            <div style={{ marginTop: "15px" }}>
              <LikeTripLogo
                trip={state.trip}
                userInSession={state.loggedInUser}
                updateTrips={handleUpdateTrip}
              />
              <span>{state.trip.likes.length}</span>
            </div>
          )}
          {state.trip.author && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "5px auto 20px",
              }}
            >
              <ProfilePicture
                src={state.trip.author.profilePicture}
                width="50px"
                height="50px"
                margin="5px 15px 5px 0"
                display="inline-block"
              />
              <span>
                By{" "}
                <Link
                  to={
                    props.userInSession &&
                    props.userInSession._id === state.trip.author._id
                      ? "/profile"
                      : `/profile/user/${state.trip.author._id}`
                  }
                >
                  {state.trip.author.username}
                </Link>
              </span>
            </div>
          )}
          {state.trip &&
            state.loggedInUser &&
            state.trip.author._id === state.loggedInUser._id &&
            !state.trip.isPublic && (
              <p style={{ opacity: "0.4" }}>(PRIVATE TRIP)</p>
            )}
          {state.experiences &&
          state.experiences.filter((experience) => experience.place).length >=
            1 ? (
            <Map
              tripMap
              mapType="tripPresentation"
              address={""}
              lat={
                state.experiences.length === 1
                  ? state.experiences[0].place.lat
                  : state.lat
              }
              lng={
                state.experiences.length === 1
                  ? state.experiences[0].place.lng
                  : state.lng
              }
              zoom="14"
              allExperiencesCoords={allExperiencesCoords}
              hasOnlyOneLocalisation={allExperiencesCoords.length === 1}
            />
          ) : (
            <TripPicture src={state.trip.imageUrl} alt="trip cover pic" />
          )}
          {state.steps && (
            <Ul>
              <Box>{stepsList}</Box>
            </Ul>
          )}
          {state.trip && state.trip.comments && state.trip.comments.length > 0 && (
            <div>
              <p>Comments</p>
              {commentsList}
            </div>
          )}
          {state.loggedInUser && (
            <React.Fragment>
              <LeaveCommentToggleLogo onClick={toggleLeavingComment}>
                <FontAwesomeIconComponent
                  chosenIcon={
                    state.leavingComment ? "faMinusSquare" : "faCommentAlt"
                  }
                  color="dimgrey"
                />
                {state.leavingComment ? "Close" : "Leave a comment"}
              </LeaveCommentToggleLogo>
              {state.leavingComment && (
                <LeaveComment
                  {...props}
                  closeLeavingComment={handleCloseLeavingComment}
                  updateTrips={handleUpdateTrip}
                />
              )}
            </React.Fragment>
          )}
          {state.loggedInUser &&
            state.loggedInUser._id === state.trip.author._id && (
              <React.Fragment>
                <OwnerControls>
                  <Link
                    to={{
                      pathname: `/trips/${state.trip._id}/add-step`,
                      state: { trip: state.trip },
                    }}
                  >
                    <FontAwesomeIconComponent chosenIcon={"faPlus"} />
                    <span>Add a step</span>
                  </Link>
                </OwnerControls>
                <OwnerControls>
                  <Link
                    to={{
                      pathname: `/trips/edit/${state.trip._id}`,
                      state: { trip: state.trip },
                    }}
                  >
                    <FontAwesomeIconComponent chosenIcon={"faFeatherAlt"} />
                    <span>Edit trip</span>
                  </Link>
                </OwnerControls>
              </React.Fragment>
            )}
          <p style={{ marginTop: "40px" }}>
            <Link to={`/trips`}>
              <FontAwesomeIconComponent
                chosenIcon={"faArrowCircleLeft"}
                size="2x"
              />
            </Link>
          </p>
        </React.Fragment>
      ) : (
        "Sorry, this is a private trip."
      )}
    </StyledTrip>
  );
};

export default Trip;
