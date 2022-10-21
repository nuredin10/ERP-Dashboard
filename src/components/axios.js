import axios from "axios";

const instance = axios.create({
    baseURL: "https://versavvy.com/ERP_backend/",
})

export default instance;