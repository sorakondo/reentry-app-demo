import { useEffect, useRef, useState } from 'react';
import type { AlarmStatus, GasAlarmState, Lang } from '../types';
import { translations } from '../i18n/translations';

/**
 * ガス漏れ警報器のモックフック。
 * 実際のセンサーとは接続せず、固定のモックデータを使用する。
 * デモとして「リアルタイム受信している」ように見せるため、
 * 数秒おきに最終受信時刻だけを更新する。
 */
export function useGasAlarm() {
  const [status, setStatus] = useState<AlarmStatus>('normal');
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setLastUpdated(new Date());
    }, 4000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  function toggleStatus() {
    setStatus((prev) => (prev === 'normal' ? 'alarm' : 'normal'));
    setLastUpdated(new Date());
  }

  function setNormal() {
    setStatus('normal');
    setLastUpdated(new Date());
  }

  function setAlarm() {
    setStatus('alarm');
    setLastUpdated(new Date());
  }

  const state: GasAlarmState = {
    status,
    lastUpdated,
  };

  return { state, toggleStatus, setNormal, setAlarm };
}

// 「数秒前」のような相対時間表示（言語対応）
export function formatRelativeTime(from: Date, now: Date, lang: Lang): string {
  const t = translations[lang].home;
  const diffSec = Math.max(0, Math.floor((now.getTime() - from.getTime()) / 1000));
  if (diffSec < 5) return t.relativeJustNow;
  if (diffSec < 60) return t.relativeSecondsAgo(diffSec);
  const diffMin = Math.floor(diffSec / 60);
  return t.relativeMinutesAgo(diffMin);
}
