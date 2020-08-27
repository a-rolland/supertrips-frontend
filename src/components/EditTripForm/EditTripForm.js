import React, { useState, useEffect} from "react";
import tripService from "../Services/trip-service";
import FormGeneral from "../FormGeneral/FormGeneral";

const EditTripForm = (props) => {
  const [state, setState] = useState({})

  useEffect(() => {
    tripService
      .tripDetails(props.match.params.id)
      .then(response => {
        setState(response);
      })
      .catch((error) =>
        console.log("Error while getting trip details :", error)
      );
  }, [props.match.params.id]);

  const handleFormSubmit = (formObject) => {
    const { params } = props.match;
    tripService
      .editTrip(params.id, formObject)
      .then((response) => {
        console.log("Trip edited !", response);
        props.history.push({
          pathname: `/trips/${params.id}`,
        });
      })
      .catch((error) => console.log("Error while editing trip :", error));
  };

  const formInputs = [
    {
      label: "Title",
      type: "text",
      name: "title",
      value: state.title,
      placeholder: "Ex.: My magical trip to Paris",
    },
    {
      label: "Do you want to make it public ?",
      type: "checkbox",
      value: state.isPublic,
      checked: state.isPublic,
      name: "isPublic",
    },
  ];

  return (
    <div>
      <FormGeneral
        formSubmit={handleFormSubmit}
        formState={state}
        formInputs={formInputs}
        formButton="SAVE"
      />
    </div>
  );
};

export default EditTripForm;
