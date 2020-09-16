import React from "react";
import { ButtonStyled } from "./styles";

const Button = (props) => {
  const handleClick = () => {
    props.toggleDeleteConfirmation && props.toggleDeleteConfirmation();
    props.closeDeleteConfirmation && props.closeDeleteConfirmation();
    props.deleteItem && props.deleteItem();
    props.toggleProfilePictureForm && props.toggleProfilePictureForm();
    props.logoutUser && props.logoutUser();
    props.toggleShowInGallery && props.toggleShowInGallery();
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
