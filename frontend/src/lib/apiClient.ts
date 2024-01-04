import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_HOSTNAME,
});

apiClient.interceptors.request.use(
  (config) => {
    const tokens = localStorage.getItem("tokens");
    if (tokens) {
      const tokenData = JSON.parse(tokens);
      if (tokenData.access_token) {
        config.headers.Authorization = `Bearer ${tokenData.access_token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const refreshAccessToken = async () => {
  console.log("Refreshing token...");
  try {
    const tokens = localStorage.getItem("tokens");
    if (!tokens) throw new Error("No token found");

    const tokenData = JSON.parse(tokens);
    const response = await apiClient.post("auth/refresh-token", {
      refresh_token: tokenData.refresh_token,
    });
    localStorage.setItem("tokens", JSON.stringify(response.data));
    return response.data.access_token;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    localStorage.removeItem("token");
    return null;
  }
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
