import type { EntranceDisplayState } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface EntranceDisplayScreenProps {
  state: EntranceDisplayState;
}

/**
 * 建物入口に設置される案内表示（デジタルサイネージ）のデモ画面。
 * スマホ画面とは別の「入口ディスプレイ」を模しており、
 * スマホ側（ExpertCallScreen）のボタン操作でのみ表示が切り替わる。
 * 診断前・診断中は常に「診断中」を表示し、自動では切り替わらない。
 */
export default function EntranceDisplayScreen({ state }: EntranceDisplayScreenProps) {
  const { t } = useLanguage();

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
    <div className="flex h-full w-full items-center justify-center overflow-hidden bg-neutral-300 p-4 sm:p-10">
      {/* 入口ディスプレイ本体（横長16:9・スマホと同じ黒枠付き）を模した外枠 */}
      <div className="aspect-[16/9] max-h-full w-full max-w-[960px] overflow-hidden rounded-2xl border-[10px] border-neutral-900 bg-neutral-900 shadow-2xl sm:border-[16px]">
        <div
          className={`flex h-full w-full flex-col items-center justify-center gap-4 px-8 text-center transition-colors ${meta.bg}`}
        >
          <span className="text-6xl leading-none sm:text-8xl" aria-hidden="true">
            {meta.emoji}
          </span>
          <h1 className={`text-3xl font-extrabold sm:text-5xl ${meta.accent}`}>{meta.title}</h1>
          <p className="max-w-md text-base text-white/80 sm:text-lg">{meta.desc}</p>
          <p className="mt-4 text-xs text-white/40 sm:mt-8">{t.entranceDisplay.footerNote}</p>
        </div>
      </div>
    </div>
  );
}
