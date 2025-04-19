import axios from "axios";

export const reqGetIncome = () => axios.get("/income");

export const reqCreateIncome = (payload) => axios.post("/income/add", payload);

export const reqDeleteIncome = (id) => axios.delete(`/income/delete/${id}`);

export const reqUpdateIncome = (id, payload) =>
  axios.put(`/income/edit/${id}`, payload);
