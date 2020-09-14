import React, { useState } from "react";
import authService from "../Services/auth-service";
import { Link } from "react-router-dom";
import FormGeneral from "../FormGeneral/FormGeneral";
import { Error } from "./styles"

const AuthForm = (props) => {
  const [showError, setShowError] = useState("")
  const handleFormSubmit = (formObject) => {
    const dynamicService = props.login
      ? authService.login(formObject)
      : authService.signup(formObject);

    dynamicService
      .then((response) => {
        localStorage.setItem('loggedInUser', JSON.stringify(response))
        props.getUser(response);
        props.history.push("/");
      })
      .catch((error) => {
        console.log("Error while login/signup");
        setShowError(error.response.data.message)
      })
  };

  const formInputs = [
    {
      label: "Username",
      type: "text",
      name: "username",
      placeholder: "Enter your username",
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      placeholder: "*******",
    },
  ];

  const initialState = {
    username: "",
    password: "",
  };

  return (
    <div>
      <FormGeneral
        auth
        // formTitle={ props.login ? "Login" : "Sign-up" }
        formSubmit={handleFormSubmit}
        formState={initialState}
        formInputs={formInputs}
        formButton={props.formButton}
      />
      <p>
        {props.authMessage}
        <Link to={`${props.formRedirectLink}`}>{props.formRedirectText}</Link>
      </p>
      { showError &&
          <Error>
              {showError}
          </Error>
      }
    </div>
  );
};

export default AuthForm;
