import federation from '@originjs/vite-plugin-federation';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  base: '/container-app/',  // REQUIRED FOR VERCEL

  plugins: [
    react(),
    tsconfigPaths(),
    federation({
      name: 'containerApp',
      remotes: {
        // UPDATE THIS AFTER DEPLOYING chart-app
        chartApp: 'https://product-category-dashboard-chart-ap.vercel.app/remoteEntry.js',
      },
      shared: {
        react: { requiredVersion: false },
        'react-dom': { requiredVersion: false },
        '@chakra-ui/react': { requiredVersion: false },
        '@emotion/react': { requiredVersion: false },
        '@emotion/styled': { requiredVersion: false },
        'framer-motion': { requiredVersion: false },
        highcharts: { requiredVersion: false },
        'highcharts-react-official': { requiredVersion: false },
      },
    }),
  ],

  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
    dedupe: [
      'react',
      'react-dom',
      '@chakra-ui/react',
      '@emotion/react',
      '@emotion/styled',
      'framer-motion',
      'highcharts',
      'highcharts-react-official',
    ],
  },

  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },

  server: { port: 5000, strictPort: true, cors: true },
  preview: { port: 5000, strictPort: true },
});
