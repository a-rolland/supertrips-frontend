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

  signup: (username, password) => {
    return authService
      .post("/signup", { username, password })
      .then((response) => response.data)
      .catch(errorHandler);
  },

  loggedin: () => {
    return authService.get("/loggedin").then((response) => response.data);
  },

  login: (username, password) => {
    return authService
      .post("/login", { username, password })
      .then((response) => response.data);
  },

  logout: () => {
    return authService.post("/logout", {}).then((response) => response.data);
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
