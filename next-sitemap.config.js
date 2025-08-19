// next-sitemap.config.js

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://simple-font-viewer.com', // ★ あなたのドメイン名に書き換える
  generateRobotsTxt: true, // robots.txtも自動生成する（推奨）
  sitemapSize: 7000,
};