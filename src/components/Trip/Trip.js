import React, { useState, useEffect } from "react";
import tripService from "../Services/trip-service";
import stepService from "../Services/step-service";
import { StyledTrip, Duration, OwnerControls, Ul, Box, Li } from "./styles"
import Step from "../Step/Step";
import ProfilePicture from "../ElementalComponents/ProfilePicture/ProfilePicture"
import { Link } from "react-router-dom";
import Map from "../Map/Map";
import FontAwesomeIconComponent from "../ElementalComponents/FontAwesomeIconComponent/FontAwesomeIconComponent";
import AddToFavoritesLogo from "../ElementalComponents/AddToFavoritesLogo/AddToFavoritesLogo";

const Trip = (props) => {
  const initialState = {
    loggedInUser: null,
    trip: [],
    steps: []
  };
  const [state, setState] = useState(initialState);

  useEffect(() => {
    tripService
      .tripDetails(props.match.params.id)
      .then((response) => {
        console.log("Trip details :", response);
        setState((state) => ({
          ...state,
          loggedInUser: props.userInSession,
          trip: response
        }));
        stepService
          .steps(props.match.params.id)
            .then((response) => {
              console.log("Steps of this trip:", response)
              setState((state) => ({
                ...state,
                loggedInUser: props.userInSession,
                steps: response
              }));
            })
            .catch((error) => 
              console.log("Error while getting steps :", error
            ))
      })
      .catch((error) =>
        console.log("Error while getting trip details :", error)
      );
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

  return (
    <StyledTrip>
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
      <Map
        tripMap
        mapType = "tripPresentation"
        address={""}
        lat={45}
        lng={3}
        zoom="6"
      />
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
    </StyledTrip>
  );
};

export default Trip;
