import React, { useState, useEffect } from "react";
import tripService from "../Services/trip-service";
import stepService from "../Services/step-service";
import { StyledTrip, Duration, OwnerControls, Ul, Box, Li, Back } from "./styles"
import Step from "../Step/Step";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faFeatherAlt, faHourglassHalf } from '@fortawesome/free-solid-svg-icons'
import Map from "../Map/Map";

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
      <h1>{state.trip.title}</h1>
      <Duration>
        <FontAwesomeIcon icon={faHourglassHalf} size="1x" />
        <span>{state.trip.duration} days</span>
      </Duration>
      <img src={state.trip.imageUrl} alt="trip cover pic" />
      <Map
        address={""}
        lat={45}
        lng={3}
        zoom="6"
        height="300px"
        width="100%"
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
              <FontAwesomeIcon icon={faPlus} />
              <span>Add a step</span>
            </Link>
          </OwnerControls>
          <OwnerControls>
            <Link to={{	pathname: `/trips/edit/${state.trip._id}`, state: { trip: state.trip }}}>
              <FontAwesomeIcon icon={faFeatherAlt} />
              <span>Edit trip</span>
            </Link>
          </OwnerControls>
        </>
      )}
      <Back><Link to="/trips">Back to trips</Link></Back>
    </StyledTrip>
  );
};

export default Trip;
