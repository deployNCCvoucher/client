import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://be-psi-six.vercel.app/api",
  headers: {
    "Access-Control-Allow-Origin": "https://be-psi-six.vercel.app",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
  },
  withCredentials: true,
});

axiosClient.interceptors.request.use((config: any) => {
  const accessToken = window.localStorage.getItem("accessToken");
  const accessHeaders = `Bearer ${accessToken}`;
  config.headers.Authorization = accessHeaders;
  return config;
});

export default axiosClient;
