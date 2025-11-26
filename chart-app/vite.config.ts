import federation from '@originjs/vite-plugin-federation';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  base: '/chart-app/',  // <-- REQUIRED FOR VERCEL HOSTING

  plugins: [
    react(),
    tsconfigPaths(),
    federation({
      name: 'chartApp',
      filename: 'remoteEntry.js',
      exposes: {
        './BarChart': './src/components/BarChart.tsx',
        './PieChart': './src/components/PieChart.tsx',
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

  server: { port: 5001, strictPort: true, cors: true },
  preview: { port: 5001, strictPort: true },
});
