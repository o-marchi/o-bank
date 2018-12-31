import axios from "axios";

const token = localStorage.getItem("token");

export default axios.create({
  baseURL: process.env.API_URL || "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
    "Authorization": token ? `Bearer ${localStorage.token}` : "";
  }
});