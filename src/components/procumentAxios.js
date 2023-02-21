import axios from "axios";

const instance = axios.create({
    // baseURL: "http://localhost:11000"

    baseURL: "https://report.proplast.et",
})

export default instance;