import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

import { cloudflare } from "@cloudflare/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), cloudflare()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("react-calendly") || id.includes("react-hook-form") || id.includes("@hookform") || id.includes("/zod/")) return "vendor-panel";
          if (id.includes("framer-motion")) return "vendor-motion";
          if (id.includes("node_modules/react/") || id.includes("node_modules/react-dom/") || id.includes("react-router-dom")) return "vendor-react";
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
  },
});