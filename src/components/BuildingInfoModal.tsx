import { useState } from 'react';
import type { BuildingInfo, StructureType } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import BigButton from './BigButton';

interface BuildingInfoModalProps {
  value: BuildingInfo;
  onSave: (info: BuildingInfo) => void;
  onClose: () => void;
}

const STRUCTURE_TYPES: StructureType[] = ['RC', 'S', 'wood', 'other'];

/**
 * 建物の基本情報（築年数・所在地・階数・構造種別・延床面積）を
 * あらかじめ設定しておくためのポップアップ。
 * デモのため実際の建物データベース等とは接続せず、入力内容はこのアプリ内の
 * 状態としてのみ保持される。
 */
export default function BuildingInfoModal({ value, onSave, onClose }: BuildingInfoModalProps) {
  const { t } = useLanguage();
  const [draft, setDraft] = useState<BuildingInfo>(value);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave(draft);
    onClose();
  }

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center">
      <div className="max-h-full w-full overflow-y-auto rounded-2xl bg-white p-5 shadow-xl">
        <h2 className="mb-1 text-lg font-bold text-neutral-900">
          {t.buildingInfo.modalTitle}
        </h2>
        <p className="mb-4 text-sm text-neutral-500">{t.buildingInfo.modalDesc}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="building-age"
              className="mb-1 block text-sm font-bold text-neutral-500"
            >
              {t.buildingInfo.ageLabel}
            </label>
            <div className="flex items-center gap-2">
              <input
                id="building-age"
                type="number"
                min={0}
                inputMode="numeric"
                value={draft.ageYears ?? ''}
                onChange={(e) =>
                  setDraft((d) => ({
                    ...d,
                    ageYears: e.target.value === '' ? null : Number(e.target.value),
                  }))
                }
                className="tap-target w-full rounded-xl border border-neutral-300 px-3 text-base text-neutral-900 focus:border-neutral-900 focus:outline-none"
              />
              <span className="shrink-0 text-sm text-neutral-500">
                {t.buildingInfo.ageUnit}
              </span>
            </div>
          </div>

          <div>
            <label
              htmlFor="building-location"
              className="mb-1 block text-sm font-bold text-neutral-500"
            >
              {t.buildingInfo.locationLabel}
            </label>
            <input
              id="building-location"
              type="text"
              value={draft.location}
              onChange={(e) => setDraft((d) => ({ ...d, location: e.target.value }))}
              placeholder={t.buildingInfo.locationPlaceholder}
              className="tap-target w-full rounded-xl border border-neutral-300 px-3 text-base text-neutral-900 focus:border-neutral-900 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="building-floors"
              className="mb-1 block text-sm font-bold text-neutral-500"
            >
              {t.buildingInfo.floorsLabel}
            </label>
            <div className="flex items-center gap-2">
              <input
                id="building-floors"
                type="number"
                min={0}
                inputMode="numeric"
                value={draft.floors ?? ''}
                onChange={(e) =>
                  setDraft((d) => ({
                    ...d,
                    floors: e.target.value === '' ? null : Number(e.target.value),
                  }))
                }
                className="tap-target w-full rounded-xl border border-neutral-300 px-3 text-base text-neutral-900 focus:border-neutral-900 focus:outline-none"
              />
              <span className="shrink-0 text-sm text-neutral-500">
                {t.buildingInfo.floorsUnit}
              </span>
            </div>
          </div>

          <div>
            <label
              htmlFor="building-structure"
              className="mb-1 block text-sm font-bold text-neutral-500"
            >
              {t.buildingInfo.structureTypeLabel}
            </label>
            <select
              id="building-structure"
              value={draft.structureType ?? ''}
              onChange={(e) =>
                setDraft((d) => ({
                  ...d,
                  structureType: (e.target.value || null) as StructureType | null,
                }))
              }
              className="tap-target w-full rounded-xl border border-neutral-300 bg-white px-3 text-base text-neutral-900 focus:border-neutral-900 focus:outline-none"
            >
              <option value="">{t.buildingInfo.notSet}</option>
              {STRUCTURE_TYPES.map((st) => (
                <option key={st} value={st}>
                  {t.buildingInfo.structureTypeOptions[st]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="building-area"
              className="mb-1 block text-sm font-bold text-neutral-500"
            >
              {t.buildingInfo.floorAreaLabel}
            </label>
            <div className="flex items-center gap-2">
              <input
                id="building-area"
                type="number"
                min={0}
                inputMode="numeric"
                value={draft.floorAreaSqm ?? ''}
                onChange={(e) =>
                  setDraft((d) => ({
                    ...d,
                    floorAreaSqm: e.target.value === '' ? null : Number(e.target.value),
                  }))
                }
                className="tap-target w-full rounded-xl border border-neutral-300 px-3 text-base text-neutral-900 focus:border-neutral-900 focus:outline-none"
              />
              <span className="shrink-0 text-sm text-neutral-500">
                {t.buildingInfo.floorAreaUnit}
              </span>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <BigButton type="submit">{t.buildingInfo.saveButton}</BigButton>
            <BigButton type="button" variant="secondary" onClick={onClose}>
              {t.buildingInfo.cancelButton}
            </BigButton>
          </div>
        </form>
      </div>
    </div>
  );
}
