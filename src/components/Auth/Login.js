import React from "react";
import AuthForm from "./AuthForm";
import authService from "../Services/auth-service";
import FacebookLogin from "react-facebook-login";
import { FacebookLoginStyled } from "./styles";
import FontAwesomeIconComponent from "../ElementalComponents/FontAwesomeIconComponent/FontAwesomeIconComponent";

const Login = (props) => {
  const responseFacebook = (response) => {
    authService
      .facebookLogin({ access_token: response.accessToken })
      .then((response) => {
        localStorage.setItem("loggedInUser", JSON.stringify(response));
        props.getUser(response);
        props.history.push("/");
      })
      .catch(() => console.log("Error while login with Facebook"));
  };

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
      <FacebookLoginStyled>
        <FontAwesomeIconComponent
          chosenIcon={"faFacebook"}
          size="3x"
          color="#4c69ba"
        />
        <FacebookLogin
          style={{ display: "block" }}
          appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
          autoLoad={false}
          isMobile={false}
          reauthenticate={true}
          fields="name,email,picture"
          callback={responseFacebook}
        />
      </FacebookLoginStyled>
    </div>
  );
};

export default Login;
