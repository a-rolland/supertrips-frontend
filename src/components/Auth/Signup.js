import React from "react";
import AuthForm from "./AuthForm";
import FacebookLogin from "react-facebook-login";

const Signup = (props) => {
  return (
    <div>
      <AuthForm
        {...props}
        signup
        getUser={props.getUser}
        formButton="SIGN-UP"
        authMessage="Already have an account ?"
        formRedirectLink="/login"
        formRedirectText=" Login"
      />
      <p>
        <FacebookLogin
          style={{display:"block"}}
          appId=""
          autoLoad={false}
          fields="name,email,picture"
          callback={responseFacebook}
        />
      </p>
    </div>
  );
};

export default Signup;
