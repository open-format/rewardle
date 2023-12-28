import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_HOSTNAME,
});

apiClient.interceptors.request.use(
  (config) => {
    const tokens = localStorage.getItem("tokens");
    if (tokens) {
      const tokenData = JSON.parse(tokens);
      if (tokenData.accessToken) {
        config.headers.Authorization = `Bearer ${tokenData.accessToken}`;
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
      refreshToken: tokenData.refreshToken,
    });
    localStorage.setItem("tokens", JSON.stringify(response.data));
    return response.data.accessToken;
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
