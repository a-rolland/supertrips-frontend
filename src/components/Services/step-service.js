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

  newStep: (formFields) => {
    return stepService
      .post("/newStep", formFields)
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

  deleteStep: (id) => {
    return stepService
      .delete(`/steps/${id}`)
      .then((response) => response.data)
      .catch(errorHandler);
  },
};
