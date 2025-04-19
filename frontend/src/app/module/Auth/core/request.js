import axios from "axios";

export const reqLogin = (payload) => axios.post("/auth/login", payload);

export const reqRegister = (payload) => axios.post("/auth/register", payload);
