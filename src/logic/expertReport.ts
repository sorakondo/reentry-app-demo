import type { Lang, QuestionId } from '../types';
import { translations } from '../i18n/translations';

// 日時を言語に応じて整形する（ja: 「2026年8月27日 11:30」 / en: "Aug 27, 2026, 11:30"）
export function formatDateTimeJP(date: Date, lang: Lang = 'ja'): string {
  if (lang === 'en') {
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  }
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const hh = date.getHours().toString().padStart(2, '0');
  const mm = date.getMinutes().toString().padStart(2, '0');
  return `${y}年${m}月${d}日 ${hh}:${mm}`;
}

/**
 * 1項目分の「判断できない」を専門家向けの文章に整理する（テンプレートベース）。
 * 実際のAI APIは使用せず、あらかじめ用意した定型文にコメントを組み込むデモ実装。
 */
export function buildQuestionSummaryText(
  questionId: QuestionId,
  comment: string,
  lang: Lang,
): string {
  const t = translations[lang];
  const base = t.questions[questionId].unknownBaseText;

  const trimmed = comment.trim();
  if (trimmed.length === 0) {
    return lang === 'en'
      ? `${base} There are no additional notes from the site.`
      : `${base} 現場からの追加情報はありません。`;
  }
  return lang === 'en'
    ? `${base} The site has reported the following: "${trimmed}"`
    : `${base} 現場からは次の状況が報告されています：「${trimmed}」`;
}

// 冒頭の要約文
export function buildOverallSummaryText(unknownCount: number, lang: Lang): string {
  const t = translations[lang];
  if (unknownCount === 0) {
    return t.expertRequest.overallSummaryNoUnknown;
  }
  return t.expertRequest.overallSummary(unknownCount);
}

// デモ用の受付番号を生成する（例: DEMO-4821）
export function generateCaseNumber(): string {
  const n = Math.floor(1000 + Math.random() * 9000);
  return `DEMO-${n}`;
}
