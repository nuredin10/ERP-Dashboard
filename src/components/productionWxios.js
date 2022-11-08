import axios from "axios";

const instance = axios.create({
    baseURL: "https://production.proplast.et",
})

export default instance;