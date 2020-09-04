import React, { useState, useEffect } from 'react'
import tripService from "../Services/trip-service";
import TripsList from "../TripsList/TripsList";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSuitcaseRolling } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import { AddLogo } from "./styles";
import Button from '../Button/Button';

const MyTrips = (props) => {
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
      const myTrips = response.filter(trip =>  state.loggedInUser._id === trip.author);
      setState((state) => ({
        ...state,
        trips: myTrips,
      }));
    };
    fetchAuthorizedTripsList();
  }, [state.loggedInUser, props.userInSession]);

  const listTrips = <TripsList
                      trips={state.trips}
                      userInSession={state.loggedInUser}
                    />

  return (
    <div>
      <h1>My Trips</h1>
      { state.trips.length > 0
          ? listTrips
          : <>
              <p>You don't have any trip yet !</p>
              <Link to="/create-trip">
                <Button formButton="CREATE A NEW TRIP" width={"250px"} />
              </Link>
            </>
      }
      { state.loggedInUser &&
        <AddLogo>
          <Link to="/create-trip">
            <FontAwesomeIcon icon={faSuitcaseRolling} size="2x" />
            <span>NEW TRIP</span>
          </Link>
        </AddLogo>
      }
    </div>
  )
}

export default MyTrips