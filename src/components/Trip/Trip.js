import React,  { useState, useEffect } from 'react'
import tripService from "../Services/trip-service";
import { Link } from 'react-router-dom';

const Trip = props => {
  const initialState = { 
    loggedInUser: null,
    trip: []
  };
  const [state, setState] = useState(initialState);

  useEffect(() => {
    tripService.tripDetails(props.location.state.trip._id)
      .then(response => {
        console.log("Trip details :", response)
        setState(state => ({
          loggedInUser: props.location.state.userInSession,
          trip: response
        }))
      })
      .catch((error) => console.log("Error while getting trip details :", error));
  }, [props.location.state.userInSession]);

  const deleteTrip = () => {
    const { params } = props.match;
    tripService.deleteTrip(params.id)
    .then(() =>{
      props.history.push('/trips')     
    })
    .catch((err)=>{
        console.log("Error while deleting trip: ", err)
    })
  }

  return (
    <div>
      <h1>Trip details</h1>
      <h2>{state.trip.title}</h2>
      <p></p>
      { state.loggedInUser && state.loggedInUser._id === state.trip.author._id &&
        <>
          <button><Link to={{pathname: `/trips/edit/${state.trip._id}`, state: {trip: state.trip} }}>EDIT</Link></button>
          <button onClick={deleteTrip}>DELETE</button>
        </>
      }
    </div>
  )
}

export default Trip
