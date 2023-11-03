import { UserConfigExport, defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const HOST = env.VITE_BACKEND

  let config: UserConfigExport = {
    plugins: [react(), tsconfigPaths(), svgr()]
  }

  if (mode === 'development') {
    config = {
      ...config, 
      server: {
        proxy: {
          '/api': {
            target: HOST,
            changeOrigin: true,
            secure: false,
          },
        },
      }
    }
  }

  return config;
});
