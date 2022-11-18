import axios from "axios";

const instance = axios.create({
    // baseURL: "https://warehouse.proplast.et",
    baseURL: "http://localhost:59000",
})

export default instance;