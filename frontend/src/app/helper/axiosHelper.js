import axios from "axios";

// const fallbackURL = "https://jomnay.onrender.com/api/v1";
const fallbackURL = "http://localhost:8000/api/v1";

export const setUpAxios = () => {
  axios.defaults.baseURL = fallbackURL;

  axios.interceptors.request.use(function (config) {
    const accessToken = localStorage.getItem("access_token");

    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
  }),
    function (error) {
      return Promise.reject(error);
    };
};
