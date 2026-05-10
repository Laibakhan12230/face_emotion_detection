import axios from "axios";

const API = axios.create({
  baseURL: "https://emotion-ai-backend-vhlv.onrender.com"
});

export default API;