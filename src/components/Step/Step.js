import React, { useState, useEffect } from "react";
// import tripService from "../Services/trip-service";
import stepService from "../Services/step-service";
import Button from "../Button/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { StyledStepHeader } from "./styles"

const Step = (props) => {
  const initialState = {
    loggedInUser: null,
    step: [],
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
    stepService
      .stepDetails(props.step._id)
      .then((response) => {
        console.log("Step details :", response);
        setState((state) => ({
          ...state,
          loggedInUser: props.userInSession,
          step: response
        }));
      })
      .catch((error) =>
        console.log("Error while getting step details :", error)
      );
  }, [props.userInSession, props.step.trip._id]);

  const editStep = () => {
    props.history.push({
      pathname: `/trips/${state.step.trip._id}/edit-step/${state.step._id}`,
    });
  };

  const addExperience = () => {
    // ETC
  }

  return (
    <div>
      <StyledStepHeader onClick={toggleExpand}>
        {
          state.expanded
          ? <FontAwesomeIcon icon={faChevronDown} />
          : <FontAwesomeIcon icon={faChevronRight} />
        }
        {state.step.title}  
      </StyledStepHeader>
      {
        state.expanded &&
        <>
          <p>Description: A step from this trip.</p>
          {
            state.loggedInUser && state.loggedInUser._id === state.step.trip.author &&
              <>
                <Button addExperience={addExperience} formButton="ADD A NEW EXPERIENCE" />
                <Button editStep={editStep} formButton="EDIT" />
              </>
          }
        </>
      }  
    </div>
  );
};

export default Step;
