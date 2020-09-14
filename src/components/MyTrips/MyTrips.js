import React from 'react'
import TripsFetch from '../TripsFetch/TripsFetch';

const MyTrips = (props) => {

  return (
    <TripsFetch myTrips title="My Trips" userInSession={props.userInSession} {...props} />
  )
}

export default MyTrips