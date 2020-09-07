import React, { useState, useEffect } from "react";
import { Form, Input, Textarea } from "./styles";
import Button from "../ElementalComponents/Button/Button";
import LocationSearchInput from "../LocationSearchInput/LocationSearchInput";
import Map from "../Map/Map";

const FormGeneral = (props) => {
  const [state, setState] = useState(props.formState);

  useEffect(() => {
    setState(state => (
      props.formState
    ))
  }, [props.formState]);

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

  const handleChange = (event) => {
    const { name, value, type, checked, files } = event.target;
    name === "imageUrl" || name === "profilePicture"
      ? setState((state) => ({
        ...state,
        archive: files[0]
      }))
      : setState((state) => ({
          ...state,
          [name]: type === "checkbox" 
                    ? checked
                    : type === "date"
                    ? formatDate(value)
                    : type === "file"
                    ? files[0]
                    : value
        }));
  };

  const liftFormSubmit = (event, stateToLift) => {
    event.preventDefault();
    props.formSubmit(stateToLift);
  };

  const setPlace = (newPlace) => {
    setState(state => ({
      ...state,
      place: {
        address: newPlace.address,
        lat: parseFloat(newPlace.lat),
        lng: parseFloat(newPlace.lng)
      }
    }))
  }

  const dynamicInputs = props.formInputs.map((input) => {
    return (
      input.type === "textarea" 
        ? <React.Fragment key={input.name}>
            <label>{input.label}</label>
            <Textarea
              type={input.type}
              name={input.name}
              checked={state[input.name] || false}
              value={state[input.name] || ""}
              placeholder={input.placeholder}
              onChange={handleChange}
            />
          </React.Fragment>
        : input.name === "place"
        ? <React.Fragment key={input.name}>
            <label>{input.label}</label>
            <LocationSearchInput setPlace={setPlace} />
            { state.place &&
              <React.Fragment>
                <p>Is this the correct place ?</p>
                <Map
                  key={state.place.address}
                  address={state.place.address}
                  lat={state.place.lat}
                  lng={state.place.lng}
                  zoom="14"
                  height="200px"
                  width="350px"
                />
              </React.Fragment>
            }
          </React.Fragment>
        : <React.Fragment key={input.name}>
            <label>{input.label}</label>
            <Input
              type={input.type}
              name={input.name}
              checked={state[input.name] || false}
              value={state[input.name] || ""}
              placeholder={input.placeholder}
              onChange={handleChange}
            />
          </React.Fragment>
      );
  });

  return (
    <div>
      <Form onSubmit={(event) => liftFormSubmit(event, state)}>
        <h3>{props.formTitle}</h3>
        {dynamicInputs}
        { (props.auth || props.formType === "experience photo") || <p>*required</p>}
        <Button formButton={props.formButton} />
      </Form>
    </div>
  );
};

export default FormGeneral;
