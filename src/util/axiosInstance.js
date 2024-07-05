import axios from 'axios';
import { store } from '.././redux/store';
const axiosInstance = axios.create({
  baseURL: 'https://api-test.digibulkmarketing.com/',
});
axiosInstance.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth.token;
  const user = state.auth.detail;

  const isMultipartData = config.headers['Content-Type'] === 'multipart/form-data';
  config.headers = {
    'Content-Type': isMultipartData ? 'multipart/form-data' : 'application/json',
    Authorization: `Bearer ${token}`,
    'Access-Control-Allow-Origin': '*',
  };
  return config;
}, (error) => {
  // Handle request error here
  return Promise.reject(error);
});
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('axiosInstance error - ' + JSON.stringify(error));
    if (error.response) {
      if (error.response.status === 401) {
        console.log('Authentication Failed');
        localStorage.removeItem('persist:auth');
        window.location.href = '/';
      }
    } else {
      console.log('Network error or no response from server');
    }
    return Promise.reject(error); // Ensure the error is still returned
  }
);
export default axiosInstance;