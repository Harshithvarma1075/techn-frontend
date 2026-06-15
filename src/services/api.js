import axios from "axios";

const api = axios.create({
  baseURL: "https://tech-backend-feeg.onrender.com"
});

export default api;