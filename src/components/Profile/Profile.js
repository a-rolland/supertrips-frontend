import React, { useState } from 'react'
import CreateTripForm from '../CreateTripForm/CreateTripForm.js';
import Button from '../Button/Button.js';

const Profile = props => {

  const initialState = {
    showTripForm: false
  };

  const [state, setState] = useState(initialState);

  const toggleForm = () => {
    setState({ showTripForm: !state.showTripForm })
  }

  return (
    <div>
        <h1>Profile</h1>
        <h2>Welcome to your profile, {props.userInSession.username} !</h2>
        { 
          state.showTripForm ?
            <>
              <CreateTripForm {...props} toggleForm={toggleForm} />
              <Button toggleForm={toggleForm} formButton="CLOSE" />
            </>
          :
            <Button toggleForm={toggleForm} formButton="CREATE A NEW TRIP" />
        }
        
    </div>
  )
}

export default Profile
