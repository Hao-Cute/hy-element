import { fileURLToPath, URL } from "node:url";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import vueDevTools from "vite-plugin-vue-devtools";
import dts from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    // dts()
    dts({ tsconfigPath: "./tsconfig.build.json", outDir: "dist/types" }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    outDir: "dist/es",
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "VElement",
      fileName: "v-element",
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "vue",
        "@fortawesome/fontawesome-svg-core",
        "@fortawesome/free-solid-svg-icons",
        "@fortawesome/vue-fontawesome",
        "async-validator",
        "@popperjs/core",
        "axios",
      ],
      output: {
        assetFileNames(chunkInfo) {
          if (chunkInfo.names[0] === "v-element.css") {
            return "index.css";
          }
          return chunkInfo.names[0];
        },
      },
    },
  },
});
