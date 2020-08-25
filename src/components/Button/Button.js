import React from 'react'
import { ButtonStyled } from "./styles";

const Button = props => {
  return (
    <ButtonStyled type="submit" value={props.formButton} />
  )
}

export default Button
