import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": "/src/components",
      "@utils": "/src/utils",
      "@pages": "/src/pages",
      "@assets": "/src/assets",
      "@stores": "/src/stores",
      "@api": "/src/api",
    },
  },
});
