import React from "react";
import { ButtonStyled } from "./styles";

const Button = (props) => {
  const handleClick = () => {
    props.toggleDeleteConfirmation && props.toggleDeleteConfirmation()
    props.deleteItem && props.deleteItem()
    // props.toggleDeleteTripConfirmation && props.toggleDeleteTripConfirmation();
    // props.toggleDeleteStepConfirmation && props.toggleDeleteStepConfirmation();
    // props.toggleDeleteExperienceConfirmation && props.toggleDeleteExperienceConfirmation();
    // props.deleteTrip && props.deleteTrip();
    // props.deleteStep && props.deleteStep();
    // props.deleteExperience && props.deleteExperience();
    props.logoutUser && props.logoutUser();
  };

  return (
    <ButtonStyled
      type="submit"
      value={props.formButton}
      onClick={handleClick}
      theme={props.theme}
      color={props.color}
      width={props.width}
    />
  );
};

export default Button;
