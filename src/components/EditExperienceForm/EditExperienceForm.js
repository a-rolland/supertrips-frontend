import React, { useState, useEffect} from "react";
// import stepService from "../Services/step-service";
import experienceService from "../Services/experience-service";
import FormGeneral from "../FormGeneral/FormGeneral";
import Button from "../Button/Button";

const EditExperienceForm = (props) => {
  const [experienceState, setExperienceState] = useState({})
  const [showDeleteExperienceConfirmation, setShowDeleteExperienceConfirmation] = useState(
    false
  );

  const toggleDeleteExperienceConfirmation = () =>
    setShowDeleteExperienceConfirmation(!showDeleteExperienceConfirmation);

  useEffect(() => {
    experienceService
      .experienceDetails(props.match.params.experienceId)
      .then(response => {
        setExperienceState(response);
      })
      .catch((error) =>
        console.log("Error while getting experience details :", error)
      );
  }, [props.match.params.experienceId]);

  const handleFormSubmit = (formObject) => {
    const { params } = props.match;
    experienceService
      .editExperience(params.experienceId, formObject)
      .then((response) => {
        console.log("Experience edited !", response);
        props.history.push({
          pathname: `/trips/${params.id}`,
        });
      })
      .catch((error) => console.log("Error while editing experience :", error));
  };

  const formInputs = [
    {
      label: "Title",
      type: "text",
      name: "title",
      value: experienceState.title,
      placeholder: "Ex.: Dinner at the Eiffel Tower",
    }
  ];

  const deleteExperience = () => {
    const { params } = props.match;
    experienceService
      .deleteExperience(params.experienceId)
      .then(() => {
        props.history.push(`/trips/${params.id}`);
      })
      .catch((err) => {
        console.log("Error while deleting experience: ", err);
      });
  };

  return (
    <div>
      <FormGeneral
        formSubmit={handleFormSubmit}
        formState={experienceState}
        formInputs={formInputs}
        formButton="SAVE"
      />
      <Button
        toggleDeleteExperienceConfirmation={toggleDeleteExperienceConfirmation}
        formButton="DELETE"
        theme="lightcoral"
        color="white"
      />
      {showDeleteExperienceConfirmation && (
        <>
          <h4>Are you sure you want to delete this experience ? </h4>
          <Button
            deleteExperience={deleteExperience}
            formButton="YES"
            theme="lightcoral"
            color="white"
          />
          <Button
            toggleDeleteExperienceConfirmation={toggleDeleteExperienceConfirmation}
            formButton="CANCEL"
            theme="lightgrey"
            color="black"
          />
        </>
      )}
    </div>
  );
};

export default EditExperienceForm;
