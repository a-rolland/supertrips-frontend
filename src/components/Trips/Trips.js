import React, {useState, useEffect} from "react";
import tripService from "../Services/trip-service";
import { Link } from "react-router-dom";

const Trips = props => {

  const initialState = { 
    loggedInUser: null,
    trips: []
   };
  const [state, setState] = useState(initialState);

  // equiv. componentWillReceiveProps
  // Correct ?
  useEffect(() => {
    setState(state => ({
      ...state,
      loggedInUser: props.userInSession,
    }))
    tripService.trips()
      .then(response => {
        // console.log("Trips :", response)
        // Filter : show public trips or user's trips
        const filteredResponse = response.filter(trip => trip.author === props.userInSession._id || trip.isPublic)
        console.log("Filtered trips :", filteredResponse)
        setState(state => ({ 
          ...state,
          trips: filteredResponse
        }));
      })
      .catch((error) => console.log(error));
  }, [props.userInSession]);

  const listTrips = state.trips.map(trip => {
    return (
      <li key={trip._id}><Link to={{pathname: `/trips/${trip._id}`, state: {userInSession: state.loggedInUser, trip: trip} }}>{trip.title}</Link></li>   
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
