import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHourglassHalf,
  faSuitcaseRolling,
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
  faCommentDots

} from '@fortawesome/free-solid-svg-icons'

const FontAwesomeIconComponent = props => {
  let icon;
  switch(props.chosenIcon) {
    case "faHourglassHalf":
      icon = faHourglassHalf
      break;
    case "faSuitcaseRolling":
      icon = faSuitcaseRolling
      break;
    case "faFeatherAlt":
      icon = faFeatherAlt
      break;
    case "faPlus":
      icon = faPlus
      break;
    case "faAsterisk":
      icon = faAsterisk
      break;
    case "faChevronCircleRight":
      icon = faChevronCircleRight
      break;
    case "faChevronCircleDown":
      icon = faChevronCircleDown
      break;
    case "faTimes":
      icon = faTimes
      break;
    case "faBars":
      icon = faBars
      break;
    case "faSpinner":
      icon = faSpinner
      break;
    case "faChevronRight":
      icon = faChevronRight
      break;
    case "faChevronDown":
      icon = faChevronDown
      break;
    case "faArrowCircleLeft":
      icon = faArrowCircleLeft
      break;
    case "faClock":
      icon = faClock
      break;
    case "faCalendarAlt":
      icon = faCalendarAlt
      break;
    case "faPlusSquare":
      icon = faPlusSquare
      break;
    case "faMinusSquare":
      icon = faMinusSquare
      break;
    case "faCommentDots":
      icon = faCommentDots
      break;
    default:
      icon = null
  }

  return (
    <FontAwesomeIcon
      icon={icon}
      size={props.size}
      color={props.color}
      onMouseEnter={props.handleMouseEnter}
      onMouseLeave={props.handleMouseLeave}
      onClick={props.handleClick}
    />
  )
}

export default FontAwesomeIconComponent
