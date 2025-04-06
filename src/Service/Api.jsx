// axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://tu-backend.com/api', // Ajusta la URL base de tu API
  headers: {
    'Content-Type': 'application/json'
  }
});

export default axiosInstance;
