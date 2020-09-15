import React, { useState, useEffect } from "react";
import tripService from "../Services/trip-service";
import EditFormGeneral from "./EditFormGeneral";

const EditTripForm = (props) => {
  const [tripState, setTripState] = useState({});

  useEffect(() => {
    tripService
      .tripDetails(props.match.params.id)
      .then((response) => {
        setTripState(response);
      })
      .catch(() => console.log("Error while getting trip details :"));
  }, [props.match.params.id]);

  const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    const formattedDate = [year, month, day].join("-");

    return formattedDate;
  };

  const formInputs = [
    {
      label: "Title*",
      type: "text",
      name: "title",
      value: tripState.title,
      placeholder: "Ex.: My magical trip to Paris",
    },
    {
      label: "Do you want to make it public ?",
      type: "checkbox",
      value: tripState.isPublic,
      checked: tripState.isPublic,
      name: "isPublic",
    },
    {
      label: "Image",
      type: "file",
      value: "",
      name: "imageUrl",
    },
    {
      label: "Start date*",
      type: "date",
      value: formatDate(tripState.startDate),
      name: "startDate",
    },
    {
      label: "End date*",
      type: "date",
      value: formatDate(tripState.endDate),
      name: "endDate",
    },
  ];

  return (
    <EditFormGeneral
      tripForm
      formType="trip"
      formInputs={formInputs}
      formTitle={`Edit "${tripState.title}"`}
      trip={tripState}
      {...props}
    />
  );
};

export default EditTripForm;
