import React, { useState, useEffect } from "react";
import { StyledProfile } from "./styles";
import authService from "../Services/auth-service.js";
import tripService from "../Services/trip-service.js";
import ProfilePicture from "../ElementalComponents/ProfilePicture/ProfilePicture.js";
import TripsList from "../TripsList/TripsList.js";

const ProfilePublic = (props) => {
  const [profileUserState, setProfileUserState] = useState(null)
  const [profileUserTrips, setProfileUserTrips] = useState([])

  useEffect(() => {
    const fetchProfileUser = async () => {
      authService.getUser(props.match.params.userId)
        .then(foundUser => {
          setProfileUserState({profileUser: foundUser})
          tripService.trips()
            .then(allTrips => {
              const profileUserTrips = allTrips.filter(trip => trip.isPublic && trip.author._id === foundUser._id)
              setProfileUserTrips(profileUserTrips);
            })
        })
    };
    fetchProfileUser();
  }, [props.match.params.userId]);

  const handleUpdateTrips = () => {
    const fetchAuthorizedTripsList = async () => {
      const response = await tripService.trips();
      const profileUserTrips = response.filter(trip => trip.isPublic && trip.author._id === profileUserState.profileUser._id);
      setProfileUserTrips(profileUserTrips);
    };
    fetchAuthorizedTripsList();
  }

  const profileUserTripsList = <TripsList
                      trips={profileUserTrips}
                      userInSession={props.userInSession}
                      updateUser={props.updateUser}
                      updateTrips={handleUpdateTrips}
                    />

  return (
    <StyledProfile>
      { profileUserState &&
      <>
      <h1>{profileUserState.profileUser.username}</h1>
      <ProfilePicture src={profileUserState.profileUser.profilePicture} width="150px" height="150px" margin="0 auto 20px" />
      { profileUserState && profileUserTrips && 
        <ul>
          <h2>{ profileUserState.profileUser.username }'s trips :</h2>
          {profileUserTripsList}
        </ul>
      }
      </>
      }
    </StyledProfile>
  );
};

export default ProfilePublic;
