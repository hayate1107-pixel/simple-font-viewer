// ▼▼▼ 以下のコードに丸ごと置き換えてください ▼▼▼

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { sitemap } from 'vite-plugin-sitemap'; // ★ 1. sitemapをインポート

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // ★ 2. sitemapプラグインを追加
    sitemap({
      hostname: 'https://simple-font-viewer.com', // あなたのサイトのドメイン
      // generateRobotsTxt: true, // v4以降ではこのオプションは非推奨
      robots: [ // robots.txtを生成するための設定
        {
          userAgent: '*',
          allow: '/',
        },
      ],
      // 動的なページがない静的サイトなので、dynamicRoutesは不要
    }),
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});