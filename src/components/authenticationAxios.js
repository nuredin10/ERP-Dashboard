import axios from "axios";

const instance = axios.create({
    baseURL: "https://auth.proplast.et",
})

export default instance;