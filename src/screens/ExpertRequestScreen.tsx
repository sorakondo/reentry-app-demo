import { useMemo, useState } from 'react';
import type { BuildingInfo, GasAlarmState, JudgementDetail, SeismicInfo } from '../types';
import {
  buildOverallSummaryText,
  buildQuestionSummaryText,
  buildSeismicSummarySentence,
  formatDateTimeJP,
} from '../logic/expertReport';
import { useLanguage } from '../i18n/LanguageContext';
import { getCongestionLevel, useExpertCapacity } from '../logic/useExpertCapacity';
import BigButton from '../components/BigButton';

interface ExpertRequestScreenProps {
  checkedAt: Date;
  gasAlarm: GasAlarmState;
  seismicInfo: SeismicInfo;
  buildingInfo: BuildingInfo;
  judgement: JudgementDetail;
  onStartCall: (extraComment: string) => void;
  onBack: () => void;
}

export default function ExpertRequestScreen({
  checkedAt,
  gasAlarm,
  seismicInfo,
  buildingInfo,
  judgement,
  onStartCall,
  onBack,
}: ExpertRequestScreenProps) {
  const { t, lang } = useLanguage();
  const [connecting, setConnecting] = useState(false);
  const [extraComment, setExtraComment] = useState('');

  const overallText = useMemo(
    () => buildOverallSummaryText(judgement.unknownItems.length, lang),
    [judgement.unknownItems.length, lang],
  );

  const seismicSentence = useMemo(
    () => buildSeismicSummarySentence(seismicInfo, lang),
    [seismicInfo, lang],
  );

  const seismicDisplayLabel =
    seismicInfo.status === 'auto_no_data'
      ? t.seismic.statusNoData
      : seismicInfo.status === 'auto_failed' || seismicInfo.scale === null
        ? t.seismic.manualNotSet
        : t.seismic.scaleLabel(seismicInfo.scale);

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

  function handleStartCall() {
    setConnecting(true);
    // デモ: 実際の通信は行わず、接続中の演出のみ
    setTimeout(() => {
      onStartCall(extraComment);
    }, 1100);
  }

  return (
    <div className="flex flex-1 flex-col px-5 pb-6 pt-2">
      <h1 className="mb-1 text-2xl font-bold text-neutral-900">
        {t.expertRequest.title}
      </h1>
      <p className="mb-5 text-sm text-neutral-500">{t.expertRequest.subtitle}</p>

      <section className="mb-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
        <dl className="space-y-2 text-base">
          <div className="flex items-center justify-between">
            <dt className="text-neutral-500">{t.expertRequest.buildingNameLabel}</dt>
            <dd className="font-bold text-neutral-900">{t.common.buildingName}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-neutral-500">{t.expertRequest.checkedAtLabel}</dt>
            <dd className="font-bold text-neutral-900">
              {formatDateTimeJP(checkedAt, lang)}
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-neutral-500">{t.expertRequest.gasAlarmLabel}</dt>
            <dd className="font-bold text-neutral-900">
              {gasAlarm.status === 'normal' ? t.home.gasAlarmNormal : t.home.gasAlarmAlarm}
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-neutral-500">{t.expertRequest.seismicLabel}</dt>
            <dd className="text-right font-bold text-neutral-900">
              {seismicDisplayLabel}
              {seismicInfo.areaName && (
                <span className="block text-xs font-normal text-neutral-400">
                  {seismicInfo.areaName}
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
      </section>

      <section className="mb-4 rounded-2xl border border-neutral-200 p-4">
        <h2 className="mb-2 text-sm font-bold text-neutral-500">
          {t.expertRequest.fieldResultSectionTitle}
        </h2>
        {judgement.unknownItems.length === 0 ? (
          <p className="text-base text-neutral-500">
            {t.expertRequest.noUnknownItemsText}
          </p>
        ) : (
          <ul className="space-y-1 text-base text-neutral-800">
            {judgement.unknownItems.map((item) => (
              <li key={item.questionId}>
                ・{t.questions[item.questionId].shortLabel}
                {t.expertRequest.unknownSuffix}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mb-4 rounded-2xl border border-indigo-200 bg-indigo-50/40 p-4">
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-bold text-indigo-700">
            {t.expertRequest.autoSummaryBadge}
          </span>
        </div>
        <h2 className="mb-2 text-sm font-bold text-neutral-500">
          {t.expertRequest.autoSummarySectionTitle}
        </h2>
        <p className="mb-1 text-base leading-relaxed text-neutral-800">{seismicSentence}</p>
        <p className="mb-3 text-base leading-relaxed text-neutral-800">{overallText}</p>
        {judgement.unknownItems.length > 0 && (
          <div className="space-y-3">
            {judgement.unknownItems.map((item) => (
              <div key={item.questionId}>
                <p className="mb-1 text-sm font-bold text-neutral-600">
                  ■ {t.questions[item.questionId].shortLabel}
                </p>
                <p className="text-base leading-relaxed text-neutral-800">
                  {buildQuestionSummaryText(item.questionId, item.comment, lang)}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mb-6">
        <label
          htmlFor="extra-comment"
          className="mb-1 block text-sm font-bold text-neutral-500"
        >
          {t.expertRequest.extraCommentLabel}
        </label>
        <textarea
          id="extra-comment"
          value={extraComment}
          onChange={(e) => setExtraComment(e.target.value)}
          rows={3}
          placeholder={t.expertRequest.extraCommentPlaceholder}
          className="w-full rounded-xl border border-neutral-300 p-3 text-base text-neutral-900 focus:border-neutral-900 focus:outline-none"
        />
      </section>

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

      <div className="mt-auto space-y-3">
        <BigButton onClick={handleStartCall} disabled={connecting} className="text-lg">
          {connecting ? t.expertRequest.connectingButton : t.expertRequest.callButton}
        </BigButton>
        <BigButton variant="secondary" onClick={onBack} disabled={connecting}>
          {t.expertRequest.backButton}
        </BigButton>
      </div>
    </div>
  );
}
