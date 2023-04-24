import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  build: {
    target: "esnext",
    outDir: "out",
    rollupOptions: {
      input: {
        web: "index.html",
        privacyPolicy: "privacy-policy.html",
      },
    },
  },
  server: {
    port: 3034,
  },
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "favicon.ico",
        "apple-touch-icon.png",
        "android-chrome-512x512.png",
      ],
      manifest: {
        name: "Sons Of The Forest Map",
        short_name: "SOTF Map",
        description:
          "Stay on top of your game with real-time position tracking, nodes of weapons & points of interest, and overlay mode for seamless progress tracking.",
        lang: "en",
        icons: [
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/android-chrome-256x256.png",
            sizes: "256x256",
            type: "image/png",
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
        ],
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        orientation: "any",
        dir: "ltr",
      },
      workbox: {
        globPatterns: ["**/*.{js,html,css,ico,png,svg,webp}"],
        navigateFallbackDenylist: [
          /^\/locations\/.*\.webp$/,
          /^\/index.webp$/,
          /^\/sitemap.xml$/,
        ],
        runtimeCaching: [
          {
            urlPattern: /^\/locations\/.*\.webp$/,
            handler: "CacheFirst",
            options: {
              cacheName: "locations-images-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
              },
              cacheableResponse: {
                statuses: [200],
              },
            },
          },
        ],
      },
    }),
  ],
});
