import React, { useState } from "react";
import tripService from "../Services/trip-service";
import { Link } from "react-router-dom";
import { Form, Input } from "./styles";

const CreateTripForm = (props) => {
  const initialState = {
    title: "",
    isPublic: false
  };

  const [state, setState] = useState(initialState);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const title = state.title;
    const isPublic = state.isPublic;
    tripService.newtrip(title, isPublic)
      .then(response => 
        console.log("New trip created !", response)
      )
      .catch((error) => console.log(error));
    props.toggleForm()
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setState((state) => ({
      ...state,
      [name]: type === "checkbox" ? checked : value
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

        <label>Do you want to make it public ?</label>
        <Input
          type="checkbox"
          name="isPublic"
          value={state.isPublic}
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
