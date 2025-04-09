import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Django API base URL
  timeout: 5000, // Optional: Set a timeout for requests
});

// Add Authorization header if token exists
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('access'); // Retrieve access token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;