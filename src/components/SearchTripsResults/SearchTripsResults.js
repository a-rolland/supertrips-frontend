import React, {useState, useEffect} from "react";
import tripService from "../Services/trip-service";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";

const SearchTripsResults = props => {

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
    const fetchAuthorizedTripsList = async () => {
      const response = await tripService.trips()
      const authorizedTripsList = response.filter(trip => (trip.author === props.userInSession._id || trip.isPublic) && trip.title.toUpperCase().includes(props.location.state.searchKeys.toUpperCase()))
      setState(state => ({ 
        ...state,
        trips: authorizedTripsList
      }));
    }
    fetchAuthorizedTripsList()
  }, [props.userInSession]);

  const listTrips = state.trips.map(trip => {
    return (
      <li key={trip._id}><Link to={{pathname: `/trips/${trip._id}`, state: {userInSession: state.loggedInUser, trip: trip} }}>{trip.title}</Link></li>   
    )
  })

  return (
    <div>
      <h1>Search results for: "{props.location.state.searchKeys}"</h1>

      {listTrips}
    </div>
  );
};

export default SearchTripsResults;
