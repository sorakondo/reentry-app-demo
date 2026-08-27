// 回答の種類
export type AnswerValue = 'yes' | 'no' | 'unknown';

// チェックリスト1問分の回答
export interface Answer {
  questionId: string;
  value: AnswerValue | null;
  comment: string;
}

// チェックリストの質問ID
export type QuestionId =
  | 'q1_tilt'
  | 'q2_crack'
  | 'q3_adjacent'
  | 'q4_monitoring'
  | 'q5_ceiling'
  | 'q6_glass'
  | 'q7_exit'
  | 'q8_gas'
  | 'q9_fire'
  | 'q10_elevator'
  | 'q11_power'
  | 'q12_missing_data';

// チェックリストの質問定義（表示文言は i18n/translations.ts 側で言語ごとに管理する）
export interface ChecklistQuestion {
  id: QuestionId;
  order: number;
  // ガス・構造など、異常時にHOLDへ直結する項目かどうか
  isCritical?: boolean;
  isGasRelated?: boolean;
}

// ガス漏れ警報器の状態
export type AlarmStatus = 'normal' | 'alarm';

export interface GasAlarmState {
  status: AlarmStatus;
  // デモ用: 最終受信からの経過を演出するための基準時刻
  lastUpdated: Date;
}

// 最終判定の4種類
export type JudgementResult = 'routine' | 'targeted' | 'expert_review' | 'hold';

// 「再入場しない」理由のキー（'gasAlarm' またはガス警報以外の質問ID）
export type DangerReasonKey = 'gasAlarm' | QuestionId;

export interface JudgementDetail {
  result: JudgementResult;
  // 「再入場しない」理由（危険あり項目 + ガス警報）
  dangerReasonKeys: DangerReasonKey[];
  gasAlarmTriggered: boolean;
  // 「専門家による確認が必要」の対象項目
  unknownItems: { questionId: QuestionId; comment: string }[];
  // 追加確認が必要な対象項目
  targetedItems: { questionId: QuestionId; value: Exclude<AnswerValue, 'yes'> }[];
}

// アプリの画面
export type Screen =
  | 'home'
  | 'checklist'
  | 'result'
  | 'expertRequest'
  | 'expertSent';

export interface BuildingInfo {
  name: string;
}

// 表示言語
export type Lang = 'ja' | 'en';
