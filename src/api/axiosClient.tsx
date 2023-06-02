import axios from 'axios';

const axiosClient = axios.create({
  baseURL: '',
  headers: {
    'content-type': 'application/json',
  },
});

export default axiosClient;
