import { defineConfig } from "vite";

export default defineConfig({
  root: ".",
  publicDir: "public",
  server: { port: 5173, open: true },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    minify: "terser",
    cssMinify: "esbuild",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ["console.log", "console.info", "console.debug"],
        passes: 2,
      },
      mangle: {
        toplevel: true,
      },
      format: {
        comments: false,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: undefined,
        compact: true,
        generatedCode: {
          symbols: true,
          preset: "es2015",
        },
      },
    },
    cssCodeSplit: false,
    sourcemap: false,
  },
  base: "/figma-clone-bootstrap-vite/",
});
