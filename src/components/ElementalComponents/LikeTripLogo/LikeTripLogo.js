import React, { useState, useCallback } from 'react'
import FontAwesomeIconComponent from '../FontAwesomeIconComponent/FontAwesomeIconComponent';
import { StyledThumbsUpLogo } from "./styles";
import tripService from '../../Services/trip-service';

const LikeTripLogo = props => {
  const initialState = {trip: props.trip}
  const [tripState, setTripState] = useState(initialState)

  const updateTrip = useCallback(() => 
    tripService.tripDetails(props.trip._id)
      .then(response => {
        setTripState({trip: response})
      })
      .catch(error => console.log("Error adding/removing Like to/from this trip: ", error))
  , []);

  const handletoggleLikeTrip = (tripId) => {
    tripService.toggleLikes(tripId)
      .then(() => {
        updateTrip()
        props.updateTrips()
      })
      .catch(err => console.log("Error adding/removing Like to/from this trip: ", err))
  }

  return (
    <StyledThumbsUpLogo>
      <FontAwesomeIconComponent
        chosenIcon={"faThumbsUp"}
        color={ props.trip.likes.indexOf(props.userInSession._id) !== -1 ? "blue" : "grey"}
        toggleLikeTrip={handletoggleLikeTrip}
        trip={props.trip}
        size="1x"
      />
    </StyledThumbsUpLogo> 
  )
}

export default LikeTripLogo


