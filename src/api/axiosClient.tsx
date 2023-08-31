import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://ncc-voucherbackend.vercel.app/api/",
  headers: {
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json",
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
