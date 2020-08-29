import React, { useState, useEffect } from "react";
import tripService from "../Services/trip-service";
import stepService from "../Services/step-service";
import experienceService from "../Services/experience-service";
import Button from "../Button/Button";
import Experience from "../Experience/Experience"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { StyledStepHeader, Ul, Box, Li } from "./styles"

const Step = (props) => {
  const initialState = {
    loggedInUser: null,
    step: [],
    experiences: [],
    author: [],
    expanded: true
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
  }, [props.userInSession, props.step.trip._id]);

  const editStep = () => {
    props.history.push({
      pathname: `/trips/${state.step.trip._id}/edit-step/${state.step._id}`,
    });
  };

  const addExperience = () => {
    props.history.push({
      pathname: `/trips/${state.step.trip._id}/steps/${state.step._id}/add-experience`,
      state: { trip: state.trip }
    });
  };

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
          <Ul>
            <Box>
              { experiencesList }
            </Box>
          </Ul>
          {
            state.loggedInUser && state.loggedInUser._id === state.step.trip.author &&
              <>
                <Button addExperience={addExperience} formButton="ADD A NEW EXPERIENCE" />
                <Button editStep={editStep} formButton="EDIT STEP" />
              </>
          }
        </>
      }  
    </div>
  );
};

export default Step;
