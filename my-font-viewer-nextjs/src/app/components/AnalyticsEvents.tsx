'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function AnalyticsEvents() {
  const pathname = usePathname();

  useEffect(() => {
    // URLが変わるたびに、ページビューイベントをGA4に送信する
    window.gtag('config', 'G-3N217MK6JB', { // ★ あなたの測定IDに書き換える
      page_path: pathname,
    });
  }, [pathname]);

  return null; // このコンポーネントは何も表示しない
}