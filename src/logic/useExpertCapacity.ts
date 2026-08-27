import { useEffect, useState } from 'react';

// 専門家によるビデオ通話対応の受付上限（デモ用の固定値）
export const EXPERT_CAPACITY_TOTAL = 100;
const INITIAL_OCCUPIED = 76;
const MIN_OCCUPIED = 40;
const MAX_OCCUPIED = 98;

/**
 * 専門家のビデオ通話対応がどれくらい埋まっているかを表すデモ用モック。
 * 実際の予約・受付システムとは接続せず、ダッシュボードが生きているように
 * 見せるため、数秒おきに小さく数値を上下させる。
 */
export function useExpertCapacity() {
  const [occupied, setOccupied] = useState(INITIAL_OCCUPIED);

  useEffect(() => {
    const timer = setInterval(() => {
      setOccupied((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2; // -2 〜 +2
        const next = prev + delta;
        return Math.min(MAX_OCCUPIED, Math.max(MIN_OCCUPIED, next));
      });
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return { occupied, total: EXPERT_CAPACITY_TOTAL };
}

export type CongestionLevel = 'available' | 'moderate' | 'congested';

export function getCongestionLevel(occupied: number, total: number): CongestionLevel {
  const ratio = occupied / total;
  if (ratio >= 0.85) return 'congested';
  if (ratio >= 0.6) return 'moderate';
  return 'available';
}
