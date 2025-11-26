import federation from '@originjs/vite-plugin-federation';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

type SharedDependency = {
  singleton?: boolean;
  requiredVersion?: string;
  eager?: boolean;
};

type SharedDependencies = Record<string, string | SharedDependency>;

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    federation({
      name: 'containerApp',
      remotes: {
        chartApp: 'http://localhost:5001/assets/remoteEntry.js',
      },
      shared: {
        react: { singleton: true, requiredVersion: '^18.3.1' },
        'react-dom': { singleton: true, requiredVersion: '^18.3.1' },
        '@chakra-ui/react': { singleton: true, requiredVersion: '^2.8.0' },
        '@emotion/react': { singleton: true, requiredVersion: '^11.14.0' },
        '@emotion/styled': { singleton: true, requiredVersion: '^11.14.1' },
        'framer-motion': { singleton: true, requiredVersion: '10.16.0' },
        highcharts: { singleton: true, requiredVersion: '^12.4.0' },
        'highcharts-react-official': {
          singleton: true,
          requiredVersion: '^3.2.3',
        },
      } as SharedDependencies,
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
