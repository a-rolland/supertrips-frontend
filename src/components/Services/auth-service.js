import axios from "axios";

const authService = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

const errorHandler = (err) => {
  throw err;
};

export default {
  authService,

  signup: (credentials) => {
    return authService
      .post("/signup", credentials)
      .then((response) => response.data)
      .catch(errorHandler);
  },

  loggedIn: () => {
    return authService.get("/loggedIn").then((response) => response.data);
  },

  login: (credentials) => {
    return authService
      .post("/login", credentials)
      .then((response) => response.data);
  },

  logout: () => {
    localStorage.removeItem("loggedInUser");
    return authService.post("/logout", {}).then((response) => response.data);
  },

  editProfilePicture: (id, formFields) => {
    return authService
      .put("/profile/profilePicture", formFields)
      .then((response) => response.data)
      .catch(errorHandler);
  },

  toggleAddToFavorites: (id) => {
    return authService
      .put(`/toggleAddToFavorites/${id}`)
      .then((response) => response.data)
      .catch(errorHandler);
  }
};