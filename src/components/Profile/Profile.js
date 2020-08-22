import React from 'react'

const Profile = props => {

  console.log("PROFILE",props)
  return (
    <div>
        <h1>Profile</h1>
        <h2>Welcome to your profile, {props.userInSession.username} !</h2>
    </div>
  )
}

export default Profile
