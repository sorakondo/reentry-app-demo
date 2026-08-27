import type { ChecklistQuestion } from '../types';

// チェックリスト5項目（構造のみ。表示文言は i18n/translations.ts）
// 質問文はすべて「危険がある状態そのもの」を尋ねる形式。
// 「はい」= 危険あり / 「いいえ」= 危険なし / 「判断できない」= 現場では確認できない
export const CHECKLIST_QUESTIONS: ChecklistQuestion[] = [
  { id: 'q1_tilt', order: 1 },
  { id: 'q2_crack', order: 2 },
  { id: 'q3_ceiling', order: 3 },
  { id: 'q4_fire', order: 4 },
  { id: 'q5_gas', order: 5, isGasRelated: true },
];
