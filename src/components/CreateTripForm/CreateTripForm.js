import React, { useState } from "react";
import tripService from "../Services/trip-service";
import FormGeneral from "../FormGeneral/FormGeneral";
import { Error } from "./styles"

const CreateTripForm = (props) => {
  const [showError, setShowError] = useState("")
  const handleFormSubmit = (formObject) => {
    tripService
      .newTrip(formObject)
      .then((response) => {
        console.log("New trip created !", response)
        props.history.push("/trips");
      })
      .catch((error) => {
        console.log("Error while creating trip :", error)
        setShowError(error.response.data.message)
      });
  };

  const formInputs = [
    {
      label: "Title",
      type: "text",
      name: "title",
      placeholder: "Ex.: My magical trip to Paris",
    },
    {
      label: "Do you want to make it public ?",
      type: "checkbox",
      name: "isPublic",
    },
    {
      label: "Start Date",
      type: "date",
      name: "startDate",
    },
    {
      label: "End Date",
      type: "date",
      name: "endDate",
    }
  ];

  const initialState = {
    title: "",
    isPublic: false,
    startDate: "",
    endDate: ""
  };

  return (
    <div>
      <FormGeneral
        formTitle="Create a new trip"
        formSubmit={handleFormSubmit}
        formState={initialState}
        formInputs={formInputs}
        formButton="CREATE"
      />
      { showError &&
          <Error>
              {showError}
          </Error>
      }
    </div>
  );
};

export default CreateTripForm;
