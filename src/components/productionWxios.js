import axios from "axios";

const instance = axios.create({
    // baseURL: "https://production.proplast.et",
    baseURL: "http://localhost:11000"

    // baseURL: "http://localhost:11000",
})

export default instance;