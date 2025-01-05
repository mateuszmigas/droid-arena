import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api-lobby": {
        target: "http://localhost:3001",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-lobby/, ""),
      },
      "/api-arena": {
        target: "ws://localhost:3002",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-arena/, ""),
      },
    },
  },
});

