import React from 'react'
import { Ul, LiContainer, Li } from "./styles"
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHourglassHalf } from '@fortawesome/free-solid-svg-icons'

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
          {trip.imageUrl &&
            <img src={trip.imageUrl} alt="trip cover pic" />
          }
          <div>
            <h4>{trip.title}</h4>
            <div>
              <FontAwesomeIcon icon={faHourglassHalf} size="1x" />
              <span>{trip.duration} days</span>
            </div>
          </div>
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


