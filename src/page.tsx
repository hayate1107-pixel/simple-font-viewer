'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Type, Languages, Copy, Check, Search, Filter, FolderDown } from 'lucide-react';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// ★ 修正点: 重複していた FontData interface を一つに修正
interface FontData {
  name: string;
  family: string;
  category: string;
}

interface FontMetadata {
  family: string;
  fullName: string;
  postscriptName: string;
  style: string;
}

declare global {
  interface Window {
    queryLocalFonts?: () => Promise<FontMetadata[]>;
  }
}

const knownJapaneseFontFamilyPrefixes = [
  // 大手メーカー
  'ms gothic', 'ms pgothic', 'ms ui gothic', 'ms mincho', 'ms pmincho',
  'meiryo', 'yu gothic', 'yu mincho', 'biz ud',
  'hiragino', 'a-otf', 'fot-', 'dfp', 'df', 'hgs', 'hgp', 'iw-',
  // 主要フリーフォント・ブランド
  'noto sans jp', 'noto serif jp',
  'source han sans', 'source han serif', 'source han code',
  'm plus', 'rounded-mplus',
  'zen kaku', 'zen maru', 'zen old',
  'dela gothic one', 'kosugi', 'shippori mincho',
  'genei', 'genkai', 'kinuta', 'koku',
  'senobi', 'sicshishigashira', 'ten mincho',
  'field gothic', 'kf-', 'jk-', 'mgen', 'itou-', 'seto-', 'gn-', 'id-',
  // ユーザーの環境から特定
  'ab-', 'ab_', 'ads-', 'ta_', 'ta-', `tk_`, `tk-`,
];

const englishFontExclusionList = new Set([
  'franklin gothic', 'cofo gothic vf', 'ltc octic gothic', 'nickel gothic variable', 'malgun gothic',
]);

const japaneseKeywords = [
  'gothic', 'mincho', 'maru', 'fude', 'brush',
  'kai', 'gyosho', 'rei', 'pop', 'tegaki', 'pen', 'moji', 'shodo', 'kokoro', 'hannari',
  'shizuku', 'amayadori', 'tsubaki', 'showwa',
];

/**
 * 最終完成版：語彙力を強化した3段階評価によるハイブリッド判定関数
 */
const isJapaneseFont = (fontFamily: string): boolean => {
  const lowerCaseFamily = fontFamily.toLowerCase();

  if (englishFontExclusionList.has(lowerCaseFamily)) {
    return false;
  }

  if (knownJapaneseFontFamilyPrefixes.some(prefix => lowerCaseFamily.startsWith(prefix))) {
    return true;
  }

  if (japaneseKeywords.some(keyword => lowerCaseFamily.includes(keyword))) {
    return true;
  }

  // ★★★ ここの正規表現を修正しました ★★★
  const japaneseRegex = /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/;
  if (japaneseRegex.test(lowerCaseFamily)) {
    return true;
  }

  return false;
};

