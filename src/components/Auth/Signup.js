import React from "react";
import AuthForm from "./AuthForm";
import authService from "../Services/auth-service";
import FacebookLogin from "react-facebook-login";
import { FacebookLoginStyled } from "./styles";
import FontAwesomeIconComponent from "../ElementalComponents/FontAwesomeIconComponent/FontAwesomeIconComponent";

const Signup = (props) => {
  const responseFacebook = (response) => {
    // console.log(response)
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
        signup
        getUser={props.getUser}
        formButton="SIGN-UP"
        authMessage="Already have an account ?"
        formRedirectLink="/login"
        formRedirectText=" Login"
      />
      <FacebookLoginStyled>
        <FontAwesomeIconComponent chosenIcon={"faFacebook"} size="3x" color="#4c69ba" />
        <FacebookLogin
          style={{display:"block"}}
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

export default Signup;
