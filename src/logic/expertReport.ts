import type { JudgementDetail, Lang, QuestionId, SeismicInfo } from '../types';
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

// 専門家向け相談文に含める、周辺の震度に関する一文（テンプレートベース）
export function buildSeismicSummarySentence(seismicInfo: SeismicInfo, lang: Lang): string {
  const t = translations[lang];
  const sourceLabel =
    seismicInfo.status === 'manual'
      ? t.seismic.sourceManualBadge
      : t.seismic.sourceAutoBadge;
  const area = seismicInfo.areaName || t.seismic.areaUnknown;

  if (seismicInfo.status === 'auto_no_data') {
    return lang === 'en'
      ? `No recent seismic intensity reports were found near the site (${area}, ${sourceLabel}).`
      : `現場付近（${area}・${sourceLabel}）では、直近の震度情報の報告はありませんでした。`;
  }

  if (seismicInfo.status === 'auto_failed' || seismicInfo.scale === null) {
    return lang === 'en'
      ? 'Seismic intensity information for the area is not available.'
      : '現場付近の震度情報は取得できていません。';
  }

  const scaleLabel = t.seismic.scaleLabel(seismicInfo.scale);
  return lang === 'en'
    ? `Nearby seismic intensity: ${scaleLabel} (${area}, ${sourceLabel}).`
    : `現場付近の震度：${scaleLabel}（${area}・${sourceLabel}）。`;
}

// デモ用の受付番号を生成する（例: DEMO-4821）
export function generateCaseNumber(): string {
  const n = Math.floor(1000 + Math.random() * 9000);
  return `DEMO-${n}`;
}

// 確認結果の保存記録用ID（例: REC-4821）
export function generateRecordId(): string {
  const n = Math.floor(1000 + Math.random() * 9000);
  return `REC-${n}`;
}

// 「確認結果をアプリに保存」した際の自動整理メモ（テンプレートベース）
export function buildSavedResultNote(judgement: JudgementDetail, lang: Lang): string {
  const t = translations[lang];
  const title =
    judgement.result === 'routine'
      ? t.result.titleRoutine
      : judgement.result === 'targeted'
        ? t.result.titleTargeted
        : judgement.result === 'hold'
          ? t.result.titleHold
          : t.result.titleExpert;

  if (judgement.result === 'routine') {
    return lang === 'en'
      ? `Result: "${title}". No obvious danger was found in the on-site check.`
      : `判定結果：「${title}」。今回の確認では明らかな危険は確認されませんでした。`;
  }

  if (judgement.result === 'hold') {
    const count = judgement.dangerReasonKeys.length;
    return lang === 'en'
      ? `Result: "${title}". ${count} hazard item(s) were confirmed on site.`
      : `判定結果：「${title}」。現場で${count}件の危険項目が確認されました。`;
  }

  const count = judgement.result === 'targeted'
    ? judgement.targetedItems.length
    : judgement.unknownItems.length;
  return lang === 'en'
    ? `Result: "${title}". ${count} item(s) need additional review on site.`
    : `判定結果：「${title}」。現場で追加確認が必要な項目が${count}件あります。`;
}
