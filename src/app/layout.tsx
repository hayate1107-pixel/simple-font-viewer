import type { Metadata } from 'next';
import Script from 'next/script'; // Scriptコンポーネントをインポート
import './globals.css';
// import { AnalyticsEvents } from '../components/AnalyticsEvents'; // AnalyticsEventsは一旦後回しにします

// SEOのためのメタデータ
export const metadata: Metadata = {
  title: '【フォント比較】ができるフォントビューアーツール | Simple Font Viewer',
  description: 'シンプルなフォントビューアーツールです。日本語・英語のフォント切り替え、あなたのPCにインストール済みのローカルフォントを、入力したテキストで瞬時にフォント比較・プレビューできるフォントビューアーツール。デザイナーや開発者のフォント選びを効率化します。',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      {/* Google Analyticsのコードをここに配置 */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-3N217MK6JB`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3N217MK6JB');
          `,
        }}
      />
      <body>
        {children}
      </body>
    </html>
  );
}