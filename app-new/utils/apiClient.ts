import axios from "axios";
// Create an Axios instance
const apiClient = axios.create({
  baseURL: "http://localhost:8080/api/v1", // Your API base URL
  // other custom settings
});

// Add a request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Replace 'token' with your token key in local storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    localStorage.removeItem("token");
    // Do something with request error
    return Promise.reject(error);
  }
);

export default apiClient;
