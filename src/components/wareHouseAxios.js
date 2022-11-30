import axios from "axios";

const instance = axios.create({
    baseURL: "https://warehouse.proplast.et",
})

export default instance;