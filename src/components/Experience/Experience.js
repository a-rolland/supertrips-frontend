import React, { useState, useEffect } from "react";
// import stepService from "../Services/step-service";
import experienceService from "../Services/experience-service";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronRight, faFeatherAlt } from '@fortawesome/free-solid-svg-icons'
import { StyledExperience, OwnerControls, StyledStepHeader } from "./styles"
import { Link } from "react-router-dom";

const Experience = (props) => {
  const initialState = {
    loggedInUser: null,
    experience: [],
    expanded: false
  };
  const [state, setState] = useState(initialState);
  
  const toggleExpand = () => {
    setState(state => ({
      ...state,
      expanded: !state.expanded
    }))
  }

  useEffect(() => {
    experienceService
      .experienceDetails(props.experience._id)
      .then((response) => {
        console.log("Experience details :", response);
        setState((state) => ({
          ...state,
          loggedInUser: props.userInSession,
          experience: response
        }));
      })
      .catch((error) =>
        console.log("Error while getting experience details :", error)
      );
  }, [props.userInSession, props.experience._id]);

  return (
    <StyledExperience>
      <StyledStepHeader onClick={toggleExpand}>
        {
          state.expanded
          ? <FontAwesomeIcon icon={faChevronDown} />
          : <FontAwesomeIcon icon={faChevronRight} />
        }
        {state.experience.title}  
      </StyledStepHeader>
      {
        state.expanded &&
        <>
          <p>Description: An experience from this trip.</p>
          {
            state.loggedInUser && state.loggedInUser._id === props.author._id &&
              <>
                <OwnerControls>
                  <Link to={`/trips/${state.experience.step.trip}/steps/${state.experience.step._id}/edit-experience/${state.experience._id}`}>
                    <FontAwesomeIcon icon={faFeatherAlt} />
                    <span>Edit experience</span>
                  </Link>
                </OwnerControls>
              </>
          }
        </>
      }  
    </StyledExperience>
  );
};

export default Experience;
