import { useState } from 'react';
import type { BuildingInfo } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { formatDateTimeJP } from '../logic/expertReport';
import BigButton from './BigButton';
import BuildingInfoModal from './BuildingInfoModal';

interface StartCheckModalProps {
  buildingInfo: BuildingInfo;
  checkedAt: Date;
  onBuildingInfoChange: (info: BuildingInfo) => void;
  onConfirmStart: () => void;
  onClose: () => void;
}

type Step = 'confirm' | 'edit';

/**
 * 確認作業（チェックリスト）を開始する前に、建物情報に変更がないかを
 * 確認してもらうためのポップアップ。「開始」ボタンを押すとまずこの画面が表示され、
 * 内容に変更がなければそのまま開始、変更があれば「情報を変更する」から
 * 既存の建物情報編集画面（BuildingInfoModal）を開いて修正できる。
 */
export default function StartCheckModal({
  buildingInfo,
  checkedAt,
  onBuildingInfoChange,
  onConfirmStart,
  onClose,
}: StartCheckModalProps) {
  const { t, lang } = useLanguage();
  const [step, setStep] = useState<Step>('confirm');

  if (step === 'edit') {
    return (
      <BuildingInfoModal
        value={buildingInfo}
        onSave={(info) => {
          onBuildingInfoChange(info);
          setStep('confirm');
        }}
        onClose={() => setStep('confirm')}
      />
    );
  }

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center">
      <div className="max-h-full w-full overflow-y-auto rounded-2xl bg-white p-5 shadow-xl">
        <h2 className="mb-1 text-lg font-bold text-neutral-900">{t.startConfirm.title}</h2>
        <p className="mb-4 text-sm text-neutral-500">{t.startConfirm.description}</p>

        <dl className="mb-4 space-y-2 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-base">
          <div className="flex items-center justify-between">
            <dt className="text-neutral-500">{t.home.buildingNameLabel}</dt>
            <dd className="font-bold text-neutral-900">{t.common.buildingName}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-neutral-500">{t.home.checkedAtLabel}</dt>
            <dd className="font-bold text-neutral-900">{formatDateTimeJP(checkedAt, lang)}</dd>
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
          <div className="flex items-center justify-between gap-3">
            <dt className="shrink-0 text-neutral-500">{t.buildingInfo.structureTypeLabel}</dt>
            <dd className="text-right font-bold text-neutral-900">
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

        <div className="space-y-3">
          <BigButton onClick={onConfirmStart}>{t.startConfirm.confirmButton}</BigButton>
          <BigButton variant="secondary" onClick={() => setStep('edit')}>
            {t.startConfirm.editButton}
          </BigButton>
          <BigButton variant="outline" onClick={onClose}>
            {t.startConfirm.cancelButton}
          </BigButton>
        </div>
      </div>
    </div>
  );
}
