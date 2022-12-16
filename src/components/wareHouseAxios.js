import axios from "axios";

const instance = axios.create({
    // baseURL: "https://warehouse.proplast.et",
    baseURL: "http://localhost:11000",
})

export default instance;