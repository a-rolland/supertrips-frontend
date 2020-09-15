import React from "react";
import TripsFetch from "../TripsFetch/TripsFetch";

const MyFavoriteTrips = (props) => {
  return (
    <TripsFetch
      myFavoriteTrips
      title="My Favorite Trips"
      userInSession={props.userInSession}
      {...props}
    />
  );
};

export default MyFavoriteTrips;
