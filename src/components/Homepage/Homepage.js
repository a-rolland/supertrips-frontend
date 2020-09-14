import React, { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import Button from "../ElementalComponents/Button/Button";
import tripService from "../Services/trip-service";
import { VideoContainer, HomepageBody, CreateATrip } from "./styles"
import TripsList from "../TripsList/TripsList";
import { Link } from "react-router-dom";

const Homepage = (props) => {
  const initialSearch = {
    search: "",
  };
  const [userState, setLoggedInUser] = useState({loggedInUser: props.userInSession})
  const [searchState, updateSearch] = useState(initialSearch);
  const [popularTripsState, updatePopularTrips] = useState({trips: []})

  useEffect(() => {
    setLoggedInUser({loggedInUser: props.userInSession})
      const fetchAuthorizedTripsList = async () => {
        const response = await tripService.popularTrips();
        const popularTrips = response
        updatePopularTrips((state) => ({
          ...state,
          trips: popularTrips,
        }));
      };
      fetchAuthorizedTripsList();
  }, [props.userInSession])

  const handleUpdateTrips = () => {
    const fetchAuthorizedTripsList = async () => {
      const response = await tripService.popularTrips();
      const popularTrips = response
      updatePopularTrips((state) => ({
        ...state,
        trips: popularTrips,
      }));
    };
    fetchAuthorizedTripsList();
  }

  const popularTripsList = <TripsList
                          popularTrips
                          trips={popularTripsState.trips}
                          userInSession={userState.loggedInUser}
                          updateUser={props.updateUser}
                          updateTrips={handleUpdateTrips}
                        />

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
        <video autoPlay loop muted>
          {/* <source src="https://res.cloudinary.com/nutriapp/video/upload/v1599909995/jumbotron_video_hddyyd.mp4" type="video/mp4" /> */}
          <source src="https://res.cloudinary.com/nutriapp/video/upload/v1599923299/jumbotron_video_nz_nkqmp2.mp4" type="video/mp4" />
          {/* <source src="https://res.cloudinary.com/nutriapp/video/upload/v1599923596/jumbotron_beach_2_xbypv6.mp4" type="video/mp4" /> */}
          {/* <source src="https://res.cloudinary.com/nutriapp/video/upload/v1599923598/jumbotron_beach_pxwqhn.mp4" type="video/mp4" /> */}
          {/* <source src="https://res.cloudinary.com/nutriapp/video/upload/v1599924725/jumbotron_clouds_omdlxp.mp4" type="video/mp4" /> */}
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
      { popularTripsState.trips && 
        <HomepageBody>
          <h2 style={{textAlign: "left"}}>Most Popular trips</h2>
          {popularTripsList}
        </HomepageBody>
      }
      <CreateATrip>
        <h2>Create a trip</h2>
        <img src="https://res.cloudinary.com/nutriapp/image/upload/v1599217458/tripDefault_gkayed.jpg" alt="Create a trip" />
        <Link to={props.userInSession ? "/create-trip" : "/login" }>
          <Button formButton={props.userInSession ? "START" : "LOGIN FIRST"} />
        </Link>
      </CreateATrip>
    </div>
  );
};

export default Homepage;
