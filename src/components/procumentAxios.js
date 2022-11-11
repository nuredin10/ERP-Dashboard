import axios from "axios";

const instance = axios.create({
    baseURL: "https://procurment.proplast.et",
})

export default instance;