import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para agregar token a todas las peticiones
axiosInstance.interceptors.request.use(
  config => {
    const userAuth = JSON.parse(localStorage.getItem("userAuth"));

    // Si hay usuario autenticado y token, agrega el header
    if (userAuth && userAuth.isAuthenticated && userAuth.token) {
      config.headers['Authorization'] = `Bearer ${userAuth.token}`;
    }

    // Siempre debe retornar la configuración
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
