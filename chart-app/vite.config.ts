import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    federation({
      name: "chartApp",
      filename: "remoteEntry.js",
      // Expose chart components
      exposes: {
        "./BarChart": "./src/components/BarChart",
        "./LineChart": "./src/components/LineChart",
        "./PieChart": "./src/components/PieChart",
        "./Dashboard": "./src/components/Dashboard",
      },
      shared: ["react", "react-dom", "@chakra-ui/react"],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 5001,
  },
  preview: {
    port: 5001,
  },
});
