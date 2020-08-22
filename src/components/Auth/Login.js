import React from "react";
import AuthForm from "./Form/AuthForm";

const Login = (props) => {
  return (
    <div>
      <AuthForm
        {...props}
        login
        getUser={props.getUser}
        formButton="LOGIN"
        authMessage="Don't have any account yet ?"
        formRedirectLink="/signup"
        formRedirectText=" Sign-up"
      />
    </div>
  );
};

export default Login;
