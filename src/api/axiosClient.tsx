import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://127.0.0.1:3333/api",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "content-type": "application/json",
  },
  withCredentials: false,
});

axiosClient.interceptors.request.use((config: any) => {
  const accessToken = window.localStorage.getItem("accessToken");
  const accessHeaders = `Bearer ${accessToken}`;
  config.headers.Authorization = accessHeaders;
  return config;
});

export default axiosClient;
