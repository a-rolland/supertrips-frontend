import React, { useState, useCallback } from 'react'
import FontAwesomeIconComponent from '../FontAwesomeIconComponent/FontAwesomeIconComponent';
import authService from "../../Services/auth-service";

const AddToFavoritesLogo = props => {
  const initialState = {loggedInUser: props.userInSession}
  const [userState, setUserState] = useState(initialState)

  const updateUser = useCallback(() => 
    authService.loggedIn()
      .then(response => {
        setUserState({loggedInUser: response})
      })
      .catch(error => console.log("Error adding/removing to/from favorite trips: ", error))
  , []);

  const handleToggleAddToFavorites = (tripId) => {
    authService.toggleAddToFavorites(tripId)
      .then(() => updateUser())
      .catch(err => console.log("An error occurred while adding/removing to/from favorites: ",err))
  }

  return (
    <FontAwesomeIconComponent
      chosenIcon={"faHeart"}
      color={ userState.loggedInUser.favorites.indexOf(props.trip._id) !== -1 ? "red" : "grey"}
      toggleAddToFavorites={handleToggleAddToFavorites}
      trip={props.trip}
    />
  )
}

export default AddToFavoritesLogo


