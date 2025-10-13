import axios from 'axios';
import { API_BASE_URL } from '../services/constants/api.constants';
const axiosClient = axios.create({
    baseURL: API_BASE_URL,
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