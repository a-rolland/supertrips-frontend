import React from "react";
import { ButtonStyled } from "./styles";

const Button = (props) => {
  const handleClick = () => {
    props.toggleForm && props.toggleForm();
    props.toggleDeleteTripConfirmation && props.toggleDeleteTripConfirmation();
    props.toggleDeleteStepConfirmation && props.toggleDeleteStepConfirmation();
    props.deleteTrip && props.deleteTrip();
    props.deleteStep && props.deleteStep();
    props.editTrip && props.editTrip();
    props.editStep && props.editStep();
    props.addStep && props.addStep();
    props.addExperience && props.addExperience();
    props.logoutUser && props.logoutUser();
  };

  return (
    <ButtonStyled
      type="submit"
      value={props.formButton}
      onClick={handleClick}
      theme={props.theme}
      color={props.color}
    />
  );
};

export default Button;
