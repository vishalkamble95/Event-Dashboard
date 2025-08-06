import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Polyfill for 'global' used by draft-js/fbjs
export default defineConfig({
  base: '/Event-Dashboard/',
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    global: 'window', // 👈 this line fixes `global is not defined`
  },
});
