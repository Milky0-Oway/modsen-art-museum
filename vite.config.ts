import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			components: path.resolve(__dirname, 'src/components'),
			utils: path.resolve(__dirname, 'src/utils'),
			assets: path.resolve(__dirname, 'src/assets'),
			pages: path.resolve(__dirname, 'src/pages'),
			context: path.resolve(__dirname, 'src/context'),
			constants: path.resolve(__dirname, 'src/constants'),
		},
	},
});
