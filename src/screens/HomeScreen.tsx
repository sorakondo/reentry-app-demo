import { useEffect, useRef, useState } from 'react';
import type {
  BuildingInfo,
  PriorCheckRecord,
  SeismicInfo,
  SeismicScale,
  SelfResponsibilityEntry,
} from '../types';
import { formatDateTimeJP } from '../logic/expertReport';
import { fetchNearbySeismicInfoMock, MANUAL_SCALE_VALUES } from '../logic/seismicInfo';
import { useLanguage } from '../i18n/LanguageContext';
import BigButton from '../components/BigButton';
import BuildingInfoModal from '../components/BuildingInfoModal';
import SelfResponsibilityModal from '../components/SelfResponsibilityModal';
import StartCheckModal from '../components/StartCheckModal';

interface HomeScreenProps {
  // この建物の確認が既に済んでいるかを示すデモ用の記録（操作パネルから切り替え可能）
  priorCheck: PriorCheckRecord | null;
  buildingInfo: BuildingInfo;
  onBuildingInfoChange: (info: BuildingInfo) => void;
  onStart: () => void;
  onSeismicInfoChange: (info: SeismicInfo) => void;
  // 診断前・診断中でも自己責任で建物に入場する人の記録
  selfEntries: SelfResponsibilityEntry[];
  onAddSelfEntry: (entry: SelfResponsibilityEntry) => void;
  onRemoveSelfEntry: (id: string) => void;
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
  selfEntries,
  onAddSelfEntry,
  onRemoveSelfEntry,
}: HomeScreenProps) {
  const { t, lang } = useLanguage();
  const [now, setNow] = useState(new Date());
  const [checkedAt] = useState(new Date());
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showSelfEntryModal, setShowSelfEntryModal] = useState(false);
  const [showStartModal, setShowStartModal] = useState(false);

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

  return (
    <div className="flex flex-1 flex-col px-5 pb-4 pt-1">
      <header className="mb-4 flex items-center justify-between gap-2">
        <h1 className="text-2xl font-bold leading-tight text-neutral-900">
          {t.home.appTitle}
        </h1>
        <button
          type="button"
          onClick={() => setShowSettingsModal(true)}
          className="tap-target shrink-0 rounded-full border border-neutral-300 bg-white px-3 text-xs font-bold text-neutral-600 active:bg-neutral-100"
        >
          {'⚙️'} {t.buildingInfo.settingsButton}
        </button>
      </header>

      {/* この建物の確認が既に済んでいるかを示すデモ用の記録カード */}
      <section
        className={`mb-3 rounded-2xl border p-3 ${
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

      {/* 診断前・診断中でも自己責任で建物に入場する人の記録 */}
      <section className="mb-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-3">
        <p className="mb-1 text-sm font-bold text-neutral-500">{t.selfEntry.sectionTitle}</p>
        <p className="mb-2 text-sm text-neutral-500">{t.selfEntry.description}</p>

        {selfEntries.length === 0 ? (
          <p className="mb-2 text-sm text-neutral-500">{t.selfEntry.emptyText}</p>
        ) : (
          <ul className="mb-2 space-y-2">
            {selfEntries.map((entry) => (
              <li
                key={entry.id}
                className="rounded-xl border border-neutral-200 bg-white p-3"
              >
                <div className="mb-2 flex items-start justify-between gap-2">
                  <p className="min-w-0 truncate text-base font-bold text-neutral-900">
                    {entry.name}
                  </p>
                  <button
                    type="button"
                    onClick={() => onRemoveSelfEntry(entry.id)}
                    className="shrink-0 text-xs font-bold text-neutral-400 underline underline-offset-2"
                  >
                    {t.selfEntry.removeButton}
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <p
                    className="w-20 shrink-0 truncate rounded-lg border border-neutral-200 bg-white px-2 py-1 text-center text-base font-bold text-neutral-900"
                    title={entry.signatureText}
                  >
                    {entry.signatureText}
                  </p>
                  <dl className="min-w-0 flex-1 space-y-0.5 text-sm">
                    <div className="flex items-center justify-between gap-2">
                      <dt className="shrink-0 text-neutral-500">{t.selfEntry.roomLabel}</dt>
                      <dd className="text-right font-bold text-neutral-900">{entry.room}</dd>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <dt className="shrink-0 text-neutral-500">
                        {t.selfEntry.entryTimeLabel}
                      </dt>
                      <dd className="text-right font-bold text-neutral-900">
                        {formatDateTimeJP(entry.enteredAt, lang)}
                      </dd>
                    </div>
                  </dl>
                </div>
              </li>
            ))}
          </ul>
        )}

        <button
          type="button"
          onClick={() => setShowSelfEntryModal(true)}
          className="tap-target w-full rounded-xl border-2 border-dashed border-neutral-300 bg-white text-base font-bold text-neutral-700 active:bg-neutral-100"
        >
          {t.selfEntry.addButton}
        </button>
      </section>

      {showSelfEntryModal && (
        <SelfResponsibilityModal
          onSave={(entry) => {
            onAddSelfEntry(entry);
            setShowSelfEntryModal(false);
          }}
          onClose={() => setShowSelfEntryModal(false)}
        />
      )}

      {showSettingsModal && (
        <BuildingInfoModal
          value={buildingInfo}
          onSave={onBuildingInfoChange}
          onClose={() => setShowSettingsModal(false)}
        />
      )}

      {/* 周辺の震度情報：建物・現場情報とは別に、最初の画面に表示してよい項目 */}
      <section className="mb-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-3">
        <p className="mb-2 text-sm font-bold text-neutral-500">{t.seismic.sectionTitle}</p>
        <div className="flex items-center justify-between text-base">
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-bold ${
              effectiveInfo.status === 'manual'
                ? 'bg-amber-100 text-amber-700'
                : 'bg-neutral-200 text-neutral-600'
            }`}
          >
            {effectiveInfo.status === 'manual'
              ? t.seismic.sourceManualBadge
              : t.seismic.sourceAutoBadge}
          </span>
          <span className="text-right font-bold text-neutral-900">
            {seismicDisplayLabel}
            {effectiveInfo.areaName && (
              <span className="block text-xs font-normal text-neutral-400">
                {effectiveInfo.areaName}
              </span>
            )}
          </span>
        </div>

        <div className="mt-2 border-t border-dashed border-neutral-200 pt-2">
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
          <div className="mt-2 flex items-center gap-4">
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

      <p className="mb-3 rounded-xl bg-neutral-100 p-3 text-sm leading-relaxed text-neutral-500">
        {t.home.disclaimer}
      </p>

      <div className="mt-auto pt-3">
        <BigButton onClick={() => setShowStartModal(true)} className="text-xl">
          {t.home.startButton}
        </BigButton>
      </div>

      {showStartModal && (
        <StartCheckModal
          buildingInfo={buildingInfo}
          checkedAt={checkedAt}
          onBuildingInfoChange={onBuildingInfoChange}
          onConfirmStart={() => {
            setShowStartModal(false);
            onStart();
          }}
          onClose={() => setShowStartModal(false)}
        />
      )}
    </div>
  );
}
