import React from 'react'
// import React, { useState, useEffect } from 'react'
// import tripService from "../Services/trip-service";
// import TripsList from "../TripsList/TripsList";
// import { Link } from "react-router-dom";
// import Button from '../ElementalComponents/Button/Button';
import TripsFetch from '../TripsFetch/TripsFetch';

const MyFavoriteTrips = (props) => {
  // const initialState = {
  //   loggedInUser: props.userInSession,
  //   trips: [],
  // };
  // const [state, setState] = useState(initialState);

  // useEffect(() => {
  //   setState((state) => ({
  //     ...state,
  //     loggedInUser: props.userInSession,
  //   }));
  //   const fetchAuthorizedTripsList = async () => {
  //     const response = await tripService.trips();
  //     const myTrips = response.filter(trip => state.loggedInUser.favorites.indexOf(trip._id) !== -1);
  //     setState((state) => ({
  //       ...state,
  //       trips: myTrips,
  //     }));
  //   };
  //   fetchAuthorizedTripsList();
  // }, [state.loggedInUser, props.userInSession]);

  // const handleUpdateTrips = () => {
  //   const fetchAuthorizedTripsList = async () => {
  //     const response = await tripService.trips();
  //     const myTrips = response.filter(trip => state.loggedInUser.favorites.indexOf(trip._id) !== -1);
  //     setState((state) => ({
  //       ...state,
  //       trips: myTrips,
  //     }));
  //   };
  //   fetchAuthorizedTripsList();
  // }

  // const listTrips = <TripsList
  //                     trips={state.trips}
  //                     userInSession={state.loggedInUser}
  //                     updateUser={props.updateUser}
  //                     updateTrips={handleUpdateTrips}
  //                   />

  return (
    // <div>
    //   <h1>My Favorite Trips</h1>
    //   { state.trips.length > 0
    //       ? listTrips
    //       : <>
    //           <p>You don't have any favorite trip yet !</p>
    //           <Link to="/trips">
    //             <Button formButton="CHECK TRIPS" width={"250px"} />
    //           </Link>
    //         </>
    //   }
    // </div>
    <TripsFetch myFavoriteTrips title="My Favorite Trips" userInSession={props.userInSession} {...props} />
  )
}

export default MyFavoriteTrips