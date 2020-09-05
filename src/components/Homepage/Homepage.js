import React, { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { AddLogo } from "./styles"
import { Link } from "react-router-dom";
import Button from "../ElementalComponents/Button/Button";
import FontAwesomeIconComponent from "../ElementalComponents/FontAwesomeIconComponent/FontAwesomeIconComponent";

const Homepage = (props) => {
  const initialSearch = {
    search: "",
  };
  const [loggedInUser, setLoggedInUser] = useState(props.userInSession)
  const [searchState, updateSearch] = useState(initialSearch);

  useEffect(() => {
    setLoggedInUser(props.userInSession)
  }, [props.userInSession ])

  const handleSearch = async (currentSearch) => {
    updateSearch({
      search: currentSearch,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.history.push({
      pathname: "/search",
      state: {
        userInSession: props.userInSession,
        searchKeys: searchState.search,
      },
    });
  };

  return (
    <div>
      {props.userInSession ? (
        <h1>Hi {props.userInSession.username}, welcome to Supertrips !</h1>
      ) : (
        <h1>Welcome to Supertrips !</h1>
      )}
      <form onSubmit={handleSubmit}>
        <SearchBar
          placeholder="Search for a trip.."
          searchUpdates={handleSearch}
        />
        <Button formButton="GO" />
      </form>
      {/* PROVISIONAL */}
      { loggedInUser && 
        <AddLogo>
          <Link to="/create-trip">
            <FontAwesomeIconComponent chosenIcon={"faSuitcaseRolling"} size="2x" />
            <span>NEW TRIP</span>
          </Link>
        </AddLogo>
      }
    </div>
  );
};

export default Homepage;
