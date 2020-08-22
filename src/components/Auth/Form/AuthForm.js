import React, { useState } from "react";
import service from "../../Services/auth-service";
import { Link } from "react-router-dom";
import { Form, Input } from "./styles";

const AuthForm = (props) => {
  const initialState = {
    username: "",
    password: "",
  };

  const [state, setState] = useState(initialState);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const username = state.username;
    const password = state.password;

    const dynamicService = props.login
      ? service.login(username, password)
      : service.signup(username, password);

    dynamicService
      .then((response) => {
        setState({
          username: "",
          password: "",
        });
        props.getUser(response);
        props.history.push("/");
      })
      .catch((error) => console.log(error));
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
        className="form-group m-2"
        onSubmit={handleFormSubmit}
        style={{ maxWidth: "350px" }}
      >
        <label>Username:</label>
        <Input
          className="form-control"
          type="text"
          name="username"
          value={state.username}
          placeholder="Enter your username"
          onChange={handleChange}
        />

        <label>Password:</label>
        <Input
          type="password"
          className="form-control"
          name="password"
          placeholder="********"
          value={state.password}
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

export default AuthForm;
