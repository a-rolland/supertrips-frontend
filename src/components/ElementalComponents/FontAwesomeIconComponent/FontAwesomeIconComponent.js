import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHourglassHalf,
  faFeatherAlt,
  faPlus,
  faAsterisk,
  faChevronCircleRight,
  faChevronCircleDown,
  faChevronRight,
  faChevronDown,
  faTimes,
  faBars,
  faSpinner,
  faArrowCircleLeft,
  faClock,
  faCalendarAlt,
  faPlusSquare,
  faMinusSquare,
  faCommentDots,
  faHeart,
  faTrashAlt,
  faPenSquare,
  faThumbsUp,
  faCommentAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";

const FontAwesomeIconComponent = (props) => {
  let icon;
  switch (props.chosenIcon) {
    case "faHourglassHalf":
      icon = faHourglassHalf;
      break;
    case "faFeatherAlt":
      icon = faFeatherAlt;
      break;
    case "faPlus":
      icon = faPlus;
      break;
    case "faAsterisk":
      icon = faAsterisk;
      break;
    case "faChevronCircleRight":
      icon = faChevronCircleRight;
      break;
    case "faChevronCircleDown":
      icon = faChevronCircleDown;
      break;
    case "faTimes":
      icon = faTimes;
      break;
    case "faBars":
      icon = faBars;
      break;
    case "faSpinner":
      icon = faSpinner;
      break;
    case "faChevronRight":
      icon = faChevronRight;
      break;
    case "faChevronDown":
      icon = faChevronDown;
      break;
    case "faArrowCircleLeft":
      icon = faArrowCircleLeft;
      break;
    case "faClock":
      icon = faClock;
      break;
    case "faCalendarAlt":
      icon = faCalendarAlt;
      break;
    case "faPlusSquare":
      icon = faPlusSquare;
      break;
    case "faMinusSquare":
      icon = faMinusSquare;
      break;
    case "faCommentDots":
      icon = faCommentDots;
      break;
    case "faHeart":
      icon = faHeart;
      break;
    case "faTrashAlt":
      icon = faTrashAlt;
      break;
    case "faPenSquare":
      icon = faPenSquare;
      break;
    case "faThumbsUp":
      icon = faThumbsUp;
      break;
    case "faFacebook":
      icon = faFacebook;
      break;
    case "faCommentAlt":
      icon = faCommentAlt;
      break;
    default:
      icon = null;
  }

  const handleClick = () => {
    props.toggleDropdown && props.toggleDropdown();
    props.toggleAddToFavorites && props.toggleAddToFavorites(props.trip._id);
    props.deleteExperiencePicture &&
      props.deleteExperiencePicture(props.picture._id);
    props.toggleLikeTrip &&
      props.userInSession &&
      !props.tripDescription &&
      props.toggleLikeTrip(props.trip._id);
  };

  return (
    <FontAwesomeIcon
      icon={icon}
      size={props.size}
      color={props.color}
      onMouseEnter={props.handleMouseEnter}
      onMouseLeave={props.handleMouseLeave}
      onClick={handleClick}
    />
  );
};

export default FontAwesomeIconComponent;
