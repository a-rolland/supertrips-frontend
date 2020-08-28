import React, { useState, useEffect} from "react";
import tripService from "../Services/trip-service";
import FormGeneral from "../FormGeneral/FormGeneral";
import Button from "../Button/Button";

const EditTripForm = (props) => {
  const [tripState, setTripState] = useState({})
  const [showDeleteTripConfirmation, setShowDeleteTripConfirmation] = useState(
    false
  );

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
  }, []);

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
        </>
    </div>
  );
};

export default EditTripForm;
