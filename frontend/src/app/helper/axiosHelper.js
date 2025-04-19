import axios from "axios";

const isLocal = window.location.hostname === "localhost";
const fallbackURL = isLocal
  ? "http://localhost:8000/api/v1"
  : "http://192.168.88.78:8000/api/v1";

export const setUpAxios = () => {
  axios.defaults.baseURL = import.meta.env.VITE_API_URL || fallbackURL;

  axios.interceptors.request.use(function (config) {
    const accessToken = localStorage.getItem("access_token");

    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
  }),
    function (error) {
      return Promise.reject(error);
    };
};
