import type { PriorCheckRecord } from '../types';

// 「この建物の確認は既に済んでいるか」を示すデモ用のダミー記録。
// 実際の保存機能とは接続せず、操作パネルの切り替えで表示/非表示を確認できるようにするだけの
// 見た目だけのモックデータ。
export const DEFAULT_PRIOR_CHECK: PriorCheckRecord = {
  signerName: '小林',
  savedAt: new Date(2026, 7, 27, 18, 7),
  recordId: 'REC-9240',
};
