import { CHECKLIST_QUESTIONS } from '../data/checklist';
import type { Answer, DangerReasonKey, GasAlarmState, JudgementDetail } from '../types';

/**
 * 判定優先順位:
 * 1位: 危険あり（「いいえ」が1つでもある、またはガス漏れ警報器が警報状態）→ 再入場しない
 * 2位: 判断不能（危険は確認されていないが「判断できない」が1つ以上ある）→ 専門家による確認が必要
 * 3位: 問題なし（すべて「はい」かつガス漏れ警報器が正常）→ 再入場可能
 *
 * 表示用の文言はここでは持たず、キー（質問ID / 'gasAlarm'）のみを返す。
 * 実際の文言は i18n/translations.ts から選択言語に応じて解決する。
 */
export function judge(
  answers: Answer[],
  gasAlarm: GasAlarmState,
): JudgementDetail {
  const gasAlarmTriggered = gasAlarm.status === 'alarm';

  const dangerReasonKeys: DangerReasonKey[] = [];
  if (gasAlarmTriggered) {
    dangerReasonKeys.push('gasAlarm');
  }

  for (const q of CHECKLIST_QUESTIONS) {
    const a = answers.find((x) => x.questionId === q.id);
    if (a?.value === 'no') {
      dangerReasonKeys.push(q.id);
    }
  }

  const hasDanger = dangerReasonKeys.length > 0;

  const unknownItems = CHECKLIST_QUESTIONS.filter((q) => {
    const a = answers.find((x) => x.questionId === q.id);
    return a?.value === 'unknown';
  }).map((q) => {
    const a = answers.find((x) => x.questionId === q.id);
    return { questionId: q.id, comment: a?.comment?.trim() ?? '' };
  });

  if (hasDanger) {
    return {
      result: 'unsafe',
      dangerReasonKeys,
      gasAlarmTriggered,
      unknownItems,
    };
  }

  if (unknownItems.length > 0) {
    return {
      result: 'expert_needed',
      dangerReasonKeys,
      gasAlarmTriggered,
      unknownItems,
    };
  }

  return {
    result: 'safe',
    dangerReasonKeys,
    gasAlarmTriggered,
    unknownItems: [],
  };
}
