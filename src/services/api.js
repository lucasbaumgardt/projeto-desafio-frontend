import axios from "axios";

const api = axios.create({
    baseURL: "http://192.168.155.58:3001"
})

export default api;