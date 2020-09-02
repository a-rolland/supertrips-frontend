import React, { useState, useEffect} from "react";
import experienceService from "../Services/experience-service";
import EditFormGeneral from "./EditFormGeneral";

const EditExperienceForm = (props) => {
  const [experienceState, setExperienceState] = useState({})

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

  const formInputs = [
    {
      label: "Title*",
      type: "text",
      name: "title",
      value: experienceState.title,
      placeholder: "Ex.: Dinner at the Eiffel Tower",
    },
    {
      label: "Description",
      type: "textarea",
      name: "description",
      value: experienceState.description,
      placeholder: 'Ex.: "This restaurant was absolutely incredible !"'
    }
  ];

  return (
    <EditFormGeneral
      experienceForm
      formType="experience"
      formInputs={formInputs}
      formTitle={`Edit "${experienceState.title}"`}
      experience={experienceState}
      {...props}
    />
  );
};

export default EditExperienceForm;
