import axios from "axios";

const instance = axios.create({
    baseURL: "https://sales.proplast.et",
})

export default instance;