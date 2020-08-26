import React from 'react'
import { ButtonStyled } from "./styles";

const Button = props => {

  const handleClick = () => {
    props.toggleForm && props.toggleForm()
    props.deleteTrip && props.deleteTrip()
    props.editTrip && props.editTrip()
    props.logoutUser && props.logoutUser()
  }

  return (
    <ButtonStyled type="submit" value={props.formButton} onClick={handleClick} theme={props.theme} color={props.color} />
  )
}

export default Button
