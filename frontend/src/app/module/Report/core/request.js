import axios from "axios";

export const reqGetReport = (type) => axios.get(`/report?type=${type}`);

export const reqDownloadReport = (type) =>
  axios.get(`/report/download?type='${type}'`, {
    responseType: "blob",
  });
