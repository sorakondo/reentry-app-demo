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
  | 'q3_ceiling'
  | 'q4_fire'
  | 'q5_gas';

// チェックリストの質問定義（表示文言は i18n/translations.ts 側で言語ごとに管理する）
export interface ChecklistQuestion {
  id: QuestionId;
  order: number;
  // ガス臭に関する項目かどうか（特に重要な項目として扱う）
  isGasRelated?: boolean;
}

// ガス漏れ警報器の状態
export type AlarmStatus = 'normal' | 'alarm';

export interface GasAlarmState {
  status: AlarmStatus;
  // デモ用: 最終受信からの経過を演出するための基準時刻
  lastUpdated: Date;
}

// 最終判定の3種類
export type JudgementResult = 'safe' | 'unsafe' | 'expert_needed';

// 「再入場しない」理由のキー（'gasAlarm' またはガス警報以外の質問ID）
export type DangerReasonKey = 'gasAlarm' | QuestionId;

export interface JudgementDetail {
  result: JudgementResult;
  // 「再入場しない」理由（危険あり項目 + ガス警報）
  dangerReasonKeys: DangerReasonKey[];
  gasAlarmTriggered: boolean;
  // 「専門家による確認が必要」の対象項目
  unknownItems: { questionId: QuestionId; comment: string }[];
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
