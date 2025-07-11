// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";
// import path from "path";

// export default defineConfig(({ mode }) => ({
//   server: {
//     host: "::",
//     port: 8080,
//     proxy: {
//       // 👇 Proxy WebSocket & API calls to backend
//       "/socket.io": {
//         target: "http://localhost:5000",
//         ws: true,
//         changeOrigin: true,
//       },
//       "/api": {
//         target: "http://localhost:5000",
//         changeOrigin: true,
//       },
//     },
//   },
//   plugins: [react(), mode === "development"].filter(
//     Boolean
//   ),
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// }));
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => {
  // Load environment variables from `.env.[mode]` file
  const env = loadEnv(mode, process.cwd());

  return {
    server: {
      host: "::",
      port: 8080,
      proxy: {
        "/socket.io": {
          target: env.VITE_BACKEND_URL,
          ws: true,
          changeOrigin: true,
        },
        "/api": {
          target: env.VITE_BACKEND_URL,
          changeOrigin: true,
        },
      },
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
