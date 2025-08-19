// ▼▼▼ 以下のコードに丸ごと置き換えてください ▼▼▼

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sitemap from 'vite-plugin-sitemap'; // ★ 変更点: { sitemap } から {} を削除

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: 'https://simple-font-viewer.com',
      robots: [
        {
          userAgent: '*',
          allow: '/',
        },
      ],
    }),
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});