const englishFonts: FontData[] = [
  { name: 'Inter', family: 'Inter, system-ui, sans-serif', category: 'サンセリフ' },
  { name: 'SF Pro Display', family: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif', category: 'サンセリフ' },
  { name: 'Segoe UI', family: '"Segoe UI", system-ui, sans-serif', category: 'サンセリフ' },
  { name: 'Roboto', family: 'Roboto, system-ui, sans-serif', category: 'サンセリフ' },
  { name: 'Arial', family: 'Arial, sans-serif', category: 'サンセリフ' },
  { name: 'Helvetica Neue', family: '"Helvetica Neue", Helvetica, Arial, sans-serif', category: 'サンセリフ' },
  { name: 'Times New Roman', family: '"Times New Roman", Times, serif', category: 'セリフ' },
  { name: 'Georgia', family: 'Georgia, "Times New Roman", serif', category: 'セリフ' },
  { name: 'Playfair Display', family: '"Playfair Display", Georgia, serif', category: 'セリフ' },
  { name: 'Source Serif Pro', family: '"Source Serif Pro", Georgia, serif', category: 'セリフ' },
  { name: 'JetBrains Mono', family: '"JetBrains Mono", "Fira Code", Consolas, monospace', category: '等幅' },
  { name: 'Fira Code', family: '"Fira Code", Consolas, "Courier New", monospace', category: '等幅' },
  { name: 'SF Mono', family: '"SF Mono", Monaco, "Cascadia Code", monospace', category: '等幅' },
  { name: 'Poppins', family: 'Poppins, system-ui, sans-serif', category: 'サンセリフ' },
  { name: 'Montserrat', family: 'Montserrat, system-ui, sans-serif', category: 'サンセリフ' },
  { name: 'Open Sans', family: '"Open Sans", system-ui, sans-serif', category: 'サンセリフ' },
  { name: 'Lato', family: 'Lato, system-ui, sans-serif', category: 'サンセリフ' },
  { name: 'Nunito', family: 'Nunito, system-ui, sans-serif', category: 'サンセリフ' },
];

const japaneseFonts: FontData[] = [
  { name: 'Noto Sans JP', family: '"Noto Sans JP", system-ui, sans-serif', category: 'ゴシック' },
  { name: 'Noto Serif JP', family: '"Noto Serif JP", serif', category: '明朝' },
  { name: 'ヒラギノ角ゴ ProN', family: '"ヒラギノ角ゴ ProN W3", "HiraKakuProN-W3", sans-serif', category: 'ゴシック' },
  { name: 'ヒラギノ明朝 ProN', family: '"ヒラギノ明朝 ProN W3", "HiraMinProN-W3", serif', category: '明朝' },
  { name: '游ゴシック', family: '"游ゴシック", "YuGothic", sans-serif', category: 'ゴシック' },
  { name: '游明朝', family: '"游明朝", "YuMincho", serif', category: '明朝' },
  { name: 'メイリオ', family: '"メイリオ", "Meiryo", sans-serif', category: 'ゴシック' },
  { name: 'Source Han Sans JP', family: '"Source Han Sans JP", sans-serif', category: 'ゴシック' },
  { name: 'Source Han Serif JP', family: '"Source Han Serif JP", serif', category: '明朝' },
  { name: 'BIZ UDPゴシック', family: '"BIZ UDPGothic", sans-serif', category: 'ゴシック' },
  { name: 'BIZ UDP明朝', family: '"BIZ UDPMincho", serif', category: '明朝' },
  { name: 'Zen角ゴシック New', family: '"Zen Kaku Gothic New", sans-serif', category: 'ゴシック' },
  { name: 'Zen旧明朝', family: '"Zen Old Mincho", serif', category: '明朝' },
  { name: 'こすぎ', family: '"Kosugi", sans-serif', category: 'ゴシック' },
  { name: 'こすぎ丸', family: '"Kosugi Maru", sans-serif', category: 'ゴシック' },
  { name: 'M PLUS 1p', family: '"M PLUS 1p", sans-serif', category: 'ゴシック' },
  { name: 'M PLUS Rounded 1c', family: '"M PLUS Rounded 1c", sans-serif', category: 'ゴシック' },
  { name: 'はんなり明朝', family: '"Hannari", serif', category: '明朝' },
  { name: 'こころ明朝', family: '"Kokoro", serif', category: '明朝' },
  { name: '遊星マジック', family: '"Yusei Magic", sans-serif', category: 'ゴシック' },
];

const categoryColors = {
  'サンセリフ': 'bg-gray-100 text-gray-800 border-gray-300',
  'ゴシック': 'bg-gray-100 text-gray-800 border-gray-300',
  'セリフ': 'bg-gray-200 text-gray-900 border-gray-400',
  '明朝': 'bg-gray-200 text-gray-900 border-gray-400',
  '等幅': 'bg-black text-white border-gray-600',
  'モノスペース': 'bg-black text-white border-gray-600',
  '筆記体': 'bg-gray-50 text-gray-700 border-gray-200',
  'ファンタジー': 'bg-gray-300 text-gray-900 border-gray-500',
  'ディスプレイ': 'bg-gray-800 text-white border-gray-700',
  'ローカル': 'bg-blue-100 text-blue-800 border-blue-300',
};

function App() {
  const [previewText, setPreviewText] = useState('素早い茶色の狐が怠惰な犬を飛び越える');
  const [isJapanese, setIsJapanese] = useState(true);
  const [copiedFont, setCopiedFont] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('すべて');
  const [sliderValue, setSliderValue] = useState(24); // スライダーが直接操作する値
  const debouncedFontSize = useDebounce(sliderValue, 200); // 200ms遅延して更新される値
  const [localJapaneseFonts, setLocalJapaneseFonts] = useState<FontData[]>([]);
  const [localEnglishFonts, setLocalEnglishFonts] = useState<FontData[]>([]);

  const defaultJapaneseText = 'いろはにほへと ちりぬるを わかよたれそ つねならむ';
  const defaultEnglishText = 'The quick brown fox jumps over the lazy dog';

  const currentFonts = useMemo(() => {
    const baseFonts = isJapanese ? japaneseFonts : englishFonts;
    const localFontsToCombine = isJapanese ? localJapaneseFonts : localEnglishFonts;

    const combined = [...baseFonts, ...localFontsToCombine];
    // 重複を除外
    const uniqueFonts = Array.from(new Map(combined.map(font => [font.name, font])).values());
    return uniqueFonts;
  }, [isJapanese, localJapaneseFonts, localEnglishFonts]);

  const categories = ['すべて', ...Array.from(new Set(currentFonts.map(font => font.category)))];

  const filteredFonts = currentFonts.filter(font => {
    const matchesSearch = font.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'すべて' || font.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleLanguageToggle = () => {
    setIsJapanese(!isJapanese);
    setSearchQuery('');
    setSelectedCategory('すべて');
    if (!isJapanese) {
      setPreviewText(defaultJapaneseText);
    } else {
      setPreviewText(defaultEnglishText);
    }
  };

  const copyFontName = async (fontName: string) => { // ★ 変更点: 引数名と処理を修正
    try {
      await navigator.clipboard.writeText(fontName);
      setCopiedFont(fontName);
      setTimeout(() => setCopiedFont(null), 2000);
    } catch (err) {
      console.error('フォント名のコピーに失敗しました:', err);
    }
  };

  // ★ 変更点: ローカルフォントを読み込む関数を追加
  const loadLocalFonts = async () => {
    if (!('queryLocalFonts' in window)) {
      alert('お使いのブラウザはローカルフォントの読み込みに対応していません。');
      return;
    }
    try {
      const availableFonts: FontMetadata[] = await window.queryLocalFonts!();

      const familyMap = new Map<string, FontData>();
      availableFonts.forEach(font => {
        if (!familyMap.has(font.family)) {
          familyMap.set(font.family, {
            name: font.family,
            family: `"${font.family}"`,
            category: 'ローカル',
          });
        }
      });

      const uniqueFamilies = Array.from(familyMap.values());

      const jaFonts: FontData[] = [];
      const enFonts: FontData[] = [];

      uniqueFamilies.forEach(fontData => {
        if (isJapaneseFont(fontData.name)) {
          jaFonts.push(fontData);
        } else {
          enFonts.push(fontData);
        }
      });

      setLocalJapaneseFonts(jaFonts);
      setLocalEnglishFonts(enFonts);

      alert(`読み込みが完了しました。\n日本語フォントファミリー: ${jaFonts.length}個\n英語フォントファミリー: ${enFonts.length}個`);

    } catch (err) {
      console.error('ローカルフォントの読み込みに失敗しました:', err);
      alert('フォントの読み込みがキャンセルされたか、エラーが発生しました。');
    }
  };

  return (
    <div className="min-h-screen bg-white">
        
        <title>【フォント比較】フォントを一覧プレビュー | Simple Font Viewer</title>
        <meta 
          name="description" 
          content="「フォント 比較」ツールならSimple Font Viewerへ。日本語・英語のWebフォントや、あなたのPCにインストール済みのローカルフォントを、入力したテキストで瞬時に比較・プレビューできます。デザイナーや開発者のフォント選びを効率化します。" 
        />
      

      <div className="relative z-10 w-full px-4 sm:px-8 py-16">
        {/* ヘッダー */}
        <div className="text-center mb-16">
          <h1 className="text-3xl font-light text-black mb-6 tracking-tight">
            Simple Font Viewer - シンプルなフォント比較ツール -
          </h1>
          <div className="w-24 h-px bg-black mx-auto mb-6"></div>
        </div>

        {/* コントロール */}
        <div className="bg-white border-2 border-gray-200 rounded-none shadow-lg mb-12">
          <div className="p-10">
            <div className="space-y-8">
              {/* テキスト入力 */}
              <div>
                <h2 className="text-1xl font-medium text-black mb-4">
                  プレビューテキスト
                </h2>
                <input
                  id="preview-text"
                  type="text"
                  value={previewText}
                  onChange={(e) => setPreviewText(e.target.value)}
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-300 rounded-none text-black placeholder-gray-500 focus:border-black focus:bg-white transition-all duration-300 text-lg font-light"
                  placeholder="フォントをプレビューするテキストを入力..."
                />
              </div>

              {/* ★ 変更点 1: 3つの要素を1つのグリッドコンテナにまとめる */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end pt-8 border-t-2 border-gray-100">

                {/* 1. 言語切り替え */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Languages className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-600 uppercase tracking-wider">言語</span>
                  </div>
                  <button
                    onClick={handleLanguageToggle}
                    className={`relative inline-flex items-center px-8 py-3 rounded-none transition-all duration-300 font-medium border-2 ${isJapanese
                      ? 'bg-black text-white border-black shadow-lg'
                      : 'bg-white text-black border-gray-300 hover:border-black'
                      }`}
                  >
                    {isJapanese ? '日本語' : 'English'}
                  </button>
                </div>

                {/* 2. フォントサイズ調整 */}
                <div>
                  {/* ★ 変更点 2: ラベルは即時反映の sliderValue を表示 */}
                  <h2 className="text-1xl font-medium text-black mb-4">
                    フォントサイズ: {sliderValue}px
                  </h2>
                  <input
                    id="font-size"
                    type="range"
                    min="12"
                    max="72"
                    // ★ 変更点 3: valueとonChangeは sliderValue を使う
                    value={sliderValue}
                    onChange={(e) => setSliderValue(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-none appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>12px</span>
                    <span>72px</span>
                  </div>
                </div>

                {/* 3. PCフォント読み込みボタン (★ 変更点 2: ここに移動) */}
                <div>
                  <button
                    onClick={loadLocalFonts}
                    // ★ 変更点 3: 高さを他のボタンと合わせるため py-3 に調整
                    className="w-full flex items-center justify-center space-x-3 px-8 py-3 bg-white text-black border-2 border-gray-300 rounded-none transition-all duration-300 hover:border-black group"
                  >
                    <FolderDown className="w-5 h-5 text-black " />
                    <span className="text-sm font-medium uppercase tracking-wider">
                      PCフォントを読み込む
                    </span>
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* ★★★ ここからフォントリストのUIを全面的に変更 ★★★ */}
        <div>
          <h3 className="mb-4 text-gray-600">
            <p>{isJapanese ? '日本語フォント' : '英語フォント'} ({filteredFonts.length}件)</p>
          </h3>

          {filteredFonts.length === 0 ? (
            <div className="border-2 border-gray-200 rounded-none p-16 text-center">
              <div className="text-gray-600 text-xl mb-3 font-light">フォントが見つかりません</div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">検索条件やフィルター条件を調整してください</div>
            </div>
          ) : (
            // ★ 変更点 1: grid から flex flex-wrap に変更
            <div className="flex flex-wrap gap-4">
              {filteredFonts.map((font) => (
                // --- フォントカード ---
                <div
                  key={font.name}
                  // ★ 変更点 2: aspect-square を削除し、最小幅(min-w)を追加
                  className="border border-gray-200 bg-white hover:shadow-lg hover:border-black transition-all duration-200 p-4 rounded-none flex flex-col items-center justify-center min-w-[160px]"
                >
                  {/* プレビューテキスト */}
                  <div className="overflow-hidden">
                    <p
                      className="text-center break-all text-black"
                      style={{
                        fontFamily: font.family,
                        // ★ 変更点 4: ここでは遅延更新された debouncedFontSize を使う
                        fontSize: `${debouncedFontSize}px`,
                        whiteSpace: 'nowrap',
                        lineHeight: 1.2
                      }}
                    >
                      {previewText}
                    </p>
                  </div>
                  {/* フォント名 */}
                  <p className="text-xs text-gray-500 mt-3 text-center truncate w-full">
                    {font.name}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* フッター */}
        <div className="text-center mt-16 text-gray-500">
          <div className="bg-gray-50 rounded-none px-8 py-6 border border-gray-200 max-w-2xl mx-auto">
          <h2 className="text-xl font-medium text-black mb-4">Simple Font Viewerについて</h2>
          <p className="text-base text-gray-700 leading-relaxed max-w-3xl mx-auto mb-8">
            このツールは、Webデザイナー、開発者、資料作成を行うすべての方のための、オンラインフォント比較ツールです。プレビューしたいテキストを入力し、フォントサイズを調整するだけで、様々な日本語・英語フォントがどのように表示されるかをリアルタイムで確認できます。さらに、「PCフォントを読み込む」機能を使えば、あなたのコンピュータにインストールされているお気に入りのフォントも一覧で比較可能です。最適なフォントを見つけるための時間と手間を、大幅に削減します。
          </p>
          
          <div className="w-24 h-px bg-gray-300 mx-auto mb-8"></div>
          
          {/* 既存の注意書き */}
          <p className="text-sm text-gray-500">
            フォントの利用可能性は、お使いのオペレーティングシステムとインストールされているフォントによって異なります。
            {isJapanese && '日本語フォントには適切なシステムサポートが必要な場合があります。'}
            また日本語・英語フォントを100%判別できかねるため、ご了承お願いいたします。
          </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 12px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f5f5f5;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 0;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 0;
          background: #000;
          cursor: pointer;
          border: 2px solid #fff;
          box-shadow: 0 0 0 1px #000;
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 0;
          background: #000;
          cursor: pointer;
          border: 2px solid #fff;
          box-shadow: 0 0 0 1px #000;
        }
      `}</style>
    </div>
  );
}

export default App;