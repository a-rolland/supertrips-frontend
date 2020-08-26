import React, { useState, useEffect } from "react";
import tripService from "../Services/trip-service";
import stepService from "../Services/step-service";
import Button from "../Button/Button";

const Step = (props) => {
  const initialState = {
    loggedInUser: null,
    step: [],
    // experience: []
  };
  const [state, setState] = useState(initialState);

  const [showDeleteStepConfirmation, setShowDeleteStepConfirmation] = useState(
    false
  );

  const toggleDeleteStepConfirmation = () =>
    setShowDeleteStepConfirmation(!showDeleteStepConfirmation);

  useEffect(() => {
    console.log("PROPS --->",props)
    stepService
      .stepDetails(props.match.params.id)
      .then((response) => {
        console.log("Step details :", response);
        setState((state) => ({
          ...state,
          loggedInUser: props.userInSession,
          step: response
        }));
        // FOR LATER
        // experienceService
        //   .experiences(props.match.params.id)
        //     .then((response) => {
        //       console.log("Experiences of this step:", response)
        //       setState((state) => ({
        //         ...state,
        //         loggedInUser: props.userInSession,
        //         experiences: response
        //       }));
        //     })
        //     .catch((error) => 
        //       console.log("Error while getting experiences :", error
        //     ))
      })
      .catch((error) =>
        console.log("Error while getting step details :", error)
      );
  }, [props.userInSession, props.match.params.id]);

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

  // FOR LATER : Transform in addExperience
  // const addStep = () => {
  //   props.history.push({
  //     pathname: `/trips/${state.trip._id}/add-step`,
  //     state: { trip: state.trip }
  //   });
  // };

  // FOR LATER : Transform in experiencesList
  // const stepsList = state.steps.map((step, index) => {
  //   return(
  //   <li key={step._id}>Step {index+1} - {step.title}</li>
  //   )
  // })

  return (
    <div>
      <h1>Step details</h1>
      <h2>{state.step.title}</h2>
      {/* { state.experiences && experiencesList } */}
      <p></p>
      {state.loggedInUser && state.loggedInUser._id === state.step.trip.author && (
        <>
          {/* <Button addStep={addStep} formButton="ADD A NEW STEP" /><br /> */}
          <Button editStep={editStep} formButton="EDIT" />
          <Button
            toggleDeleteStepConfirmation={toggleDeleteStepConfirmation}
            formButton="DELETE"
            theme="lightcoral"
            color="white"
          />

          {showDeleteStepConfirmation && (
            <>
              <h4>Are you sure you want to delete this step ? </h4>
              <Button
                deleteStep={deleteStep}
                formButton="YES"
                theme="lightcoral"
                color="white"
              />
              <Button
                toggleDeleteStepConfirmation={toggleDeleteStepConfirmation}
                formButton="CANCEL"
                theme="lightgrey"
                color="black"
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Step;
