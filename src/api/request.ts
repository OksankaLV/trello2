import axios from "axios";

import { api } from "../common/constants";
const token = localStorage.getItem("tokenStorage");

const instance = axios.create({
  baseURL: api.baseURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

instance.interceptors.response.use((res) => res.data);

export default instance;
