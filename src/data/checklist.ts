import type { Answer, ChecklistQuestion, QuestionId } from '../types';

// 内閣府・東京消防庁の考え方を下敷きにしたデモ用の確認項目。
// 表示文言は i18n/translations.ts で管理し、状況に応じて関連項目だけを表示する。
// 質問文はすべて「危険がないか」を直接尋ねる肯定形（二重否定を避けた直接的な言い回し）。
// 「はい」= 危険あり（問題がある） / 「いいえ」= 危険なし（問題ない） / 「判断できない」= 現場では確認できない
//
// 項目は危険度が高いものから順に並べている。特に上位3項目
// （建物の傾き・沈下／柱・梁の重大な損傷／火災警報・消火設備の異常）は、
// 「はい」と回答した時点でそれだけで入場禁止（HOLD）が確定するため、
// 以降の項目を確認する意味がない。そのため isCriticalStop を付け、
// 回答した瞬間にチェックリストを終了させる（ChecklistScreen側で判定）。
export const CHECKLIST_QUESTIONS: ChecklistQuestion[] = [
  { id: 'q1_tilt', order: 1, isCritical: true, isCriticalStop: true },
  { id: 'q2_crack', order: 2, isCritical: true, isCriticalStop: true },
  { id: 'q9_fire', order: 3, isCritical: true, isCriticalStop: true },
  { id: 'q10_elevator', order: 4, isCritical: true },
  { id: 'q7_exit', order: 5, isCritical: true },
  { id: 'q3_adjacent', order: 6, isCritical: true },
  { id: 'q4_monitoring', order: 7, isCritical: true },
  { id: 'q12_missing_data', order: 8, isCritical: true },
  { id: 'q5_ceiling', order: 9 },
  { id: 'q6_glass', order: 10 },
  { id: 'q11_power', order: 11 },
];

function answerValue(answers: Answer[], questionId: QuestionId) {
  return answers.find((answer) => answer.questionId === questionId)?.value ?? null;
}

function hasConcern(answers: Answer[], questionId: QuestionId) {
  const value = answerValue(answers, questionId);
  // 「はい」= 危険あり（問題がある）、「判断できない」も要フォローとして扱う
  return value === 'yes' || value === 'unknown';
}

/** 回答内容に応じて、次に必要な確認項目だけを返す（危険度の高い項目から順に）。 */
export function getDynamicQuestions(answers: Answer[]): ChecklistQuestion[] {
  const ids: QuestionId[] = ['q1_tilt'];

  if (answerValue(answers, 'q1_tilt')) ids.push('q2_crack');
  if (answerValue(answers, 'q2_crack')) ids.push('q9_fire');
  if (answerValue(answers, 'q9_fire')) ids.push('q10_elevator');
  if (answerValue(answers, 'q10_elevator')) ids.push('q7_exit');
  if (answerValue(answers, 'q7_exit')) {
    if (hasConcern(answers, 'q1_tilt') || hasConcern(answers, 'q2_crack')) ids.push('q3_adjacent');
    ids.push('q4_monitoring');
  }
  if (answerValue(answers, 'q4_monitoring')) ids.push('q12_missing_data');
  if (answerValue(answers, 'q12_missing_data')) {
    if (hasConcern(answers, 'q9_fire')) ids.push('q5_ceiling', 'q6_glass');
    if (hasConcern(answers, 'q10_elevator')) ids.push('q11_power');
  }

  return ids.map((id) => CHECKLIST_QUESTIONS.find((question) => question.id === id)!);
}
