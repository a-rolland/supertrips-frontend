import React from "react";
import AuthForm from "./AuthForm";
import authService from "../Services/auth-service";
import FacebookLogin from "react-facebook-login";

const Login = (props) => {
  
  const responseFacebook = (response) => {
    console.log(response)
    authService.facebookLogin({access_token: response.accessToken})
      .then(response => {
        localStorage.setItem('loggedInUser', JSON.stringify(response))
        props.getUser(response);
        props.history.push("/");
      })
      .catch(err => console.log(err));
  }

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

export default Login;
