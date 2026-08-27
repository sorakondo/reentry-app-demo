import type { ReactNode } from 'react';
import type { GasAlarmState } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface PhoneFrameProps {
  children: ReactNode;
  // 左上に常時表示するガス漏れ警報器の状態
  gasAlarm: GasAlarmState;
  // 画面切り替えのたびに変わる値。スクロール位置を新しい画面の先頭にリセットするために使う。
  scrollResetKey?: string;
}

/**
 * PCブラウザではスマートフォン程度の幅で中央表示し、
 * スマートフォン実機では画面幅いっぱいに表示するためのラッパー。
 * 全画面共通の日本語/English切り替えボタン（右上）と
 * ガス漏れ警報器の状態バッジ（左上）をここに設置する。
 *
 * 高さは親要素（App側のビュー切り替えタブの残り領域）いっぱいに広がるようにし、
 * 内容が収まりきらない場合は枠内だけがスクロールするようにする
 * （外枠自体が縦に伸びないようにする）。
 * スクロール領域は画面（scrollResetKey）が変わるたびに作り直し、
 * 前の画面のスクロール位置を引き継がないようにする。
 */
export default function PhoneFrame({ children, gasAlarm, scrollResetKey }: PhoneFrameProps) {
  const { t, toggleLang } = useLanguage();

  const alarmMeta = {
    normal: {
      emoji: '\u{1F7E2}',
      text: t.home.gasAlarmNormal,
      className: 'border-green-300 bg-green-50 text-green-700',
    },
    alarm: {
      emoji: '\u{1F534}',
      text: t.home.gasAlarmAlarm,
      className: 'border-red-300 bg-red-50 text-red-700',
    },
    noSignal: {
      emoji: '⚪',
      text: t.home.gasAlarmNoSignal,
      className: 'border-neutral-300 bg-neutral-100 text-neutral-500',
    },
  }[gasAlarm.status];

  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden bg-neutral-200 p-3 sm:p-6">
      {/* スマホ本体（縦長20:9・黒枠付き）を模した外枠 */}
      <div
        className="relative mx-auto flex aspect-[9/20] h-full max-h-full w-auto max-w-[420px] flex-col overflow-hidden rounded-[2.5rem] border-8 border-neutral-900 bg-white shadow-2xl"
        style={{
          // 実機でのノッチ等の安全領域に配慮
          paddingTop: 'env(safe-area-inset-top)',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        <div className="flex shrink-0 items-center justify-between px-4 pt-3">
          <div
            className={`flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-bold ${alarmMeta.className}`}
            aria-label={`${t.home.gasAlarmSectionTitle}: ${alarmMeta.text}`}
          >
            <span aria-hidden="true">{alarmMeta.emoji}</span>
            <span>{alarmMeta.text}</span>
          </div>
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
