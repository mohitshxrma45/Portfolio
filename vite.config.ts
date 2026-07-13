import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { execSync } from 'child_process'
import fs from 'fs'

try {
  const output = execSync('npx tsc --noEmit', { encoding: 'utf-8' });
  fs.writeFileSync('tsc-output.txt', 'SUCCESS:\n' + output);
} catch (e: any) {
  fs.writeFileSync('tsc-output.txt', 'ERROR:\n' + (e.stdout || e.message));
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
