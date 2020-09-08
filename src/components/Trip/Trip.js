import React, { useState, useEffect } from "react";
import tripService from "../Services/trip-service";
import stepService from "../Services/step-service";
import experienceService from "../Services/experience-service";
import { StyledTrip, Duration, OwnerControls, Ul, Box, Li, Error } from "./styles"
import Step from "../Step/Step";
import ProfilePicture from "../ElementalComponents/ProfilePicture/ProfilePicture"
import { Link } from "react-router-dom";
import Map from "../Map/Map";
import FontAwesomeIconComponent from "../ElementalComponents/FontAwesomeIconComponent/FontAwesomeIconComponent";
import AddToFavoritesLogo from "../ElementalComponents/AddToFavoritesLogo/AddToFavoritesLogo";

const Trip = (props) => {
  const [showError, setShowError] = useState("")
  const initialState = {
    loggedInUser: null,
    trip: [],
    steps: [],
    experiences: [],
    lat: null,
    lng: null
  };
  const [state, setState] = useState(initialState);

  useEffect(() => {
    experienceService
      .fullTripExperiences(props.match.params.id)
        .then((experienceResponse) => {
          const experienceLatAverage = experienceResponse
          .filter(experience => experience.place)
          .reduce((acc, curr) => acc + curr.place.lat, 0).toFixed(2) / experienceResponse
          .filter(experience => experience.place).length

          const experienceLngAverage = experienceResponse
            .filter(experience => experience.place)
            .reduce((acc, curr) => acc + curr.place.lng, 0).toFixed(2) / experienceResponse
            .filter(experience => experience.place).length
          console.log("Experiences of this trip:", experienceResponse)

          console.log(experienceLatAverage, experienceLngAverage)
          setState((state) => ({
            ...state,
            experiences: experienceResponse,
            lat: experienceLatAverage,
            lng: experienceLngAverage
          }));
        })
        .catch((error) => 
          console.log("Error while getting experiences :", error
        ))
    tripService
      .tripDetails(props.match.params.id)
      .then((tripResponse) => {
        console.log("Trip details :", tripResponse);
        tripResponse === null 
        ? setShowError("Sorry, this trip doesn't exist.")
        : setState((state) => ({
            ...state,
            loggedInUser: props.userInSession,
            trip: tripResponse
          }));
          stepService
            .steps(props.match.params.id)
              .then((stepResponse) => {
                console.log("Steps of this trip:", stepResponse)
                setState((state) => ({
                  ...state,
                  loggedInUser: props.userInSession,
                  steps: stepResponse
                }));
              })
              .catch((error) => 
                console.log("Error while getting steps :", error
              ))
      })
      .catch((error) => {
        console.log("Error while getting trip details :", error)
        setShowError(`Error : ${error.response.data.message}`)        
      });
  }, [props.userInSession, props.match.params.id]);

  const stepsList = state.steps.map((step, index) => {
    return(
      <Li key={step._id}>
        <Step
          step={step}
          stepNumber={index+1}
          author={state.trip.author}
          userInSession={state.loggedInUser}
          {...props}
        />
      </Li>
    )
  })

  const allExperiencesCoords = state.experiences
    .filter(experience => experience.place)
    .map((experience) => {
      return(
        {
          lat: experience.place.lat,
          lng: experience.place.lng
        }
      )
  })
  
  return (
    <StyledTrip>
      { showError
        ?
        <Error>
          {showError}
        </Error>
        : (state.trip && state.trip.isPublic) || (state.trip && state.loggedInUser && state.trip.author._id === state.loggedInUser._id)
        ?
        <React.Fragment>
        <span>
          <h1>{state.trip.title}</h1>
          { state.loggedInUser && 
            <AddToFavoritesLogo trip={state.trip} userInSession={state.loggedInUser} updateUser={props.updateUser} />
          }
        </span>
        <Duration>
          <FontAwesomeIconComponent chosenIcon={"faHourglassHalf"} size="1x" />
          <span>{state.trip.duration} days</span>
        </Duration>
        { state.trip.author && 
          <div style={{display:"flex", alignItems:"center", justifyContent:"center", margin:"20px auto"}}>
            <ProfilePicture src={state.trip.author.profilePicture} width="50px" height="50px" margin="5px 15px 5px 0" display="inline-block" />
            <span>By {state.trip.author.username}</span>
          </div>
        }
        
        {/* <img src={state.trip.imageUrl} alt="trip cover pic" /> */}
        { state.experiences && state.experiences.filter(experience => experience.place).length >= 1 &&
          <Map
            tripMap
            mapType = "tripPresentation"
            address={""}
            lat={state.experiences.length === 1 ? state.experiences[0].place.lat : state.lat}
            lng={state.experiences.length === 1 ? state.experiences[0].place.lng : state.lng}
            zoom="14"
            allExperiencesCoords={allExperiencesCoords}
            hasOnlyOneLocalisation={allExperiencesCoords.length === 1}
          />
        }
        { state.steps && 
          <Ul>
            <Box>
              {stepsList}
            </Box>
          </Ul>
        }
        {state.loggedInUser && state.loggedInUser._id === state.trip.author._id && (
          <>
            <OwnerControls>
              <Link to={{pathname: `/trips/${state.trip._id}/add-step`, state: { trip: state.trip }}}>
              <FontAwesomeIconComponent chosenIcon={"faPlus"} />
                <span>Add a step</span>
              </Link>
            </OwnerControls>
            <OwnerControls>
              <Link to={{	pathname: `/trips/edit/${state.trip._id}`, state: { trip: state.trip }}}>
              <FontAwesomeIconComponent chosenIcon={"faFeatherAlt"} />
                <span>Edit trip</span>
              </Link>
            </OwnerControls>
          </>
        )}
        <p style={{marginTop: "40px"}}>
          <Link to={`/trips`}>
            <FontAwesomeIconComponent chosenIcon={"faArrowCircleLeft"} size="2x" />
          </Link>
        </p> 
        </React.Fragment>
        : "Sorry, this is a private trip."
      }
    </StyledTrip>
  );
};

export default Trip;
