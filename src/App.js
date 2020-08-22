import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./components/Navbar/Navbar";
import Homepage from "./components/Homepage/Homepage";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import Trips from "./components/Trips/Trips";
import authService from "./components/Services/auth-service";
import ProtectedRoute from "./components/Auth/protected-route";
import CreateTripForm from "./components/CreateTripForm/CreateTripForm"
import "./App.css";
import Profile from "./components/Profile/Profile";

const App = () => {
  const initialState = { loggedInUser: null };
  const [state, setState] = useState(initialState);

  const getTheUser = (userObj) => {
    setState({
      loggedInUser: userObj,
    });
  };

  const fetchUser = () => {
    if (state.loggedInUser === null) {
      authService
        .loggedin()
        .then((response) => {
          setState({
            loggedInUser: response,
          });
        })
        .catch((err) => {
          setState({
            loggedInUser: false,
          });
        });
    }
  };

  fetchUser();

  return (
    <div className="App">
      <NavBar userInSession={state.loggedInUser} getUser={getTheUser} />
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Homepage userInSession={state.loggedInUser} />}
        />
        <Route exact path="/trips" render={() => <Trips />} />
        <Route
          exact
          path="/signup"
          render={(props) => <Signup {...props} getUser={getTheUser} />}
        />
        <Route
          exact
          path="/login"
          render={(props) => <Login {...props} getUser={getTheUser} />}
        />
        <ProtectedRoute
          exact
          path="/profile"
          userInSession={state.loggedInUser}
          component={Profile}
        />
        <Route
          exact
          path="/create-trip"
          render={(props) => <CreateTripForm {...props} getUser={getTheUser} />}
        />
      </Switch>
    </div>
  );
};

export default App;
