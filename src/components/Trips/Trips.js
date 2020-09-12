import React, { useState, useEffect } from "react";
import tripService from "../Services/trip-service";
import SearchBar from "../SearchBar/SearchBar";
import TripsList from "../TripsList/TripsList";
import { Link } from "react-router-dom";
import { StyledTrips, AddLogo } from "./styles";
import FontAwesomeIconComponent from "../ElementalComponents/FontAwesomeIconComponent/FontAwesomeIconComponent";

const Trips = (props) => {
  const initialState = {
    loggedInUser: props.userInSession,
    trips: [],
  };
  const [state, setState] = useState(initialState);
  
  useEffect(() => {
    setState((state) => ({
      ...state,
      loggedInUser: props.userInSession,
    }));
    const fetchAuthorizedTripsList = async () => {
      const response = await tripService.trips();
      const authorizedTripsList = response.filter(trip =>  (state.loggedInUser && trip.author._id === props.userInSession._id) || trip.isPublic);
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
        (trip.author._id === props.userInSession._id || trip.isPublic) &&
        trip.title.toUpperCase().includes(currentSearch.toUpperCase())
    );
    setState((state) => ({
      ...state,
      trips: filteredResponse,
    }));
  };

  const handleUpdateTrips = () => {
    const fetchAuthorizedTripsList = async () => {
      const response = await tripService.trips();
      const authorizedTripsList = response.filter(trip =>  (state.loggedInUser && trip.author._id === props.userInSession._id) || trip.isPublic);
      setState((state) => ({
        ...state,
        trips: authorizedTripsList,
      }));
    };
    fetchAuthorizedTripsList()
  }

  const listTrips = <TripsList
                      trips={state.trips}
                      userInSession={state.loggedInUser}
                      updateUser={props.updateUser}
                      updateTrips={handleUpdateTrips}
                    />

  return (
    <StyledTrips>
      <h1>Trips</h1>
      <SearchBar
        placeholder="Search for a trip.."
        searchUpdates={handleSearch}
      />
      { listTrips }
      { state.loggedInUser &&
        <AddLogo>
          <Link to="/create-trip">
            <FontAwesomeIconComponent chosenIcon={"faSuitcaseRolling"} size="2x" />
            <span>CREATE</span>
            <span>TRIP</span>
          </Link>
        </AddLogo>
      }
    </StyledTrips>
  );
};

export default Trips;
