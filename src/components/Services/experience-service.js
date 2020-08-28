import axios from "axios";

const experienceService = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

const errorHandler = (err) => {
  throw err;
};

export default {
  experienceService,

  newexperience: (formFields) => {
    return experienceService
      .post("/newexperience", formFields)
      .then((response) => response.data)
      .catch(errorHandler);
  },

  experiences: (stepId) => {
    return experienceService
      .get(`/experiences/${stepId}`)
      .then((response) => response.data)
      .catch(errorHandler);
  },

  experienceDetails: (id) => {
    return experienceService
      .get(`/experienceDetails/${id}`)
      .then((response) => response.data)
      .catch(errorHandler);
  },

  editExperience: (id, formFields) => {
    return experienceService
      .put(`/experiences/${id}`, formFields)
      .then((response) => response.data)
      .catch(errorHandler);
  },

  deleteExperience: (id) => {
    return experienceService
      .delete(`/experiences/${id}`)
      .then((response) => response.data)
      .catch(errorHandler);
  },
};
