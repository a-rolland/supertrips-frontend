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

  loggedin: () => {
    return authService.get("/loggedin").then((response) => response.data);
  },

  login: (credentials) => {
    return authService
      .post("/login", credentials)
      .then((response) => response.data);
  },

  logout: () => {
    return authService.post("/logout", {}).then((response) => response.data);
  },

  editProfilePicture: (id, formFields) => {
    return authService
      .put("/profile/profilePicture", formFields)
      .then((response) => response.data)
      .catch(errorHandler);
  },

  // upload: data => {
  //     return service.post('/upload', data)
  //         .then(response => response.data)
  // },

  // edit: () => {
  //     return service.post('/edit', data)
  //         .then(response => response.data)
  // }
};
