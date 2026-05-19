import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Make sure the backend runs on port 5000
});

// Request interceptor for adding the bearer token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
