import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Base URL for your API
  timeout: 5000, // Optional: Set a timeout for requests
});

// Add a request interceptor to include the Authorization header
axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem('access');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token refreshing
axiosInstance.interceptors.response.use(
  (response) => {
    return response; // If the response is successful, return it as is
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to an expired access token
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite retry loops
      const refreshToken = localStorage.getItem('refresh');

      if (refreshToken) {
        try {
          // Attempt to refresh the access token
          const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
            refresh: refreshToken,
          });

          // Update the access token in localStorage
          localStorage.setItem('access', response.data.access);

          // Update the Authorization header and retry the original request
          originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          console.error('Failed to refresh token:', refreshError);
          // If refreshing fails, clear tokens and redirect to login
          localStorage.removeItem('access');
          localStorage.removeItem('refresh');
          window.location.href = '/'; // Redirect to login page
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;