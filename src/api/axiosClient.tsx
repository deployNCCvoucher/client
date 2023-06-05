import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://10.10.21.212:3333/api',
  headers: {
    'content-type': 'application/json',
  },
});

export default axiosClient;
