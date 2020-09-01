import React, { useState, useEffect } from "react";
import tripService from "../Services/trip-service";
import stepService from "../Services/step-service";
import experienceService from "../Services/experience-service";
import Experience from "../Experience/Experience"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronRight, faAsterisk, faEdit } from '@fortawesome/free-solid-svg-icons'
import { StyledStep, OwnerControls, StyledStepHeader, Ul, Box, Li } from "./styles"
import { Link } from "react-router-dom";

const Step = (props) => {
  const initialState = {
    loggedInUser: null,
    step: [],
    experiences: [],
    author: [],
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
        experienceService
          .experiences(props.step._id)
            .then((response) => {
              console.log("Experiences of this step:", response)
              setState((state) => ({
                ...state,
                experiences: response
              }));
            })
            .catch((error) => 
              console.log("Error while getting experiences :", error
            ))
        tripService
            .tripDetails(props.step.trip)
              .then((response) => {
                setState(state => ({
                  ...state,
                  author: response.author
                }))
              })
      })
      .catch((error) =>
        console.log("Error while getting step details :", error)
      );
  }, [props.userInSession, props.step.trip._id, props.step.trip, props.step._id]);

  const experiencesList = state.experiences.map((experience, index) => {
    return(
      <Li key={experience._id}>
        <Experience
          experience={experience}
          experienceNumber={index+1}
          author={state.author}
          userInSession={state.loggedInUser}
          {...props}
        />
      </Li>
    )
  })

  return (
    <StyledStep>
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
          <Ul>
            <Box>
              { experiencesList }
            </Box>
          </Ul>
          {
            state.loggedInUser && state.loggedInUser._id === state.step.trip.author &&
              <>
                <OwnerControls>
                  <Link to={{ pathname: `/trips/${state.step.trip._id}/steps/${state.step._id}/add-experience`, state: { trip: state.trip }}}>
                    <FontAwesomeIcon icon={faAsterisk} />
                    <span>Add an experience</span>
                  </Link>
                </OwnerControls>
                <OwnerControls>
                  <Link to={`/trips/${state.step.trip._id}/edit-step/${state.step._id}`}>
                    <FontAwesomeIcon icon={faEdit} />
                    <span>Edit step</span>
                  </Link>
                </OwnerControls>
              </>
          }
        </>
      }  
    </StyledStep>
  );
};

export default Step;
