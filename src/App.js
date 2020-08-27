import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./components/Navbar/Navbar";
import Homepage from "./components/Homepage/Homepage";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import Trips from "./components/Trips/Trips";
import SearchTripsResults from "./components/SearchTripsResults/SearchTripsResults";
import authService from "./components/Services/auth-service";
import ProtectedRoute from "./components/Auth/protected-route";
import "./App.css";
import Profile from "./components/Profile/Profile";
import Trip from "./components/Trip/Trip";
import EditTripForm from "./components/EditTripForm/EditTripForm";
import AddStepForm from "./components/AddStepForm/AddStepForm";
import EditStepForm from "./components/EditStepForm/EditStepForm";
// import Step from "./components/Step/Step";

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
          render={(props) => (
            <Homepage {...props} userInSession={state.loggedInUser} />
          )}
        />
        <Route
          exact
          path="/trips"
          render={(props) => (
            <Trips {...props} userInSession={state.loggedInUser} />
          )}
        />
        <Route
          exact
          path="/search"
          render={(props) => (
            <SearchTripsResults {...props} userInSession={state.loggedInUser} />
          )}
        />
        <Route
          exact
          path="/trips/:id"
          render={(props) => (
            <Trip {...props} userInSession={state.loggedInUser} />
          )}
        />
        <ProtectedRoute
          exact
          path="/trips/edit/:id"
          userInSession={state.loggedInUser}
          component={EditTripForm}
        />
        <ProtectedRoute
          exact
          path="/trips/:id/add-step"
          userInSession={state.loggedInUser}
          component={AddStepForm}
        />
        <ProtectedRoute
          exact
          path="/trips/:id/edit-step/:stepId"
          userInSession={state.loggedInUser}
          component={EditStepForm}
        />
        {/* <Route
          exact
          path="/steps/:id"
          render={(props) => (
            <Step {...props} userInSession={state.loggedInUser} />
          )}
        /> */}
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
      </Switch>
    </div>
  );
};

export default App;
