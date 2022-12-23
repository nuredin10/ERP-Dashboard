import axios from "axios";

const instance = axios.create({
    // baseURL: "https://warehouse.proplast.et",
    baseURL: "https://report.proplast.et",
})

export default instance;