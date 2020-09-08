import React, { useState, useEffect } from 'react'
import tripService from "../Services/trip-service";
import TripsList from "../TripsList/TripsList";
import { Link } from "react-router-dom";
import { AddLogo } from "./styles";
import Button from '../ElementalComponents/Button/Button';
import FontAwesomeIconComponent from '../ElementalComponents/FontAwesomeIconComponent/FontAwesomeIconComponent';

const MyFavoriteTrips = (props) => {
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
      const myTrips = response.filter(trip => state.loggedInUser.favorites.indexOf(trip._id) !== -1);
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
      <h1>My Favorite Trips</h1>
      { state.trips.length > 0
          ? listTrips
          : <>
              <p>You don't have any favorite trip yet !</p>
              <Link to="/trips">
                <Button formButton="CHECK TRIPS" width={"250px"} />
              </Link>
            </>
      }
      { state.loggedInUser &&
        <AddLogo>
          <Link to="/create-trip">
            <FontAwesomeIconComponent chosenIcon={"faSuitcaseRolling"} size="2x" />
            <span>NEW TRIP</span>
          </Link>
        </AddLogo>
      }
    </div>
  )
}

export default MyFavoriteTrips