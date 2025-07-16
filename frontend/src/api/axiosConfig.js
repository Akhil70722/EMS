
import axios from 'axios';

// const baseURL = 'http://localhost:8000/api'; // or server URL
// const baseURL = 'http://192.168.1.77:8000/api';
const baseURL = 'http://192.168.1.29:8000/api';

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Attach access token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
      console.log('🔐 Access token attached');
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auto-refresh access token if 401 error
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Only retry once
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh');
        if (!refreshToken) {
          console.error('🚫 No refresh token found');
          return Promise.reject(error);
        }

        const res = await axios.post(`${baseURL}/token/refresh/`, {
          refresh: refreshToken,
        });

        const newAccessToken = res.data.access;
        localStorage.setItem('access', newAccessToken);

        // Update headers
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        console.log('🔁 Access token refreshed');
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('❌ Token refresh failed:', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;



// import axios from 'axios';

// const baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

// const axiosInstance = axios.create({
//   baseURL: baseURL,
//   timeout: 5000,
//   headers: {
//     'Content-Type': 'application/json',
//     Accept: 'application/json',
//   },
// });

// // Attach access token to every request
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const accessToken = localStorage.getItem('access');
//     if (accessToken) {
//       config.headers['Authorization'] = `Bearer ${accessToken}`;
//       console.log('🔐 Access token attached');
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Auto-refresh access token if 401 error
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const refreshToken = localStorage.getItem('refresh');
//         if (!refreshToken) {
//           console.error('🚫 No refresh token found');
//           return Promise.reject(error);
//         }

//         const res = await axios.post(`${baseURL}/token/refresh/`, {
//           refresh: refreshToken,
//         });

//         const newAccessToken = res.data.access;
//         localStorage.setItem('access', newAccessToken);

//         // Update headers
//         axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
//         originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

//         console.log('🔁 Access token refreshed');
//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         console.error('❌ Token refresh failed:', refreshError);
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;
