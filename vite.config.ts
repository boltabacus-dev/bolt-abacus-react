import { defineConfig, loadEnv } from 'vite';

import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    server: {
      port: parseInt(process.env.VITE_PORT),
      proxy: {
        '/api': {
          target: process.env.VITE_BACKEND_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          secure: false,
        },
      },
    },
    resolve: {
      alias: {
        './runtimeConfig': './runtimeConfig.browser',
        '@assets': path.resolve(__dirname, './src/assets'),
        '@components': path.resolve(__dirname, './src/components'),
        '@constants': path.resolve(__dirname, './src/constants'),
        '@helpers': path.resolve(__dirname, './src/helpers'),
        '@hooks': path.resolve(__dirname, './src/hooks'),
        '@layouts': path.resolve(__dirname, './src/layouts'),
        '@pages': path.resolve(__dirname, './src/pages'),
        '@services': path.resolve(__dirname, './src/services'),
        '@routes': path.resolve(__dirname, './src/routes'),
        '@types': path.resolve(__dirname, './src/types'),
      },
    },
    plugins: [react(), svgr()],
  });
};
