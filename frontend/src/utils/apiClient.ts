import { getAccessToken } from "@privy-io/react-auth";
import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_HOSTNAME,
});

apiClient.interceptors.request.use(
  async (config) => {
    const authToken = await getAccessToken();

    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
