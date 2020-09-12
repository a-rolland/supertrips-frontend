import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import Button from "../ElementalComponents/Button/Button";
import tripService from "../Services/trip-service";
import TripsList from "../TripsList/TripsList";

const SearchTripsResults = props => {

  const initialState = { 
    loggedInUser: null,
    trips: []
   };
  const [state, setState] = useState(initialState);

  const query = new URLSearchParams(props.location.search).get("title") || ""

  // equiv. componentWillReceiveProps
  // Correct ?
  useEffect(() => {
    setState(state => ({
      ...state,
      loggedInUser: props.userInSession,
    }))
    const fetchAuthorizedTripsList = async () => {
      const response = await tripService.trips()
      const authorizedTripsList = response.filter(trip => ((props.userInSession && trip.author._id === props.userInSession._id) || trip.isPublic) && trip.title.toUpperCase().includes(query.toUpperCase()))
      setState(state => ({ 
        ...state,
        trips: authorizedTripsList
      }));
    }
    fetchAuthorizedTripsList()
  }, [props.userInSession, props.location.search, query]);

  const listTrips = <TripsList
                      trips={state.trips}
                      userInSession={state.loggedInUser}
                      updateUser={props.updateUser}
                    />
  
  const listTripsLength = state.trips && state.trips.length

  return (
    <div>
      <h1>Search results for: "{query}"</h1>
      { state.trips && state.trips.length > 0 
        ?
          <React.Fragment>
            <p>{listTripsLength} trip{listTripsLength > 1 && "s"} found.</p>
            <ul>
              {listTrips}
            </ul>
          </React.Fragment>
        :
          <React.Fragment>
            <p>0 trip found.</p>
            <Link to="/trips">
                <Button formButton="SEE ALL TRIPS" />
            </Link>
          </React.Fragment>
      }
    </div>
  );
};

export default SearchTripsResults;
