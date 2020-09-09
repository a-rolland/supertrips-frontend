import React from 'react'
import { Ul, LiContainer, Li, TripContainer } from "./styles"
import { Link } from 'react-router-dom';
import ProfilePicture from '../ElementalComponents/ProfilePicture/ProfilePicture';
import FontAwesomeIconComponent from '../ElementalComponents/FontAwesomeIconComponent/FontAwesomeIconComponent';
import AddToFavoritesLogo from '../ElementalComponents/AddToFavoritesLogo/AddToFavoritesLogo';
import LikeTripLogo from '../ElementalComponents/LikeTripLogo/LikeTripLogo';

const TripsList = props => {
  const listTrips = props.trips.map((trip) => {
    return (
      <Li key={trip._id}>
        <TripContainer>
          <Link
            to={{
              pathname: `/trips/${trip._id}`,
              state: { userInSession: props.loggedInUser, trip: trip },
            }}
          >
            {trip.imageUrl &&
              <img src={trip.imageUrl} alt="trip cover pic" />
            }
          </Link>
          <div>
            <span>
              <Link
                to={{
                  pathname: `/trips/${trip._id}`,
                  state: { userInSession: props.loggedInUser, trip: trip },
                }}
              >
                <h3>{trip.title}</h3>
              </Link>
              { props.userInSession && 
                <AddToFavoritesLogo
                  trip={trip}
                  userInSession={props.userInSession}
                  updateUser={props.updateUser}
                />
              }
            </span>
            <div>
              <FontAwesomeIconComponent
                chosenIcon={"faHourglassHalf"}
                size="1x"
              />
              <span>{trip.duration} days</span>
            </div>
            <div>
              <LikeTripLogo
                trip={trip}
                userInSession={props.userInSession}
                updateTrips={props.updateTrips}
              />
              <span>{trip.likes.length} likes</span>
            </div>
            <div style={{display:"flex", alignItems:"center", marginTop:"20px"}}>
              <ProfilePicture
                src={trip.author.profilePicture}
                width="20px"
                height="20px"
                margin="5px 10px 5px 0"
                display="inline-block"
              />
              <span>By <Link to="#">{trip.author.username}</Link></span>
            </div>
          </div>
        </TripContainer>
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


