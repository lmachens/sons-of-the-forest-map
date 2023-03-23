import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  build: {
    target: "esnext",
    outDir: "out",
    rollupOptions: {
      input: {
        web: "index.html",
      },
    },
  },
  server: {
    port: 3034,
  },
});
