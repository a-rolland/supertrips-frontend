import React, { useState } from 'react'
import CreateTripForm from '../CreateTripForm/CreateTripForm';

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
              <CreateTripForm key="tripForm" formButton="SAVE" toggleForm={toggleForm} />
              <button onClick={toggleForm}>CLOSE</button>
            </>
          :
            <button onClick={toggleForm}>CREATE A NEW TRIP</button>
        }
        
    </div>
  )
}

export default Profile
