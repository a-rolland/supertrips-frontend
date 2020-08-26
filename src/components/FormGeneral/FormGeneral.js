import React, { useState } from "react";
import { Form, Input } from "./styles";
import Button from "../Button/Button";

const FormGeneral = (props) => {
  const initialState = props.formState;
  const [state, setState] = useState(initialState);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setState((state) => ({
      ...state,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const liftFormSubmit = (event, stateToLift) => {
    event.preventDefault()
    props.formSubmit(stateToLift)
  }

  const dynamicInputs = props.formInputs.map(input => {
    return(
      <React.Fragment key={input.name}>
        <label>{input.label}</label>
        <Input
          type={input.type}
          name={input.name}
          checked={state[input.name]}
          value={state[input.name]}
          placeholder={input.placeholder}
          onChange={handleChange}
        />
      </React.Fragment>
    )
  })

  return (
    <div>
      <Form onSubmit={event => liftFormSubmit(event, state)}>
        {dynamicInputs}
        <Button value={props.formButton} />
      </Form>
    </div>
  );
};

export default FormGeneral;
