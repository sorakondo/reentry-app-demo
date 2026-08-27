import type { Answer, ChecklistQuestion, QuestionId } from '../types';

// 内閣府・東京消防庁の考え方を下敷きにしたデモ用の確認項目。
// 表示文言は i18n/translations.ts で管理し、状況に応じて関連項目だけを表示する。
// 質問文はすべて「危険がないか」という形式。
// 「はい」= 危険なし / 「いいえ」= 危険あり / 「判断できない」= 現場では確認できない
export const CHECKLIST_QUESTIONS: ChecklistQuestion[] = [
  { id: 'q1_tilt', order: 1, isCritical: true },
  { id: 'q2_crack', order: 2, isCritical: true },
  { id: 'q3_adjacent', order: 3, isCritical: true },
  { id: 'q4_monitoring', order: 4, isCritical: true },
  { id: 'q5_ceiling', order: 5 },
  { id: 'q6_glass', order: 6 },
  { id: 'q7_exit', order: 7, isCritical: true },
  { id: 'q8_gas', order: 8, isCritical: true, isGasRelated: true },
  { id: 'q9_fire', order: 9, isCritical: true },
  { id: 'q10_elevator', order: 10, isCritical: true },
  { id: 'q11_power', order: 11 },
  { id: 'q12_missing_data', order: 12, isCritical: true },
];

function answerValue(answers: Answer[], questionId: QuestionId) {
  return answers.find((answer) => answer.questionId === questionId)?.value ?? null;
}

function hasConcern(answers: Answer[], questionId: QuestionId) {
  const value = answerValue(answers, questionId);
  return value === 'no' || value === 'unknown';
}

/**
 * 回答済みの内容から、次に必要な確認項目だけを返す。
 * 未回答の設問は前提条件が満たされた時点で初めて列に追加される。
 */
export function getDynamicQuestions(answers: Answer[]): ChecklistQuestion[] {
  const ids: QuestionId[] = ['q1_tilt'];

  if (answerValue(answers, 'q1_tilt')) {
    ids.push('q2_crack');
  }
  if (answerValue(answers, 'q2_crack')) {
    if (hasConcern(answers, 'q1_tilt') || hasConcern(answers, 'q2_crack')) ids.push('q3_adjacent');
    ids.push('q4_monitoring');
  }
  if (answerValue(answers, 'q4_monitoring')) {
    ids.push('q7_exit');
  }
  if (answerValue(answers, 'q7_exit')) {
    if (hasConcern(answers, 'q7_exit')) {
      ids.push('q10_elevator');
      if (answerValue(answers, 'q10_elevator') && hasConcern(answers, 'q10_elevator')) ids.push('q11_power');
    }
    ids.push('q8_gas');
  }
  if (answerValue(answers, 'q8_gas')) {
    ids.push('q9_fire');
  }
  if (answerValue(answers, 'q9_fire')) {
    if (hasConcern(answers, 'q9_fire')) {
      ids.push('q5_ceiling', 'q6_glass');
    }
    ids.push('q12_missing_data');
  }

  return ids.map((id) => CHECKLIST_QUESTIONS.find((question) => question.id === id)!);
}
