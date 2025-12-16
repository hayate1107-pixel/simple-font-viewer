import Link from 'next/link';

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-light text-black mb-8">特定商取引法に基づく表記</h1>
        
        <div className="space-y-8 text-sm text-gray-700">
          
          {/* 販売者の表示 */}
          <section>
            <h2 className="text-lg font-medium text-black mb-2">事業者（販売者）</h2>
            <p>
              W design<br />
              （※個人の場合、請求があった場合は遅滞なく氏名・住所・電話番号を開示いたします）
            </p>
          </section>

          {/* 連絡先 */}
          <section>
            <h2 className="text-lg font-medium text-black mb-2">連絡先</h2>
            <p>
              メールアドレス:wstylejapan@gmail.com<br />
              ※お問い合わせはメールにてお願いいたします。
            </p>
          </section>

          {/* 販売価格 */}
          <section>
            <h2 className="text-lg font-medium text-black mb-2">販売価格</h2>
            <p>決済ページに表示される金額（税込）となります。</p>
          </section>

          {/* 代金以外の必要料金 */}
          <section>
            <h2 className="text-lg font-medium text-black mb-2">商品代金以外の必要料金</h2>
            <p>
              当サイトのページの閲覧、ソフトウェアのダウンロード等に必要となるインターネット接続料金、通信料金は、お客様のご負担となります。
            </p>
          </section>

          {/* 支払方法 */}
          <section>
            <h2 className="text-lg font-medium text-black mb-2">お支払い方法</h2>
                        <p>
              以下の決済方法がご利用いただけます。<br />
              ・クレジットカード（Visa、Mastercard、American Express、JCB、Diners Club、Discover）<br />
              ・Apple Pay / Google Pay<br />
              ・PayPay
            </p>
          </section>

          {/* 支払時期 */}
          <section>
            <h2 className="text-lg font-medium text-black mb-2">お支払い時期</h2>
            <p>商品注文時にお支払いが確定します。</p>
          </section>

          {/* 商品の引き渡し時期 */}
          <section>
            <h2 className="text-lg font-medium text-black mb-2">商品の引渡時期</h2>
            <p>決済完了後、直ちにご利用いただけます。</p>
          </section>

          {/* 返品・キャンセル */}
          <section>
            <h2 className="text-lg font-medium text-black mb-2">返品・キャンセルについて</h2>
            <p>
              デジタルコンテンツの性質上、決済完了後の返品・キャンセル・返金はお受けできません。あらかじめご了承ください。
            </p>
          </section>

        </div>

        <div className="mt-12">
          <Link href="/" className="text-blue-600 hover:underline">
            ← トップページに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}