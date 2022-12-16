import axios from "axios";

const instance = axios.create({
    // baseURL: "https://sales.proplast.et",
    baseURL: "http://localhost:11000",
})

export default instance;