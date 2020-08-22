import axios from "axios";

const tripService = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

const errorHandler = (err) => {
  throw err;
};

export default {
  tripService,

  newtrip: title => {
    return tripService
      .post("/newtrip", { title })
      .then((response) => response.data)
      .catch(errorHandler);
  },

  trips: () => {
    return tripService
      .get("/trips")
      .then(response => response.data)
      .catch(errorHandler);
  }
};
