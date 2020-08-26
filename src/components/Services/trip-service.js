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

  newtrip: (formFields) => {
    return tripService
      .post("/newtrip", formFields)
      .then((response) => response.data)
      .catch(errorHandler);
  },

  trips: () => {
    return tripService
      .get("/trips")
      .then((response) => response.data)
      .catch(errorHandler);
  },

  tripDetails: (id) => {
    return tripService
      .get(`/trips/${id}`)
      .then((response) => response.data)
      .catch(errorHandler);
  },

  editTrip: (id, formFields) => {
    return tripService
      .put(`/trips/${id}`, formFields)
      .then((response) => response.data)
      .catch(errorHandler);
  },

  deleteTrip: (id) => {
    return tripService
      .delete(`/trips/${id}`)
      .then((response) => response.data)
      .catch(errorHandler);
  },
};
