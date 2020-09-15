import React from "react";
import { StyledProfilePicture } from "./styles";

const ProfilePicture = (props) => {
  return (
    <StyledProfilePicture
      src={props.src}
      width={props.width}
      height={props.height}
      margin={props.margin}
      display={props.display}
    />
  );
};

export default ProfilePicture;
