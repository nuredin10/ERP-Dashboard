import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:59000/",
})

export default instance;