import React, { useState, useEffect } from "react";
import tripService from "../Services/trip-service";
import stepService from "../Services/step-service";
import Button from "../Button/Button";
import { StyledTrip, Ul, Box, Li } from "./styles"
import Step from "../Step/Step";
import { Link } from "react-router-dom";

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

  const editTrip = () => {
    props.history.push({
      pathname: `/trips/edit/${state.trip._id}`,
      state: { trip: state.trip }
    });
  };

  const addStep = () => {
    props.history.push({
      pathname: `/trips/${state.trip._id}/add-step`,
      state: { trip: state.trip }
    });
  };

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
      <h1>Trip details</h1>
      <h2>{state.trip.title}</h2>
      <p>{state.trip.duration} days</p>
      { state.steps && 
        <Ul>
          <Box>
            {stepsList}
          </Box>
        </Ul>
      }
      {state.loggedInUser && state.loggedInUser._id === state.trip.author._id && (
        <>
          <Button addStep={addStep} formButton="ADD A NEW STEP" />
          <Button editTrip={editTrip} formButton="EDIT TRIP" />
        </>
      )}
      <p><Link to="/trips">Back to trips</Link></p>
    </StyledTrip>
  );
};

export default Trip;
