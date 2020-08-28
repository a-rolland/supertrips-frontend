import React from 'react'
import { Ul, LiContainer, Li } from "./styles"
import { Link } from 'react-router-dom';

const TripsList = props => {

  const listTrips = props.trips.map((trip) => {
    return (
      <Li key={trip._id}>
        <Link
          to={{
            pathname: `/trips/${trip._id}`,
            state: { userInSession: props.loggedInUser, trip: trip },
          }}
        >
          {trip.title}
        </Link>
      </Li>
    );
  });

  return (
    <Ul>
        <LiContainer>
          {listTrips}
        </LiContainer>
      </Ul>
  )
}

export default TripsList


