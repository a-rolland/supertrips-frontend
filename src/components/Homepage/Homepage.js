import React from "react";

const Homepage = (props) => {
  return (
    <div>
      {props.userInSession ? (
        <h1>Hi {props.userInSession.username}, welcome to Supertrips !</h1>
      ) : (
        <h1>Welcome to Supertrips !</h1>
      )}
    </div>
  );
};

export default Homepage;
