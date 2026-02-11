import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/",

  build: {
    chunkSizeWarningLimit: 700, // ✅ Warning limit बढ़ाया
  },

  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    cors: true,

    // ✅ ngrok domain allow
    allowedHosts: [
      "counterattractively-oversour-caryl.ngrok-free.dev",
    ],
  },
});
