import axios from "axios";

const stepService = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

const errorHandler = (err) => {
  throw err;
};

export default {
  stepService,

  newstep: (formFields) => {
    return stepService
      .post("/newstep", formFields)
      .then((response) => response.data)
      .catch(errorHandler);
  },

  steps: (id) => {
    return stepService
      .get(`/steps/${id}`)
      .then((response) => response.data)
      .catch(errorHandler);
  },

  stepDetails: (id) => {
    return stepService
      .get(`/stepDetails/${id}`)
      .then((response) => response.data)
      .catch(errorHandler);
  },

  editStep: (id, formFields) => {
    return stepService
      .put(`/steps/${id}`, formFields)
      .then((response) => response.data)
      .catch(errorHandler);
  },

  deleteTrip: (id) => {
    return stepService
      .delete(`/steps/${id}`)
      .then((response) => response.data)
      .catch(errorHandler);
  },
};
