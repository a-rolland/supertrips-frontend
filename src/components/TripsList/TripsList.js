import React from 'react'
import { Ul, LiContainer, Li, TripContainer, SinglePictureContainer } from "./styles"
import { Link } from 'react-router-dom';
import ProfilePicture from '../ElementalComponents/ProfilePicture/ProfilePicture';
import FontAwesomeIconComponent from '../ElementalComponents/FontAwesomeIconComponent/FontAwesomeIconComponent';
import AddToFavoritesLogo from '../ElementalComponents/AddToFavoritesLogo/AddToFavoritesLogo';
import LikeTripLogo from '../ElementalComponents/LikeTripLogo/LikeTripLogo';

const TripsList = props => {
  const listTrips = props.trips.map((trip) => {
    return (
      <Li key={trip._id}>
        <TripContainer popularTrips={props.popularTrips}>
          <SinglePictureContainer>
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
            { props.userInSession && !props.popularTrips &&
              <LikeTripLogo
                trip={trip}
                userInSession={props.userInSession}
                updateTrips={props.updateTrips}
              />
            }
          </SinglePictureContainer>
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
              { props.userInSession && !props.popularTrips &&
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
            <div style={{marginTop:"15px"}}>
              <LikeTripLogo
                tripDescription
                trip={trip}
                userInSession={props.userInSession}
                updateTrips={props.updateTrips}
              />
              <span>{trip.likes.length}</span>
            </div>
            <div style={{display:"flex", alignItems:"center", marginTop:"20px"}}>
              <ProfilePicture
                src={trip.author.profilePicture}
                width="20px"
                height="20px"
                margin="5px 10px 5px 0"
                display="inline-block"
              />
              <span>
                By <Link to={ props.userInSession && props.userInSession._id === trip.author._id
                  ? "/profile"
                  : `/profile/user/${trip.author._id}`
                }
                >{trip.author.username}
                </Link>
              </span>
            </div>
          </div>
        </TripContainer>
      </Li>
    );
  });

  return (
    <Ul>
      <LiContainer popularTrips={props.popularTrips}>
        {listTrips}
      </LiContainer>
    </Ul>
  )
}

export default TripsList


