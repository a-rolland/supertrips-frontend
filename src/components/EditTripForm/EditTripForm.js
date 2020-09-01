import React, { useState, useEffect} from "react";
import tripService from "../Services/trip-service";
import FormGeneral from "../FormGeneral/FormGeneral";
import Button from "../Button/Button";
import { Error } from "./styles"

const EditTripForm = (props) => {
  const [tripState, setTripState] = useState({})
  const [showDeleteTripConfirmation, setShowDeleteTripConfirmation] = useState(
    false
  );
  const [showError, setShowError] = useState("")

  const toggleDeleteTripConfirmation = () =>
    setShowDeleteTripConfirmation(!showDeleteTripConfirmation);

  useEffect(() => {
    tripService
      .tripDetails(props.match.params.id)
      .then(response => {
        setTripState(response)
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
      .catch((error) => {
        console.log("Error while editing trip :", error)
        setShowError(error.response.data.message)
      });
  };

  const deleteTrip = () => {
    const { params } = props.match;
    tripService
      .deleteTrip(params.id)
      .then(() => {
        props.history.push("/trips");
      })
      .catch((err) => {
        console.log("Error while deleting trip: ", err);
      });
  };

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
    console.log("SSSSSSSSSS",formattedDate)

    return formattedDate
}

  const formInputs = [
    {
      label: "Title",
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
      label: "Start date",
      type: "date",
      value: formatDate(tripState.startDate),
      name: "startDate",
    },
    {
      label: "End date",
      type: "date",
      value: formatDate(tripState.endDate),
      name: "endDate",
    }
  ];

  return (
    <div>
      <FormGeneral
        formSubmit={handleFormSubmit}
        formState={tripState}
        formInputs={formInputs}
        formButton="SAVE"
      />
        <>
          <Button
            toggleDeleteTripConfirmation={toggleDeleteTripConfirmation}
            formButton="DELETE"
            theme="lightcoral"
            color="white"
          />
          {showDeleteTripConfirmation && (
            <>
              <h4>Are you sure you want to delete this trip ? </h4>
              <Button
                deleteTrip={deleteTrip}
                formButton="YES"
                theme="lightcoral"
                color="white"
              />
              <Button
                toggleDeleteTripConfirmation={toggleDeleteTripConfirmation}
                formButton="CANCEL"
                theme="lightgrey"
                color="black"
              />
            </>
          )}
          { showError &&
            <Error>
              {showError}
            </Error>
          }
        </>
    </div>
  );
};

export default EditTripForm;
