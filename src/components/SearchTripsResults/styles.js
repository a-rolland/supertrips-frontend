import React, { useState, useEffect } from "react";
import tripService from "../Services/trip-service";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";

const Trips = (props) => {
  const initialState = {
    loggedInUser: null,
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
      const authorizedTripsList = await tripService.trips(
        (trip) => trip.author === props.userInSession._id || trip.isPublic
      );
      setState((state) => ({
        ...state,
        trips: authorizedTripsList,
      }));
    };
    fetchAuthorizedTripsList();
  }, [props.userInSession]);

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

  const listTrips = state.trips.map((trip) => {
    return (
      <li key={trip._id}>
        <Link
          to={{
            pathname: `/trips/${trip._id}`,
            state: { userInSession: state.loggedInUser, trip: trip },
          }}
        >
          {trip.title}
        </Link>
      </li>
    );
  });

  return (
    <div>
      <h1>Trips</h1>
      <SearchBar
        placeholder="Search for a trip.."
        searchUpdates={handleSearch}
      />
      {listTrips}
    </div>
  );
};

export default Trips;
