import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { Input } from "./styles";

const Homepage = (props) => {
  const initialSearch = {
    search: "",
  };

  const [searchState, updateSearch] = useState(initialSearch);

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
        <Input className="btn" type="submit" value="GO" />
      </form>
    </div>
  );
};

export default Homepage;
