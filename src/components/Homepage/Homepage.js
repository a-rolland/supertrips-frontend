import React, { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import Button from "../ElementalComponents/Button/Button";
import { VideoContainer } from "./styles"

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
    props.history.push(`/search?title=${searchState.search}`)
  };

  return (
    <div>
      <VideoContainer>
        <h2>Share your experiences...</h2>
        <video width="100%" autoPlay loop muted>
          <source src="https://res.cloudinary.com/nutriapp/video/upload/v1599909995/jumbotron_video_hddyyd.mp4" type="video/mp4" />
        </video>
        <h2>...and get inspired</h2>
        <form onSubmit={handleSubmit}>
          <SearchBar
            placeholder="Search for a trip.."
            searchUpdates={handleSearch}
          />
          <Button formButton="GO" />
        </form>
      </VideoContainer>
    </div>
  );
};

export default Homepage;
