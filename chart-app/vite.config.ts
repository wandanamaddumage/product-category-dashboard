import federation from '@originjs/vite-plugin-federation';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
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
        react: { requiredVersion: '^18.3.1' },
        'react-dom': { requiredVersion: '^18.3.1' },
        '@chakra-ui/react': { requiredVersion: '^2.8.0' },
        '@emotion/react': { requiredVersion: '^11.14.0' },
        '@emotion/styled': { requiredVersion: '^11.14.1' },
        'framer-motion': { requiredVersion: '^10.16.0' },
        highcharts: { requiredVersion: '^12.4.0' },
        'highcharts-react-official': { requiredVersion: '^3.2.3' },
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
