import { useEffect, useRef, useState } from 'react';
import type { BuildingInfo, PriorCheckRecord, SeismicInfo, SeismicScale } from '../types';
import { formatDateTimeJP } from '../logic/expertReport';
import { fetchNearbySeismicInfoMock, MANUAL_SCALE_VALUES } from '../logic/seismicInfo';
import { getCongestionLevel, useExpertCapacity } from '../logic/useExpertCapacity';
import { useLanguage } from '../i18n/LanguageContext';
import BigButton from '../components/BigButton';
import BuildingInfoModal from '../components/BuildingInfoModal';

interface HomeScreenProps {
  // この建物の確認が既に済んでいるかを示すデモ用の記録（操作パネルから切り替え可能）
  priorCheck: PriorCheckRecord | null;
  buildingInfo: BuildingInfo;
  onBuildingInfoChange: (info: BuildingInfo) => void;
  onStart: () => void;
  onSeismicInfoChange: (info: SeismicInfo) => void;
}

const LOADING_INFO: SeismicInfo = {
  status: 'loading',
  scale: null,
  areaName: '',
  observedAt: null,
};

export default function HomeScreen({
  priorCheck,
  buildingInfo,
  onBuildingInfoChange,
  onStart,
  onSeismicInfoChange,
}: HomeScreenProps) {
  const { t, lang } = useLanguage();
  const [now, setNow] = useState(new Date());
  const [checkedAt] = useState(new Date());
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const [autoInfo, setAutoInfo] = useState<SeismicInfo>(LOADING_INFO);
  const [manualMode, setManualMode] = useState(false);
  const [manualScale, setManualScale] = useState<SeismicScale>(null);
  const [manualArea, setManualArea] = useState('');
  const fetchTokenRef = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  function runAutoFetch() {
    const token = ++fetchTokenRef.current;
    setAutoInfo(LOADING_INFO);
    // デモ用モック: 実際の位置情報・外部APIへの通信は行わず、
    // 「取得しているように見せる」ための固定データを少し遅延させて返す。
    fetchNearbySeismicInfoMock().then((info) => {
      if (fetchTokenRef.current !== token) return;
      setAutoInfo(info);
    });
  }

  // 初回マウント時に自動取得（デモ用モック）を試みる
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    runAutoFetch();
  }, []);

  const effectiveInfo: SeismicInfo = manualMode
    ? {
        status: 'manual',
        scale: manualScale,
        areaName: manualArea.trim(),
        observedAt: manualScale !== null ? now : null,
      }
    : autoInfo;

  useEffect(() => {
    onSeismicInfoChange(effectiveInfo);
    // effectiveInfo is derived fresh each render; compare by relevant fields only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    manualMode,
    manualScale,
    manualArea,
    autoInfo.status,
    autoInfo.scale,
    autoInfo.areaName,
  ]);

  const seismicDisplayLabel =
    !manualMode && autoInfo.status === 'loading'
      ? t.seismic.statusLoading
      : effectiveInfo.status === 'auto_no_data'
        ? t.seismic.statusNoData
        : effectiveInfo.scale === null
          ? t.seismic.manualNotSet
          : t.seismic.scaleLabel(effectiveInfo.scale);

  const { occupied, total } = useExpertCapacity();
  const congestion = getCongestionLevel(occupied, total);
  const congestionMeta = {
    available: {
      barClass: 'bg-green-500',
      textClass: 'text-green-700',
      statusText: t.expertCapacity.statusAvailable,
    },
    moderate: {
      barClass: 'bg-amber-500',
      textClass: 'text-amber-700',
      statusText: t.expertCapacity.statusModerate,
    },
    congested: {
      barClass: 'bg-red-500',
      textClass: 'text-red-700',
      statusText: t.expertCapacity.statusCongested,
    },
  }[congestion];

  return (
    <div className="flex flex-1 flex-col px-5 pb-6 pt-2">
      <header className="mb-6">
        <h1 className="text-2xl font-bold leading-tight text-neutral-900">
          {t.home.appTitle}
        </h1>
        <p className="mt-1 text-base text-neutral-500">{t.home.appSubtitle}</p>
      </header>

      {/* この建物の確認が既に済んでいるかを示すデモ用の記録カード */}
      <section
        className={`mb-4 rounded-2xl border p-4 ${
          priorCheck
            ? 'border-indigo-200 bg-indigo-50/50'
            : 'border-neutral-200 bg-neutral-50'
        }`}
      >
        <p className="mb-2 text-sm font-bold text-neutral-500">{t.priorCheck.sectionTitle}</p>
        {priorCheck ? (
          <dl className="space-y-1.5 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-neutral-500">{t.priorCheck.signerLabel}</dt>
              <dd className="font-bold text-neutral-900">{priorCheck.signerName}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-neutral-500">{t.priorCheck.savedAtLabel}</dt>
              <dd className="font-bold text-neutral-900">
                {formatDateTimeJP(priorCheck.savedAt, lang)}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-neutral-500">{t.priorCheck.recordIdLabel}</dt>
              <dd className="font-bold text-neutral-900">{priorCheck.recordId}</dd>
            </div>
          </dl>
        ) : (
          <p className="text-sm text-neutral-500">{t.priorCheck.notCheckedText}</p>
        )}
      </section>

      <section className="relative mb-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm font-bold text-neutral-500">{t.buildingInfo.sectionTitle}</p>
          <button
            type="button"
            onClick={() => setShowSettingsModal(true)}
            className="tap-target rounded-full border border-neutral-300 bg-white px-3 text-xs font-bold text-neutral-600 active:bg-neutral-100"
          >
            {'⚙️'} {t.buildingInfo.settingsButton}
          </button>
        </div>
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
          <div className="flex items-center justify-between">
            <dt className="text-neutral-500">{t.seismic.sectionTitle}</dt>
            <dd className="text-right font-bold text-neutral-900">
              <span
                className={`mr-1 rounded-full px-2 py-0.5 text-xs font-bold ${
                  effectiveInfo.status === 'manual'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-neutral-200 text-neutral-600'
                }`}
              >
                {effectiveInfo.status === 'manual'
                  ? t.seismic.sourceManualBadge
                  : t.seismic.sourceAutoBadge}
              </span>
              {seismicDisplayLabel}
              {effectiveInfo.areaName && (
                <span className="block text-xs font-normal text-neutral-400">
                  {effectiveInfo.areaName}
                </span>
              )}
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-neutral-500">{t.buildingInfo.ageLabel}</dt>
            <dd className="font-bold text-neutral-900">
              {buildingInfo.ageYears !== null
                ? `${buildingInfo.ageYears}${t.buildingInfo.ageUnit}`
                : t.buildingInfo.notSet}
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-neutral-500">{t.buildingInfo.locationLabel}</dt>
            <dd className="max-w-[65%] text-right font-bold text-neutral-900">
              {buildingInfo.location || t.buildingInfo.notSet}
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-neutral-500">{t.buildingInfo.floorsLabel}</dt>
            <dd className="font-bold text-neutral-900">
              {buildingInfo.floors !== null
                ? `${buildingInfo.floors}${t.buildingInfo.floorsUnit}`
                : t.buildingInfo.notSet}
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-neutral-500">{t.buildingInfo.structureTypeLabel}</dt>
            <dd className="font-bold text-neutral-900">
              {buildingInfo.structureType
                ? t.buildingInfo.structureTypeOptions[buildingInfo.structureType]
                : t.buildingInfo.notSet}
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-neutral-500">{t.buildingInfo.floorAreaLabel}</dt>
            <dd className="font-bold text-neutral-900">
              {buildingInfo.floorAreaSqm !== null
                ? `${buildingInfo.floorAreaSqm.toLocaleString()}${t.buildingInfo.floorAreaUnit}`
                : t.buildingInfo.notSet}
            </dd>
          </div>
        </dl>

        <div className="mt-3 border-t border-dashed border-neutral-200 pt-3">
          {manualMode && (
            <div className="space-y-3">
              <div>
                <label
                  htmlFor="manual-scale"
                  className="mb-1 block text-sm font-bold text-neutral-500"
                >
                  {t.seismic.manualScaleLabel}
                </label>
                <select
                  id="manual-scale"
                  value={manualScale ?? ''}
                  onChange={(e) =>
                    setManualScale(
                      e.target.value === '' ? null : (Number(e.target.value) as SeismicScale),
                    )
                  }
                  className="tap-target w-full rounded-xl border border-neutral-300 bg-white px-3 text-base text-neutral-900 focus:border-neutral-900 focus:outline-none"
                >
                  <option value="">{t.seismic.manualNotSet}</option>
                  {MANUAL_SCALE_VALUES.map((v) => (
                    <option key={v} value={v}>
                      {t.seismic.scaleLabel(v)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="manual-area"
                  className="mb-1 block text-sm font-bold text-neutral-500"
                >
                  {t.seismic.manualAreaLabel}
                </label>
                <input
                  id="manual-area"
                  type="text"
                  value={manualArea}
                  onChange={(e) => setManualArea(e.target.value)}
                  placeholder={t.seismic.manualAreaPlaceholder}
                  className="tap-target w-full rounded-xl border border-neutral-300 bg-white px-3 text-base text-neutral-900 focus:border-neutral-900 focus:outline-none"
                />
              </div>
            </div>
          )}
          <div className="mt-3 flex items-center gap-4">
            <button
              type="button"
              onClick={() => setManualMode((v) => !v)}
              className="text-xs font-bold text-neutral-500 underline underline-offset-2"
            >
              {manualMode ? t.seismic.manualToggleOff : t.seismic.manualToggleOn}
            </button>
          </div>
        </div>
      </section>

      {showSettingsModal && (
        <BuildingInfoModal
          value={buildingInfo}
          onSave={onBuildingInfoChange}
          onClose={() => setShowSettingsModal(false)}
        />
      )}

      {/* 専門家テレビ電話の対応状況 */}
      <section className="mb-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
        <div className="mb-1 flex items-center justify-between">
          <p className="text-sm font-bold text-neutral-500">
            {t.expertCapacity.sectionTitle}
          </p>
          <span
            className={`text-lg font-extrabold tabular-nums ${congestionMeta.textClass}`}
          >
            {occupied}
            <span className="text-sm font-bold text-neutral-400">
              {t.expertCapacity.unitSeparator}
              {total}
            </span>
          </span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-neutral-200">
          <div
            className={`h-full rounded-full transition-all ${congestionMeta.barClass}`}
            style={{ width: `${Math.min(100, (occupied / total) * 100)}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-neutral-500">{t.expertCapacity.description}</p>
        <p className={`mt-1 text-sm font-bold ${congestionMeta.textClass}`}>
          {congestionMeta.statusText}
        </p>
      </section>

      <p className="mb-6 rounded-xl bg-neutral-100 p-3 text-sm leading-relaxed text-neutral-500">
        {t.home.disclaimer}
      </p>

      <div className="mt-auto pt-4">
        <BigButton onClick={onStart} className="text-xl">
          {t.home.startButton}
        </BigButton>
      </div>
    </div>
  );
}
