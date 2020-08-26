import React, { useState, useEffect } from "react";
import tripService from "../Services/trip-service";
import stepService from "../Services/step-service";
import Button from "../Button/Button";

const Trip = (props) => {
  const initialState = {
    loggedInUser: null,
    trip: [],
    steps: []
  };
  const [state, setState] = useState(initialState);

  const [showDeleteTripConfirmation, setShowDeleteTripConfirmation] = useState(
    false
  );

  const toggleDeleteTripConfirmation = () =>
    setShowDeleteTripConfirmation(!showDeleteTripConfirmation);

  useEffect(() => {
    console.log("PROPS --->",props)
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

  const deleteTrip = () => {
    const { params } = props.match;
    tripService
      .deleteTrip(params.id)
      .then(() => {
        props.history.push("/trips");
      })
      .catch((err) => {
        console.log("Error while deleting trip: ", err);
      });
  };

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
    <li key={step._id}>Step {index+1} - {step.title}</li>
    )
  })

  return (
    <div>
      <h1>Trip details</h1>
      <h2>{state.trip.title}</h2>
      { state.steps && stepsList }
      <p></p>
      {state.loggedInUser && state.loggedInUser._id === state.trip.author._id && (
        <>
          <Button addStep={addStep} formButton="ADD A NEW STEP" /><br />
          <Button editTrip={editTrip} formButton="EDIT" />
          <Button
            toggleDeleteTripConfirmation={toggleDeleteTripConfirmation}
            formButton="DELETE"
            theme="lightcoral"
            color="white"
          />

          {showDeleteTripConfirmation && (
            <>
              <h4>Are you sure you want to delete this trip ? </h4>
              <Button
                deleteTrip={deleteTrip}
                formButton="YES"
                theme="lightcoral"
                color="white"
              />
              <Button
                toggleDeleteTripConfirmation={toggleDeleteTripConfirmation}
                formButton="CANCEL"
                theme="lightgrey"
                color="black"
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Trip;
