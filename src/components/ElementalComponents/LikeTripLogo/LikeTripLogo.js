import React from 'react'
import FontAwesomeIconComponent from '../FontAwesomeIconComponent/FontAwesomeIconComponent';
import { StyledThumbsUpLogo } from "./styles";
import tripService from '../../Services/trip-service';

const LikeTripLogo = props => {
  const handletoggleLikeTrip = (tripId) => {
    tripService.toggleLikes(tripId)
      .then(() => {
        props.updateTrips()
      })
      .catch(() => console.log("Error adding/removing Like to/from this trip"))
  }

  return (
    <StyledThumbsUpLogo userInSession={props.userInSession} tripDescription={props.tripDescription}>
      <FontAwesomeIconComponent
        tripDescription={props.tripDescription}
        chosenIcon={"faThumbsUp"}
        color={ props.tripDescription ? "grey" : props.trip.likes.indexOf(props.userInSession._id) !== -1 ? "royalblue" : "grey"}
        toggleLikeTrip={handletoggleLikeTrip}
        trip={props.trip}
        size="1x"
        userInSession={props.userInSession}
      />
    </StyledThumbsUpLogo> 
  )
}

export default LikeTripLogo


