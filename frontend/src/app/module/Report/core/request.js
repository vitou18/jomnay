import axios from "axios";

export const reqGetReport = (type) => axios.get(`/report?type=${type}`);

export const reqDownloadReport = (type, format) =>
  axios.get(`/report/download?type=${type}&format=${format}`, {
    responseType: "blob",
  });
