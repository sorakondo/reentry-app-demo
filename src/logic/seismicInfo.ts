import type { SeismicInfo, SeismicScale } from '../types';

// 手動入力・表示用に選択可能な震度スケール値（ラベルは i18n/translations.ts 側で言語ごとに解決する）
export const MANUAL_SCALE_VALUES: Exclude<SeismicScale, null>[] = [
  0, 10, 20, 30, 40, 45, 50, 55, 60, 70,
];

// デモ用の固定モックデータ。実際の位置情報や外部APIへの通信は一切行わない。
// 「取得しているように見せる」ため、呼び出し側で短い遅延（ローディング表示）を演出する。
const MOCK_SCALE: Exclude<SeismicScale, null> = 30; // 震度3
const MOCK_AREA_NAME = '東京都千代田区';
const MOCK_DELAY_MS = 1200;

/**
 * 現在地周辺の震度情報を取得しているように見せるデモ用モック関数。
 * 実際のセンサー・位置情報・外部APIとは接続しない固定値を、
 * 少し遅延させてから返すことで「取得中…」の演出を行う。
 */
export function fetchNearbySeismicInfoMock(): Promise<SeismicInfo> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 'auto',
        scale: MOCK_SCALE,
        areaName: MOCK_AREA_NAME,
        observedAt: new Date(),
      });
    }, MOCK_DELAY_MS);
  });
}
