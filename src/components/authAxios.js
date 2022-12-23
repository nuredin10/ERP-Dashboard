import axios from "axios";

const instance = axios.create({
  
  baseURL: "https://report.proplast.et/",
});

export default instance;
