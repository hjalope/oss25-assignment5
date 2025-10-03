// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://68ddd354d7b591b4b78d973a.mockapi.io",
});

export default api;
