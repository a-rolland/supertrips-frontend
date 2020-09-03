import React, { useState, useEffect } from "react";
import { Form, Input, Textarea } from "./styles";
import Button from "../Button/Button";
import LocationSearchInput from "../LocationSearchInput/LocationSearchInput";

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
    name === "imageUrl"
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
      place: newPlace
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
        { props.auth || <p>*required</p>}
        <Button formButton={props.formButton} />
      </Form>
    </div>
  );
};

export default FormGeneral;
