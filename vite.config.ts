import { defineConfig } from "vite";

export default defineConfig({
  build: {
    manifest: true,
    rollupOptions: {
      // エントリーポイントのファイルを指定
      input: ["/client-entry.ts"],
    },
  },
});
