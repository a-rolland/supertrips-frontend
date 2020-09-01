import React, { useState, useEffect } from "react";
import tripService from "../Services/trip-service";
import SearchBar from "../SearchBar/SearchBar";
import TripsList from "../TripsList/TripsList";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSuitcaseRolling } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import { AddLogo } from "./styles";

const Trips = (props) => {
  const initialState = {
    loggedInUser: props.userInSession,
    trips: [],
  };
  const [state, setState] = useState(initialState);

  // equiv. componentWillReceiveProps
  // Correct ?
  useEffect(() => {
    setState((state) => ({
      ...state,
      loggedInUser: props.userInSession,
    }));
    const fetchAuthorizedTripsList = async () => {
      const response = await tripService.trips();
      const authorizedTripsList = response.filter(trip =>  (state.loggedInUser && trip.author === props.userInSession._id) || trip.isPublic);
      setState((state) => ({
        ...state,
        trips: authorizedTripsList,
      }));
    };
    fetchAuthorizedTripsList();
  }, [state.loggedInUser, props.userInSession]);

  const handleSearch = async (currentSearch) => {
    const response = await tripService.trips();
    const filteredResponse = response.filter(
      (trip) =>
        (trip.author === props.userInSession._id || trip.isPublic) &&
        trip.title.toUpperCase().includes(currentSearch.toUpperCase())
    );
    setState((state) => ({
      ...state,
      trips: filteredResponse,
    }));
  };

  const listTrips = <TripsList
                      trips={state.trips}
                      userInSession={state.loggedInUser}
                    />

  return (
    <div>
      <h1>Trips</h1>
      <SearchBar
        placeholder="Search for a trip.."
        searchUpdates={handleSearch}
      />
      { listTrips }
      { state.loggedInUser &&
        <AddLogo>
          <Link to="/create-trip">
            <FontAwesomeIcon icon={faSuitcaseRolling} size="3x" />
            <span>NEW TRIP</span>
          </Link>
        </AddLogo>
      }
    </div>
  );
};

export default Trips;
