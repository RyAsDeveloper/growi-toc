import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/client-entry.ts",
      name: "growi-plugin-custom-toc",
      formats: ["es"],
      fileName: "client-entry",
    },
    outDir: "dist",
  },
});
