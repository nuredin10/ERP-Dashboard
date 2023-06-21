import axios from "axios";

const instance = axios.create({
  // baseURL: "https://warehouse.proplast.et",
  baseURL: "http://localhost:5000",
  
  // baseURL: "https://report.proplast.et",
});

export default instance;
