import type { ReactNode } from 'react';
import type { EntranceDisplayState, GasAlarmState } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { useScaleToFit } from '../hooks/useScaleToFit';

interface PhoneFrameProps {
  children: ReactNode;
  // 左上に常時表示するガス漏れ警報器の状態
  gasAlarm: GasAlarmState;
  // 左上のガス漏れ警報器の隣に、入口ディスプレイの現在の表示内容を同期して表示する
  entranceDisplayState: EntranceDisplayState;
  // 画面切り替えのたびに変わる値。スクロール位置を新しい画面の先頭にリセットするために使う。
  scrollResetKey?: string;
}

// スマホ画面の「基準サイズ」（縦長20:9）。中身は常にこのピクセル数でレイアウトし、
// 拡大率に応じて全体を transform: scale() で縮小/拡大して見せる
// （詳しい理由は useScaleToFit.ts のコメントを参照）。
const REF_WIDTH = 405;
const REF_HEIGHT = 900;

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
export default function PhoneFrame({
  children,
  gasAlarm,
  entranceDisplayState,
  scrollResetKey,
}: PhoneFrameProps) {
  const { t, toggleLang } = useLanguage();
  const { containerRef, scale } = useScaleToFit(REF_WIDTH, REF_HEIGHT);

  // バッジは幅が限られるため、正式名称（他画面で使用）とは別の短い表記を使う
  // （英語版でも1行に収まるようにするため）
  const alarmMeta = {
    normal: {
      emoji: '\u{1F7E2}',
      text: t.home.gasAlarmNormalBadge,
      className: 'border-green-300 bg-green-50 text-green-700',
    },
    alarm: {
      emoji: '\u{1F534}',
      text: t.home.gasAlarmAlarmBadge,
      className: 'border-red-300 bg-red-50 text-red-700',
    },
    noSignal: {
      emoji: '\u{1F7E0}',
      text: t.home.gasAlarmNoSignalBadge,
      className: 'border-orange-600 bg-orange-100 text-orange-800',
    },
  }[gasAlarm.status];

  // 入口ディスプレイの現在の表示内容と同じ内容を、ガス漏れ警報バッジの隣に同期表示する
  const entranceMeta = {
    diagnosing: {
      emoji: '⏳',
      text: t.entranceDisplay.diagnosingBadge,
      className: 'border-neutral-300 bg-neutral-100 text-neutral-600',
    },
    allowed: {
      emoji: '✅',
      text: t.entranceDisplay.allowedBadge,
      className: 'border-green-300 bg-green-50 text-green-700',
    },
    denied: {
      emoji: '⛔',
      text: t.entranceDisplay.deniedBadge,
      className: 'border-red-300 bg-red-50 text-red-700',
    },
  }[entranceDisplayState];

  return (
    <div
      ref={containerRef}
      className="flex h-full w-full items-center justify-center overflow-hidden bg-neutral-200 p-3 sm:p-6"
    >
      {/* 拡大縮小後の見た目の大きさに合わせた外枠（中央寄せ・はみ出し防止用） */}
      <div style={{ width: REF_WIDTH * scale, height: REF_HEIGHT * scale }}>
        {/* スマホ本体（縦長20:9・黒枠付き）を模した枠。
            常に REF_WIDTH×REF_HEIGHT の固定ピクセル数でレイアウトし、
            transform: scale() で見た目の大きさだけを調整する
           （画面拡大率が変わっても中身のレイアウトそのものは一切変化しないため崩れない）。 */}
        <div
          className="relative flex flex-col overflow-hidden rounded-[2.5rem] border-8 border-neutral-900 bg-white shadow-2xl"
          style={{
            width: REF_WIDTH,
            height: REF_HEIGHT,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            // 実機でのノッチ等の安全領域に配慮
            paddingTop: 'env(safe-area-inset-top)',
            paddingBottom: 'env(safe-area-inset-bottom)',
          }}
        >
          <div className="flex shrink-0 flex-wrap items-center justify-between gap-1.5 px-3 pt-3">
            <div className="flex flex-wrap items-center gap-1">
              <div
                className={`flex shrink items-center gap-1 whitespace-nowrap rounded-full border px-2 py-1 text-sm font-bold ${alarmMeta.className}`}
                aria-label={`${t.home.gasAlarmSectionTitle}: ${alarmMeta.text}`}
              >
                <span aria-hidden="true">{alarmMeta.emoji}</span>
                <span>{alarmMeta.text}</span>
              </div>
              <div
                className={`flex shrink items-center gap-1 whitespace-nowrap rounded-full border px-2 py-1 text-sm font-bold ${entranceMeta.className}`}
                aria-label={`${t.viewSwitcher.entranceTab}: ${entranceMeta.text}`}
              >
                <span aria-hidden="true">{entranceMeta.emoji}</span>
                <span>{entranceMeta.text}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={toggleLang}
              className="tap-target shrink-0 whitespace-nowrap rounded-full border border-neutral-300 bg-white px-3 text-sm font-bold text-neutral-600 active:bg-neutral-100"
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
    </div>
  );
}
