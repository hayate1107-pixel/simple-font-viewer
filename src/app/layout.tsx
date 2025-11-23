import type { Metadata } from 'next';
import Script from 'next/script'; // Scriptコンポーネントをインポート
import './globals.css';

// SEOのためのメタデータ
export const metadata: Metadata = {
  title: 'フォント比較ができるフォントビューアーツール | Simple Font Viewer',
  description: 'こんな分かりやすいフォント比較できるビューアーツール見たことがない。こんなにもあっさり決まっていいのか？',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      {/* --- Google Analyticsのスクリプト --- */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-3N21T7MK6JB`} // あなたのGA ID
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3N217MK6JB'); // あなたのGA ID
          `,
        }}
      />

      {/* --- Microsoft Clarityのスクリプト --- */}
      {/* ★ 変更点: 通常の<script>タグを、Next.jsの<Script>コンポーネントに書き換え */}
      <Script
        id="clarity-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "txnu40b97q"); // あなたのClarity ID
          `,
        }}
      />
      
      <body>
        {children}
      </body>
    </html>
  );
}