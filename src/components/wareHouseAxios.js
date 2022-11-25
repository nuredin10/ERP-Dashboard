import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:3100/",
})

export default instance;