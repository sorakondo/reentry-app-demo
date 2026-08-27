import { useEffect, useState } from 'react';
import type { GasAlarmState } from '../types';
import { formatRelativeTime } from '../logic/useGasAlarm';
import { formatDateTimeJP } from '../logic/expertReport';
import { useLanguage } from '../i18n/LanguageContext';
import BigButton from '../components/BigButton';

interface HomeScreenProps {
  gasAlarm: GasAlarmState;
  onStart: () => void;
  onToggleAlarm: () => void;
}

export default function HomeScreen({
  gasAlarm,
  onStart,
  onToggleAlarm,
}: HomeScreenProps) {
  const { t, lang } = useLanguage();
  const [now, setNow] = useState(new Date());
  const [checkedAt] = useState(new Date());
  const [showDevPanel, setShowDevPanel] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const isNormal = gasAlarm.status === 'normal';

  return (
    <div className="flex flex-1 flex-col px-5 pb-6 pt-2">
      <header className="mb-6">
        <h1 className="text-2xl font-bold leading-tight text-neutral-900">
          {t.home.appTitle}
        </h1>
        <p className="mt-1 text-base text-neutral-500">{t.home.appSubtitle}</p>
      </header>

      <section className="mb-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
        <dl className="space-y-2 text-base">
          <div className="flex items-center justify-between">
            <dt className="text-neutral-500">{t.home.buildingNameLabel}</dt>
            <dd className="font-bold text-neutral-900">{t.common.buildingName}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-neutral-500">{t.home.checkedAtLabel}</dt>
            <dd className="font-bold text-neutral-900">
              {formatDateTimeJP(checkedAt, lang)}
            </dd>
          </div>
        </dl>
      </section>

      <section
        className={`mb-4 rounded-2xl border-2 p-4 ${
          isNormal
            ? 'border-green-200 bg-green-50'
            : 'border-red-300 bg-red-50'
        }`}
      >
        <p className="mb-1 text-sm font-bold text-neutral-500">
          {t.home.gasAlarmSectionTitle}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-2xl leading-none">
            {isNormal ? '\u{1F7E2}' : '\u{1F534}'}
          </span>
          <span
            className={`text-xl font-bold ${
              isNormal ? 'text-green-700' : 'text-red-700'
            }`}
          >
            {isNormal ? t.home.gasAlarmNormal : t.home.gasAlarmAlarm}
          </span>
        </div>
        <p className="mt-2 text-sm text-neutral-600">
          {isNormal ? t.home.gasAlarmNormalDesc : t.home.gasAlarmAlarmDesc}
        </p>
        <div className="mt-3 flex items-center justify-between text-xs text-neutral-400">
          <span>
            {t.home.gasLevelLabel}：
            {isNormal ? t.home.gasLevelNormal : t.home.gasLevelAbnormal}
          </span>
          <span>
            {t.home.lastUpdatedLabel}：
            {formatRelativeTime(gasAlarm.lastUpdated, now, lang)}
          </span>
        </div>
      </section>

      <p className="mb-6 rounded-xl bg-neutral-100 p-3 text-sm leading-relaxed text-neutral-500">
        {t.home.disclaimer}
      </p>

      <div className="mt-auto pt-4">
        <BigButton onClick={onStart} className="text-xl">
          {t.home.startButton}
        </BigButton>

        <div className="mt-6 border-t border-dashed border-neutral-200 pt-3">
          <button
            type="button"
            onClick={() => setShowDevPanel((v) => !v)}
            className="w-full text-center text-xs text-neutral-300"
          >
            {showDevPanel ? t.home.devPanelClose : t.home.devPanelOpen}
          </button>
          {showDevPanel && (
            <div className="mt-2 rounded-xl border border-neutral-200 bg-neutral-50 p-3">
              <p className="mb-2 text-xs text-neutral-400">{t.home.devPanelDesc}</p>
              <button
                type="button"
                onClick={onToggleAlarm}
                className="tap-target w-full rounded-xl border border-neutral-300 bg-white text-sm font-bold text-neutral-700 active:bg-neutral-100"
              >
                {t.home.toggleAlarmButton(
                  isNormal ? t.home.gasAlarmNormal : t.home.gasAlarmAlarm,
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
