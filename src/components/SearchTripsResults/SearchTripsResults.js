import React from "react";
import TripsFetch from "../TripsFetch/TripsFetch";

const SearchTripsResults = (props) => {
  return (
    <TripsFetch searchTrips userInSession={props.userInSession} {...props} />
  );
};

export default SearchTripsResults;
