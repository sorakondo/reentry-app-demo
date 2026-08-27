import { CHECKLIST_QUESTIONS } from '../data/checklist';
import type { Answer, DangerReasonKey, GasAlarmState, JudgementDetail, ChecklistQuestion } from '../types';

/**
 * 判定優先順位:
 * HOLD: 重大な危険、ガス警報、避難経路の不通など
 * Expert Review: 構造・重要データを現場で判断できないなど
 * Targeted Check: 軽微な異常や設備項目に絞った追加確認が必要
 * Routine Check: 関連項目がすべて正常
 *
 * 表示用の文言はここでは持たず、キー（質問ID / 'gasAlarm'）のみを返す。
 * 実際の文言は i18n/translations.ts から選択言語に応じて解決する。
 */
export function judge(
  answers: Answer[],
  gasAlarm: GasAlarmState,
  questions: ChecklistQuestion[] = CHECKLIST_QUESTIONS,
): JudgementDetail {
  const gasAlarmTriggered = gasAlarm.status === 'alarm';
  const holdQuestionIds = new Set([
    'q1_tilt',
    'q2_crack',
    'q3_adjacent',
    'q7_exit',
    'q8_gas',
    'q9_fire',
    'q10_elevator',
    'q12_missing_data',
  ]);
  const expertQuestionIds = new Set([
    'q1_tilt',
    'q2_crack',
    'q3_adjacent',
    'q4_monitoring',
    'q7_exit',
    'q8_gas',
    'q9_fire',
    'q12_missing_data',
  ]);

  const dangerReasonKeys: DangerReasonKey[] = [];
  if (gasAlarmTriggered) {
    dangerReasonKeys.push('gasAlarm');
  }

  for (const q of questions) {
    const a = answers.find((x) => x.questionId === q.id);
    if (a?.value === 'no' && holdQuestionIds.has(q.id)) {
      dangerReasonKeys.push(q.id);
    }
  }

  const unknownItems = questions.filter((q) => {
    const a = answers.find((x) => x.questionId === q.id);
    return a?.value === 'unknown';
  }).map((q) => {
    const a = answers.find((x) => x.questionId === q.id);
    return { questionId: q.id, comment: a?.comment?.trim() ?? '' };
  });

  const targetedItems = questions
    .map((q) => ({ questionId: q.id, value: answers.find((a) => a.questionId === q.id)?.value }))
    .filter((item): item is { questionId: typeof item.questionId; value: 'no' | 'unknown' } => item.value === 'no' || item.value === 'unknown');
  const hasHoldFinding = questions.some((q) => {
    const answer = answers.find((a) => a.questionId === q.id);
    return answer?.value === 'no' && holdQuestionIds.has(q.id);
  });
  const hasExpertFinding = questions.some((q) => {
    const answer = answers.find((a) => a.questionId === q.id);
    return answer?.value === 'unknown' && expertQuestionIds.has(q.id);
  }) || questions.some((q) => q.id === 'q4_monitoring' && answers.find((a) => a.questionId === q.id)?.value === 'no');

  const baseDetail = {
    dangerReasonKeys,
    gasAlarmTriggered,
    unknownItems,
    targetedItems,
  };

  if (gasAlarmTriggered || hasHoldFinding) {
    return {
      ...baseDetail,
      result: 'hold',
    };
  }

  if (hasExpertFinding) {
    return {
      ...baseDetail,
      result: 'expert_review',
    };
  }

  if (targetedItems.length > 0) {
    return { ...baseDetail, result: 'targeted' };
  }

  return {
    ...baseDetail,
    result: 'routine',
  };
}
