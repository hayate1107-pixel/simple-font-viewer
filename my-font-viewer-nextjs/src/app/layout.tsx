import type { Metadata } from 'next';
import './globals.css';

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
      <body>
        {children}
      </body>
    </html>
  );
}