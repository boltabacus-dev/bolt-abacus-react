import { defineConfig, loadEnv } from 'vite';

import react from '@vitejs/plugin-react';

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
			},
		},
		plugins: [react()],
	});
};
