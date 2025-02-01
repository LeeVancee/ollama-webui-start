import { defineConfig } from '@tanstack/start/config';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  server: {
    preset: 'vercel',
  },
  vite: {
    plugins: [
      tsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
    ],
    ssr: {
      noExternal: ['react-dropzone'],
    },
  },
  react: {
    babel: {
      plugins: ['babel-plugin-react-compiler'],
    },
  },
});
