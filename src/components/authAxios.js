import axios from "axios";

const instance = axios.create({
    // baseURL: "https://auth.proplast.et",
    baseURL: "http://localhost:9000"
})

export default instance;