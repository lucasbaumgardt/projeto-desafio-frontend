import axios from "axios";

const api = axios.create({
    baseURL: "http://172.16.0.203:3001"
})

export default api;