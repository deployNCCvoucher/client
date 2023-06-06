import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://10.10.21.212:3333/api',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'content-type': 'application/json',
  },
  withCredentials: false,
});

export default axiosClient;
