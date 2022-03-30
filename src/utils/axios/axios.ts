import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import qs from 'qs';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BASEURL
});
// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = {
        Authorization: `Bearer ` + JSON.parse(token)
      };
    }

    if (
      config.method === 'POST' ||
      config.method === 'PUT' ||
      config.method === 'DELETE'
    ) {
      config.data = qs.stringify(config.data);
      config.params = qs.stringify(config.params);
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    if (response && response.data) {
      return response;
    }
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosClient;
