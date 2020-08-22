import React, {useState, useEffect} from "react";
import tripService from "../Services/trip-service";

const Trips = props => {

  const initialState = { 
    loggedInUser: null,
    trips: []
   };
  const [state, setState] = useState(initialState);

  // equiv. componentWillReceiveProps
  // Correct ?
  useEffect(() => {
    tripService.trips()
      .then(response => {
        console.log("Trips :", response)
        setState({ 
          loggedInUser: props.userInSession,
          trips: response
        });
      })
      .catch((error) => console.log(error));
  }, [props.userInSession]);

  const listTrips = state.trips.map(trip => {
    return (
      <li key={trip._id}>{trip.title}</li>   
    )
  })

  return (
    <div>
      <h1>Trips</h1>
      {listTrips}
    </div>
  );
};

export default Trips;
