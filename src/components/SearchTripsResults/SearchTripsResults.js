import React, {useState, useEffect} from "react";
import tripService from "../Services/trip-service";
import TripsList from "../TripsList/TripsList";

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
      const authorizedTripsList = response.filter(trip => (trip.author._id === props.userInSession._id || trip.isPublic) && trip.title.toUpperCase().includes(props.location.state.searchKeys.toUpperCase()))
      setState(state => ({ 
        ...state,
        trips: authorizedTripsList
      }));
    }
    fetchAuthorizedTripsList()
  }, [props.userInSession, props.location.state.searchKeys]);

  const listTrips = <TripsList
                      trips={state.trips}
                      userInSession={state.loggedInUser}
                      updateUser={props.updateUser}
                    />

  return (
    <div>
      <h1>Search results for: "{props.location.state.searchKeys}"</h1>
      { }
      {listTrips}
    </div>
  );
};

export default SearchTripsResults;
