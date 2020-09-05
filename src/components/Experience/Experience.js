import React, { useState, useEffect } from "react";
// import stepService from "../Services/step-service";
import experienceService from "../Services/experience-service";
import { StyledExperience, StyledDateTime, OwnerControls, StyledStepHeader } from "./styles"
import { Link } from "react-router-dom";
import Map from "../Map/Map";
import FontAwesomeIconComponent from "../ElementalComponents/FontAwesomeIconComponent/FontAwesomeIconComponent";

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
          ? <FontAwesomeIconComponent chosenIcon={"faChevronDown"} />
          : <FontAwesomeIconComponent chosenIcon={"faChevronRight"} />
        }
        <span>
          {state.experience.title}
          {state.experience.date &&
            <React.Fragment>
              { (state.experience.showDate || props.author._id === state.loggedInUser._id) &&
                <StyledDateTime opacity={!state.experience.showDate ? "0.4" : "1" }>
                  <FontAwesomeIconComponent chosenIcon={"faCalendarAlt"} color="grey" />
                  {state.experience.date}
                  {!state.experience.showDate && " (Hidden)"}
                </StyledDateTime>
              }
              { (state.experience.showTime || props.author._id === state.loggedInUser._id) &&
                <StyledDateTime opacity={!state.experience.showTime ? "0.4" : "1" }>
                  <FontAwesomeIconComponent chosenIcon={"faClock"} color="grey" />
                  {state.experience.time}
                  {!state.experience.showTime && " (Hidden)"}
                </StyledDateTime>
              }
            </React.Fragment>}
        </span>
      </StyledStepHeader>
      {
        state.expanded &&
        <>
          {state.experience.description
            && state.experience.description
          }
          {state.experience.place
            && 
            <Map 
              address={state.experience.place.address}
              lat={state.experience.place.lat}
              lng={state.experience.place.lng}
              zoom="15"
              height="150px"
              width="500px"
            />
          }
          {
            state.loggedInUser && state.loggedInUser._id === props.author._id &&
              <>
                <OwnerControls>
                  <Link to={`/trips/${state.experience.step.trip}/steps/${state.experience.step._id}/edit-experience/${state.experience._id}`}>
                    <FontAwesomeIconComponent chosenIcon={"faFeatherAlt"} />
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
