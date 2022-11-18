import axios from "axios";

const instance = axios.create({
  // baseURL: "https://procurment.proplast.et",
  baseURL: "http://localhost:42000",
});

export default instance;
