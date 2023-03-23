import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: "esnext",
    rollupOptions: {
      input: {
        controller: "controller.html",
        app: "app.html",
      },
    },
  },
  server: {
    port: 3033,
  },
});
