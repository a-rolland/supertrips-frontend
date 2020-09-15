import React from "react";
import TripsFetch from "../TripsFetch/TripsFetch";

const Trips = (props) => {
  return (
    <TripsFetch
      allTrips
      title="All Trips"
      userInSession={props.userInSession}
      {...props}
    />
  );
};

export default Trips;
