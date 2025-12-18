import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true, // this ensures JWT cookie is sent & received
});

export default api;
