import type { EntranceDisplayState } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { useScaleToFit } from '../hooks/useScaleToFit';

interface EntranceDisplayScreenProps {
  state: EntranceDisplayState;
}

// 入口ディスプレイの「基準サイズ」（横長16:9）。中身は常にこのピクセル数でレイアウトし、
// 拡大率に応じて全体を transform: scale() で縮小/拡大して見せる
// （詳しい理由は useScaleToFit.ts のコメントを参照）。
const REF_WIDTH = 960;
const REF_HEIGHT = 540;

/**
 * 建物入口に設置される案内表示（デジタルサイネージ）のデモ画面。
 * スマホ画面とは別の「入口ディスプレイ」を模しており、
 * チェックリストの判定結果に応じて自動的に表示が切り替わる
 * （診断前・診断中は「診断中」、HOLD判定なら「入場禁止」、
 * 　問題なしと判定されれば「入場可能」。手動での切り替えはできない）。
 */
export default function EntranceDisplayScreen({ state }: EntranceDisplayScreenProps) {
  const { t } = useLanguage();
  const { containerRef, scale } = useScaleToFit(REF_WIDTH, REF_HEIGHT);

  const meta = {
    diagnosing: {
      emoji: '⏳',
      title: t.entranceDisplay.diagnosingTitle,
      desc: t.entranceDisplay.diagnosingDesc,
      bg: 'bg-neutral-800',
      accent: 'text-amber-300',
    },
    allowed: {
      emoji: '✅',
      title: t.entranceDisplay.allowedTitle,
      desc: t.entranceDisplay.allowedDesc,
      bg: 'bg-green-700',
      accent: 'text-white',
    },
    denied: {
      emoji: '⛔',
      title: t.entranceDisplay.deniedTitle,
      desc: t.entranceDisplay.deniedDesc,
      bg: 'bg-red-700',
      accent: 'text-white',
    },
  }[state];

  return (
    <div
      ref={containerRef}
      className="flex h-full w-full items-center justify-center overflow-hidden bg-neutral-300 p-4 sm:p-10"
    >
      {/* 拡大縮小後の見た目の大きさに合わせた外枠（中央寄せ・はみ出し防止用） */}
      <div style={{ width: REF_WIDTH * scale, height: REF_HEIGHT * scale }}>
        {/* 入口ディスプレイ本体（横長16:9・スマホと同じ黒枠付き）を模した枠。
            常に REF_WIDTH×REF_HEIGHT の固定ピクセル数でレイアウトし、
            transform: scale() で見た目の大きさだけを調整する
           （画面拡大率が変わっても中身のレイアウトそのものは一切変化しないため崩れない）。 */}
        <div
          className="overflow-hidden rounded-2xl border-[16px] border-neutral-900 bg-neutral-900 shadow-2xl"
          style={{
            width: REF_WIDTH,
            height: REF_HEIGHT,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}
        >
          <div
            className={`flex h-full w-full flex-col items-center justify-center gap-4 px-8 text-center transition-colors ${meta.bg}`}
          >
            <span className="text-8xl leading-none" aria-hidden="true">
              {meta.emoji}
            </span>
            <h1 className={`text-5xl font-extrabold ${meta.accent}`}>{meta.title}</h1>
            <p className="max-w-md text-lg text-white/80">{meta.desc}</p>
            <p className="mt-8 text-xs text-white/40">{t.entranceDisplay.footerNote}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
