import type { ReactNode } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

interface PhoneFrameProps {
  children: ReactNode;
  // 画面切り替えのたびに変わる値。スクロール位置を新しい画面の先頭にリセットするために使う。
  scrollResetKey?: string;
}

/**
 * PCブラウザではスマートフォン程度の幅で中央表示し、
 * スマートフォン実機では画面幅いっぱいに表示するためのラッパー。
 * 全画面共通の日本語/English切り替えボタンもここに設置する。
 *
 * スマートフォンの画面サイズは一定であるため、外枠の高さは固定し、
 * 内容が収まりきらない場合は枠内だけがスクロールするようにする
 * （外枠自体が縦に伸びないようにする）。
 * スクロール領域は画面（scrollResetKey）が変わるたびに作り直し、
 * 前の画面のスクロール位置を引き継がないようにする。
 */
export default function PhoneFrame({ children, scrollResetKey }: PhoneFrameProps) {
  const { t, toggleLang } = useLanguage();

  return (
    <div className="h-dvh w-full overflow-hidden bg-neutral-200 sm:flex sm:items-center sm:justify-center sm:py-6">
      <div
        className="relative mx-auto flex h-dvh w-full flex-col overflow-hidden bg-white sm:h-[calc(100dvh-3rem)] sm:max-w-[430px] sm:rounded-[2.5rem] sm:border-8 sm:border-neutral-900 sm:shadow-2xl"
        style={{
          // 実機でのノッチ等の安全領域に配慮
          paddingTop: 'env(safe-area-inset-top)',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        <div className="flex shrink-0 justify-end px-4 pt-3">
          <button
            type="button"
            onClick={toggleLang}
            className="tap-target rounded-full border border-neutral-300 bg-white px-4 text-sm font-bold text-neutral-600 active:bg-neutral-100"
            aria-label="Switch language / 言語を切り替え"
          >
            {t.common.langToggleLabel}
          </button>
        </div>
        <div key={scrollResetKey} className="flex min-h-0 flex-1 flex-col overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
