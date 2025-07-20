import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import rollupNodePolyFill from "rollup-plugin-node-polyfills";
import nodePolyfills from "vite-plugin-node-stdlib-browser";

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills(), // ✅ FIXED HERE
  ],
  optimizeDeps: {
    include: ["buffer", "process"],
  },
  build: {
    rollupOptions: {
      plugins: [rollupNodePolyFill()],
    },
  },
  define: {
    global: "window",
  },
});
