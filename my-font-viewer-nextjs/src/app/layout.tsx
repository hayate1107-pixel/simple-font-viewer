import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { AnalyticsEvents } from '../components/AnalyticsEvents'; 

export const metadata: Metadata = {
  title: '【フォント比較】フォントを一覧プレビュー | Simple Font Viewer',
  description: '「フォント 比較」ツールならSimple Font Viewerへ。日本語・英語のWebフォントや、あなたのPCにインストール済みのローカルフォントを、入力したテキストで瞬時に比較・プレビューできます。デザイナーや開発者のフォント選びを効率化します。',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

    <html lang="ja">
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
            gtag('config', 'G-3N217MK6JB', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <body>
        {children}
        <AnalyticsEvents />
      </body>
    </html>
  );
}