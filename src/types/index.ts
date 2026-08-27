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
  | 'expertCall';

// 建物の構造種別
export type StructureType = 'RC' | 'S' | 'wood' | 'other';

// あらかじめ設定しておく建物の基本情報（デモではダミー値で初期化する）
export interface BuildingInfo {
  // 築年数
  ageYears: number | null;
  // 所在地
  location: string;
  // 建物の階数（地上階数）
  floors: number | null;
  // 構造種別（RC造・S造・木造・その他）
  structureType: StructureType | null;
  // 延床面積（m²）
  floorAreaSqm: number | null;
}

// 確認結果をアプリに保存した記録
export interface SavedResult {
  // 記録ID（例：REC-1234）
  id: string;
  result: JudgementResult;
  resultLabel: string;
  savedAt: Date;
  autoNote: string;
}

// 最終画面での署名状態
export interface SignatureState {
  signed: boolean;
  signedAt: Date | null;
  // 署名の画像（Canvasから書き出したデータURL）
  dataUrl: string | null;
}

// 表示言語
export type Lang = 'ja' | 'en';

// 震度情報の取得状態
export type SeismicStatus =
  | 'idle'
  | 'loading'
  | 'auto'
  | 'auto_no_data'
  | 'auto_failed'
  | 'manual';

// 震度（P2P地震情報のscale値。0=震度0, 10=1, 20=2, 30=3, 40=4, 45=5弱, 46=5弱以上未確定,
// 50=5強, 55=6弱, 60=6強, 70=7）
export type SeismicScale = 0 | 10 | 20 | 30 | 40 | 45 | 46 | 50 | 55 | 60 | 70 | null;

export interface SeismicInfo {
  status: SeismicStatus;
  scale: SeismicScale;
  // 観測地点名（都道府県 + 市区町村など）
  areaName: string;
  // 情報の観測・入力日時
  observedAt: Date | null;
  // 自動取得に失敗した理由（表示用）
  errorMessage?: string;
}
