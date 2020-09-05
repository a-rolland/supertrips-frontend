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

  const formatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    const formattedDate = [year, month, day].join('-')

    return formattedDate
}

  const formInputs = [
    {
      label: "Title*",
      type: "text",
      name: "title",
      value: experienceState.title,
      placeholder: "Ex.: Dinner at the Eiffel Tower",
    },
    {
      label: "Date*",
      type: "date",
      value: formatDate(experienceState.date),
      name: "date",
    },
    {
      label: "Time*",
      type: "time",
      value: experienceState.time,
      name: "time",
    },
    {
      label: "Make date public ? (Hidden by default)",
      type: "checkbox",
      value: experienceState.showDate,
      checked: experienceState.showDate,
      name: "showDate",
    },
    {
      label: "Make time public ? (Hidden by default)",
      type: "checkbox",
      value: experienceState.showTime,
      checked: experienceState.showTime,
      name: "showTime",
    },
    {
      label: "Description",
      type: "textarea",
      name: "description",
      value: experienceState.description,
      placeholder: 'Ex.: "This restaurant was absolutely incredible !"'
    },
    {
      label: "Find the place",
      type: "text",
      name: "place",
      value: experienceState.place,
      placeholder: 'Ex: "Paris..."'
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
