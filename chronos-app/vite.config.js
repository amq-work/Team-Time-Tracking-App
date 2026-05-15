import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
    plugins: [react()],
    base: '/Team-Time-Tracking-App/',
    server: {
        port: 5173,
    },
});
