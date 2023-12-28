import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    server: {
      port: 3000,
    },
    plugins: [tsconfigPaths()],
    define: {
      "process.env.APP_ID": JSON.stringify(env.APP_ID),
      "process.env.API_URL": JSON.stringify(env.API_URL),
    },
  };
});
