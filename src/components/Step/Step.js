import React, { useState, useEffect } from "react";
import tripService from "../Services/trip-service";
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

  const [showDeleteStepConfirmation, setShowDeleteStepConfirmation] = useState(
    false
  );

  const toggleDeleteStepConfirmation = () =>
    setShowDeleteStepConfirmation(!showDeleteStepConfirmation);
  
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

  const deleteStep = () => {
    const { params } = props.match;
    const tripId = state.step.trip._id
    stepService
      .deleteStep(params.id)
      .then(() => {
        props.history.push(`/trips/${tripId}`);
      })
      .catch((err) => {
        console.log("Error while deleting step: ", err);
      });
  };

  const editStep = () => {
    props.history.push({
      pathname: `/steps/edit/${state.step._id}`,
      state: { trip: state.trip }
    });
  };

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
        <p>Description: A step from this trip.</p>
      }
    </div>
  );
};

export default Step;
