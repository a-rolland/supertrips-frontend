import React, { useState } from "react";
import tripService from "../Services/trip-service";
import { Link } from "react-router-dom";
import { Form, Input } from "./styles";

const CreateTripForm = (props) => {
  const initialState = {
    title: ""
  };

  const [state, setState] = useState(initialState);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const title = state.title;
    tripService.newtrip(title)
      .then(response => 
        console.log("New trip created !", response)
      )
      .catch((error) => console.log(error));
    props.toggleForm()
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((state) => ({
      ...state,
      [name]: value,
    }));
  };

  return (
    <div>
      <Form
        onSubmit={handleFormSubmit}
      >
        <label>Title:</label>
        <Input
          type="text"
          name="title"
          value={state.title}
          placeholder="Ex.: My magical trip to Paris"
          onChange={handleChange}
        />

        <Input className="btn" type="submit" value={props.formButton} />
      </Form>

      <p>
        {props.authMessage}
        <Link to={`${props.formRedirectLink}`}>{props.formRedirectText}</Link>
      </p>
    </div>
  );
};

export default CreateTripForm;
