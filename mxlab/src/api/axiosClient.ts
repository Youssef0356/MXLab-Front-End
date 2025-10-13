import axios from 'axios';
import { config } from 'process';
const axiosClient = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json'
    }
});
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});
axiosClient.interceptors.response.use((response) => response, (error) => {
    console.error("API Error", error);
    return Promise.reject(error);
});

export default axiosClient;