import axios from "axios";

const authService = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
  withCredentials: true,
});

const errorHandler = (err) => {
  throw err;
};

export default {
  authService,

  getUser: (userId) => {
    return authService
      .get(`/getUser/${userId}`)
      .then((response) => response.data)
      .catch(errorHandler);
  },

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
  },

  facebookLogin: (token) => {
    return authService
      .post(`/auth/facebook`, token)
      .then((response) => response.data)
      .catch(errorHandler);
  },
};
