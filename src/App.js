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
import Profile from "./components/Profile/Profile";
import Trip from "./components/Trip/Trip";
import EditTripForm from "./components/EditFormGeneral/EditTripForm";
import AddStepForm from "./components/CreateFormGeneral/AddStepForm";
import EditStepForm from "./components/EditFormGeneral/EditStepForm";
import AddExperienceForm from "./components/CreateFormGeneral/AddExperienceForm";
import EditExperienceForm from "./components/EditFormGeneral/EditExperienceForm";
import { StyledApp } from "./styles";
import CreateTripForm from "./components/CreateFormGeneral/CreateTripForm";
import MyTrips from "./components/MyTrips/MyTrips";
import MyFavoriteTrips from "./components/MyFavoriteTrips/MyFavoriteTrips";
import NoMatch from "./components/NoMatch/NoMatch";

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
        .loggedIn()
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

  const handleUpdateUser = () => {
    authService
        .loggedIn()
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

  fetchUser();

  return (
    <StyledApp>
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
            <Trips {...props} userInSession={state.loggedInUser} updateUser={handleUpdateUser} />
          )}
        />
        <Route
          exact
          path="/search"
          render={(props) => (
            <SearchTripsResults {...props} userInSession={state.loggedInUser} updateUser={handleUpdateUser} />
          )}
        />
        <Route
          exact
          path="/trips/:id"
          render={(props) => (
            <Trip {...props} userInSession={state.loggedInUser} updateUser={handleUpdateUser} />
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
        <ProtectedRoute
          exact
          path="/trips/:id/steps/:stepId/add-experience"
          userInSession={state.loggedInUser}
          component={AddExperienceForm}
        />
        <ProtectedRoute
          exact
          path="/trips/:id/steps/:stepId/edit-experience/:experienceId"
          userInSession={state.loggedInUser}
          component={EditExperienceForm}
        />
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
        <ProtectedRoute
          exact
          path="/profile/my-trips"
          userInSession={state.loggedInUser}
          component={MyTrips}
          updateUser={handleUpdateUser}
        />
        <ProtectedRoute
          exact
          path="/profile/favorite-trips"
          userInSession={state.loggedInUser}
          component={MyFavoriteTrips}
          updateUser={handleUpdateUser}
        />
        <ProtectedRoute
          exact
          path="/create-trip"
          userInSession={state.loggedInUser}
          component={CreateTripForm}
        />
        <Route component={NoMatch} />
      </Switch>
    </StyledApp>
  );
};

export default App;
