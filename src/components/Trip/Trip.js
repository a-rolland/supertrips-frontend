import React, { useState, useEffect } from "react";
import tripService from "../Services/trip-service";
import Button from "../Button/Button";

const Trip = (props) => {
  const initialState = {
    loggedInUser: null,
    trip: [],
  };
  const [state, setState] = useState(initialState);

  const [showDeleteTripConfirmation, setShowDeleteTripConfirmation] = useState(false);

  const toggleDeleteTripConfirmation = () => setShowDeleteTripConfirmation(!showDeleteTripConfirmation);

  useEffect(() => {
    tripService
      .tripDetails(props.location.state.trip._id)
      .then((response) => {
        console.log("Trip details :", response);
        setState((state) => ({
          loggedInUser: props.location.state.userInSession,
          trip: response,
        }));
      })
      .catch((error) =>
        console.log("Error while getting trip details :", error)
      );
  }, [props.location.state.userInSession, props.location.state.trip._id]);

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
      state: { trip: state.trip },
    });
  };

  return (
    <div>
      <h1>Trip details</h1>
      <h2>{state.trip.title}</h2>
      <p></p>
      {state.loggedInUser && state.loggedInUser._id === state.trip.author._id && (
        <>
          <Button editTrip={editTrip} formButton="EDIT" />
          <Button
            toggleDeleteTripConfirmation={toggleDeleteTripConfirmation}
            formButton="DELETE"
            theme="lightcoral"
            color="white"
          />
          { showDeleteTripConfirmation && 
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
          }
        </>
      )}
    </div>
  );
};

export default Trip;
