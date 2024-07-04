import axios from "axios";

export const api = axios.create({
  baseURL: "https://athena-server-pebb.onrender.com",
});