import React, { useState, useEffect } from "react";
import tripService from "../Services/trip-service";
import SearchBar from "../SearchBar/SearchBar";
import TripsList from "../TripsList/TripsList";
import { Link } from "react-router-dom";
import { StyledTrips } from "./styles";
import Button from '../ElementalComponents/Button/Button';

const TripsFetch = (props) => {
  const initialState = {
    loggedInUser: props.userInSession,
    trips: [],
  };
  const [state, setState] = useState(initialState);

  const query = (props.searchTrips && new URLSearchParams(props.location.search).get("title")) || ""

  useEffect(() => {
    setState((state) => ({
      ...state,
      loggedInUser: props.userInSession,
    }));
    const fetchAuthorizedTripsList = async () => {
      const response = await tripService.trips();
      const authorizedTripsList = props.allTrips
        ? response.filter(trip =>  (state.loggedInUser && trip.author._id === props.userInSession._id) || trip.isPublic)
        : props.myTrips
        ? response.filter(trip =>  state.loggedInUser._id === trip.author._id)
        : props.myFavoriteTrips
        ? response.filter(trip => state.loggedInUser.favorites.indexOf(trip._id) !== -1)
        : response.filter(trip => ((props.userInSession && trip.author._id === props.userInSession._id) || trip.isPublic) && trip.title.toUpperCase().includes(query.toUpperCase()))
      
      setState((state) => ({
        ...state,
        trips: authorizedTripsList,
      }));
    };
    fetchAuthorizedTripsList();
  }, [state.loggedInUser, props.userInSession, props.allTrips, props.myFavoriteTrips, props.myTrips, props.searchTrips, query]);

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
      const authorizedTripsList = props.allTrips
        ? response.filter(trip =>  (state.loggedInUser && trip.author._id === props.userInSession._id) || trip.isPublic)
        : props.myTrips
        ? response.filter(trip =>  state.loggedInUser._id === trip.author._id)
        : props.myFavoriteTrips
        ? response.filter(trip => state.loggedInUser.favorites.indexOf(trip._id) !== -1)
        : response.filter(trip => ((props.userInSession && trip.author._id === props.userInSession._id) || trip.isPublic) && trip.title.toUpperCase().includes(query.toUpperCase()))
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
  
  const listTripsLength = state.trips && state.trips.length

  return (
    <StyledTrips allTrips={props.allTrips} searchTrips={props.searchTrips} myFavoriteTrips={props.myFavoriteTrips}>
      <h1>
        { props.searchTrips
            ? `Search results for: "${query}"`
            : props.title
        }
      </h1>
      { props.allTrips &&
        <SearchBar
        placeholder="Search for a trip.."
        searchUpdates={handleSearch}
      />
      }
      { props.allTrips && props.userInSession && 
        <p>
          <Link to="/create-trip">
            <Button formButton="CREATE A NEW TRIP" width={"250px"} />
          </Link>
        </p>
      }
      { props.myTrips || props.myFavoriteTrips
        ? state.trips.length > 0
            ? props.myTrips
              ? <>
                  <Link to="/create-trip">
                    <Button formButton="CREATE A NEW TRIP" width={"250px"} />
                  </Link>
                  { listTrips }
                </>
              : <ul>
                  { listTrips }
                </ul>     
            : <>
                <p>{ props.myTrips
                      ? "You don't have any trip yet !"
                      : "You don't have any favorite trip yet !"}
                </p>
                { props.myTrips
                    ? 
                      <Link to="/create-trip">
                        <Button formButton="CREATE A NEW TRIP" width={"250px"} />
                      </Link>
                    : 
                      <Link to="/trips">
                        <Button formButton="CHECK TRIPS" width={"250px"} />
                      </Link>
                }
                
              </>
        : props.searchTrips
        ? state.trips && state.trips.length > 0 
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
        :
          listTrips
      }
    </StyledTrips>
  );
}

export default TripsFetch;