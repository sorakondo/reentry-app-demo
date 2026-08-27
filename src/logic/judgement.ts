import { CHECKLIST_QUESTIONS } from '../data/checklist';
import type { Answer, ChecklistQuestion, DangerReasonKey, GasAlarmState, JudgementDetail } from '../types';

/**
 * 判定優先順位:
 * HOLD: 重大な危険、ガス警報、避難経路の不通など
 * Expert Review: 構造・重要データを現場で判断できないなど
 * Targeted Check: 軽微な異常や設備項目に絞った追加確認が必要
 * Routine Check: 関連項目がすべて正常
 */
export function judge(
  answers: Answer[],
  gasAlarm: GasAlarmState,
  questions: ChecklistQuestion[] = CHECKLIST_QUESTIONS,
): JudgementDetail {
  const gasAlarmTriggered = gasAlarm.status === 'alarm';
  const holdQuestionIds = new Set([
    'q1_tilt', 'q2_crack', 'q3_adjacent', 'q7_exit',
    'q9_fire', 'q10_elevator', 'q12_missing_data',
  ]);
  const expertQuestionIds = new Set([
    'q1_tilt', 'q2_crack', 'q3_adjacent', 'q4_monitoring',
    'q7_exit', 'q9_fire', 'q12_missing_data',
  ]);

  const dangerReasonKeys: DangerReasonKey[] = [];
  if (gasAlarmTriggered) dangerReasonKeys.push('gasAlarm');

  for (const question of questions) {
    const answer = answers.find((item) => item.questionId === question.id);
    if (answer?.value === 'yes' && holdQuestionIds.has(question.id)) dangerReasonKeys.push(question.id);
  }

  const unknownItems = questions
    .filter((question) => answers.find((answer) => answer.questionId === question.id)?.value === 'unknown')
    .map((question) => ({
      questionId: question.id,
      comment: answers.find((answer) => answer.questionId === question.id)?.comment.trim() ?? '',
    }));

  const targetedItems = questions
    .map((question) => ({ questionId: question.id, value: answers.find((answer) => answer.questionId === question.id)?.value }))
    .filter((item): item is { questionId: typeof item.questionId; value: 'yes' | 'unknown' } => item.value === 'yes' || item.value === 'unknown');
  const hasHoldFinding = questions.some((question) =>
    answers.find((answer) => answer.questionId === question.id)?.value === 'yes' && holdQuestionIds.has(question.id),
  );
  const hasExpertFinding = questions.some((question) =>
    answers.find((answer) => answer.questionId === question.id)?.value === 'unknown' && expertQuestionIds.has(question.id),
  ) || questions.some((question) =>
    question.id === 'q4_monitoring' && answers.find((answer) => answer.questionId === question.id)?.value === 'yes',
  );

  const baseDetail = { dangerReasonKeys, gasAlarmTriggered, unknownItems, targetedItems };
  if (gasAlarmTriggered || hasHoldFinding) return { ...baseDetail, result: 'hold' };
  if (hasExpertFinding) return { ...baseDetail, result: 'expert_review' };
  if (targetedItems.length > 0) return { ...baseDetail, result: 'targeted' };
  return { ...baseDetail, result: 'routine' };
}
