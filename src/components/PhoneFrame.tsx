import type { ReactNode } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

interface PhoneFrameProps {
  children: ReactNode;
}

/**
 * PCブラウザではスマートフォン程度の幅で中央表示し、
 * スマートフォン実機では画面幅いっぱいに表示するためのラッパー。
 * 全画面共通の日本語/English切り替えボタンもここに設置する。
 */
export default function PhoneFrame({ children }: PhoneFrameProps) {
  const { t, toggleLang } = useLanguage();

  return (
    <div className="min-h-dvh w-full bg-neutral-200 sm:flex sm:items-center sm:justify-center sm:py-6">
      <div
        className="relative mx-auto flex min-h-dvh w-full flex-col bg-white sm:min-h-[calc(100dvh-3rem)] sm:max-w-[430px] sm:rounded-[2.5rem] sm:border-8 sm:border-neutral-900 sm:shadow-2xl"
        style={{
          // 実機でのノッチ等の安全領域に配慮
          paddingTop: 'env(safe-area-inset-top)',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        <div className="flex justify-end px-4 pt-3">
          <button
            type="button"
            onClick={toggleLang}
            className="tap-target rounded-full border border-neutral-300 bg-white px-4 text-sm font-bold text-neutral-600 active:bg-neutral-100"
            aria-label="Switch language / 言語を切り替え"
          >
            {t.common.langToggleLabel}
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
