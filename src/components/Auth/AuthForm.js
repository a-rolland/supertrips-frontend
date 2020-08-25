import React from "react";
import authService from "../Services/auth-service";
import { Link } from "react-router-dom";
import FormGeneral from "../FormGeneral/FormGeneral";

const AuthForm = (props) => {
  
  const handleFormSubmit = (formObject) => {
    const dynamicService = props.login
      ? authService.login(formObject)
      : authService.signup(formObject);

    dynamicService
      .then((response) => {
        props.getUser(response);
        props.history.push("/");
      })
      .catch((error) => console.log("Error while login/signup :", error));
  };

  const formInputs = [{
      label: "Username",
      type: "text",
      name: "username",
      placeholder: "Enter your username"
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      placeholder: "*******"
    }]

    const initialState = {
      username: "",
      password: ""
    }

  return (
    <div>
      <FormGeneral formSubmit={handleFormSubmit} formState={initialState} formInputs={formInputs} />
      <p>
        {props.authMessage}
        <Link to={`${props.formRedirectLink}`}>{props.formRedirectText}</Link>
      </p>
    </div>
  );
};

export default AuthForm;
