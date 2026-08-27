import type { AlarmStatus, PriorCheckRecord } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { DEFAULT_PRIOR_CHECK } from '../data/priorCheck';

interface ControlPanelScreenProps {
  gasAlarmStatus: AlarmStatus;
  onSetGasAlarmStatus: (status: AlarmStatus) => void;
  priorCheck: PriorCheckRecord | null;
  onSetPriorCheck: (record: PriorCheckRecord | null) => void;
}

/**
 * デモ発表用の操作パネル（実際のシステムには存在しない）。
 * ガス漏れ警報器の状態（正常／異常／通信なし）と、
 * 「この建物の確認記録」の有無をその場で切り替えられるようにするだけの、
 * 見た目だけの操作用画面。
 */
export default function ControlPanelScreen({
  gasAlarmStatus,
  onSetGasAlarmStatus,
  priorCheck,
  onSetPriorCheck,
}: ControlPanelScreenProps) {
  const { t } = useLanguage();

  const statusLabel = {
    normal: t.home.gasAlarmNormal,
    alarm: t.home.gasAlarmAlarm,
    noSignal: t.home.gasAlarmNoSignal,
  }[gasAlarmStatus];

  function gasButtonClass(active: boolean, activeClass: string) {
    return `tap-target rounded-xl border-2 px-2 py-3 text-sm font-bold ${
      active ? activeClass : 'border-neutral-200 bg-white text-neutral-600'
    }`;
  }

  return (
    <div className="h-full w-full overflow-y-auto bg-neutral-100 px-6 py-8">
      <div className="mx-auto max-w-md">
        <h1 className="text-xl font-bold text-neutral-900">{t.controlPanel.title}</h1>
        <p className="mb-6 mt-1 text-sm text-neutral-500">{t.controlPanel.subtitle}</p>

        <section className="mb-6 rounded-2xl border border-neutral-200 bg-white p-4">
          <p className="mb-1 text-sm font-bold text-neutral-500">
            {t.controlPanel.gasAlarmSectionTitle}
          </p>
          <p className="mb-3 text-sm text-neutral-600">
            {t.controlPanel.currentStatusLabel}：
            <span className="font-bold text-neutral-900">{statusLabel}</span>
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => onSetGasAlarmStatus('normal')}
              className={gasButtonClass(
                gasAlarmStatus === 'normal',
                'border-green-400 bg-green-50 text-green-700',
              )}
            >
              {t.controlPanel.setNormalButton}
            </button>
            <button
              type="button"
              onClick={() => onSetGasAlarmStatus('alarm')}
              className={gasButtonClass(
                gasAlarmStatus === 'alarm',
                'border-red-400 bg-red-50 text-red-700',
              )}
            >
              {t.controlPanel.setAlarmButton}
            </button>
            <button
              type="button"
              onClick={() => onSetGasAlarmStatus('noSignal')}
              className={gasButtonClass(
                gasAlarmStatus === 'noSignal',
                'border-orange-600 bg-orange-100 text-orange-800',
              )}
            >
              {t.controlPanel.setNoSignalButton}
            </button>
          </div>
        </section>

        <section className="rounded-2xl border border-neutral-200 bg-white p-4">
          <p className="mb-1 text-sm font-bold text-neutral-500">
            {t.controlPanel.priorCheckSectionTitle}
          </p>
          <p className="mb-3 text-sm text-neutral-600">
            {t.controlPanel.priorCheckCurrentLabel}：
            <span className="font-bold text-neutral-900">
              {priorCheck ? t.controlPanel.priorCheckOnStatus : t.controlPanel.priorCheckOffStatus}
            </span>
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onSetPriorCheck(DEFAULT_PRIOR_CHECK)}
              className={gasButtonClass(
                !!priorCheck,
                'border-green-400 bg-green-50 text-green-700',
              )}
            >
              {t.controlPanel.priorCheckOnButton}
            </button>
            <button
              type="button"
              onClick={() => onSetPriorCheck(null)}
              className={gasButtonClass(
                !priorCheck,
                'border-neutral-500 bg-neutral-100 text-neutral-700',
              )}
            >
              {t.controlPanel.priorCheckOffButton}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
