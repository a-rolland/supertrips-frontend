import React, { useState, useEffect } from "react";
import { Form, Input } from "./styles";
import Button from "../Button/Button";

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
    const { name, value, type, checked } = event.target;
    setState((state) => ({
      ...state,
      [name]: type === "checkbox" ? checked : type === "date" ? formatDate(value) : value
    }));
  };

  const liftFormSubmit = (event, stateToLift) => {
    event.preventDefault();
    props.formSubmit(stateToLift);
  };

  const dynamicInputs = props.formInputs.map((input) => {
    return (
      <React.Fragment key={input.name}>
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
        <Button formButton={props.formButton} />
      </Form>
    </div>
  );
};

export default FormGeneral;
