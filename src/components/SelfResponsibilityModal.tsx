import { useState } from 'react';
import type { SelfResponsibilityEntry } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { generateEntryId } from '../logic/expertReport';
import BigButton from './BigButton';
import SignaturePad from './SignaturePad';

interface SelfResponsibilityModalProps {
  onSave: (entry: SelfResponsibilityEntry) => void;
  onClose: () => void;
}

type Step = 'form' | 'signature';

/**
 * 診断前・診断中でも自己責任で建物に入場する人の記録を追加するためのポップアップ。
 * 1. 氏名・行き先の部屋を入力
 * 2. 手書き署名（SignaturePadを再利用）
 * 署名が完了した瞬間の時刻を「入室時刻」として自動的に記録する。
 */
export default function SelfResponsibilityModal({
  onSave,
  onClose,
}: SelfResponsibilityModalProps) {
  const { t } = useLanguage();
  const [step, setStep] = useState<Step>('form');
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  const canProceed = name.trim().length > 0 && room.trim().length > 0;

  function handleNext(e: React.FormEvent) {
    e.preventDefault();
    if (!canProceed) return;
    setStep('signature');
  }

  function handleSignatureComplete(dataUrl: string) {
    onSave({
      id: generateEntryId(),
      name: name.trim(),
      room: room.trim(),
      enteredAt: new Date(),
      signatureDataUrl: dataUrl,
    });
  }

  if (step === 'signature') {
    return <SignaturePad onComplete={handleSignatureComplete} onClose={onClose} />;
  }

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center">
      <div className="max-h-full w-full overflow-y-auto rounded-2xl bg-white p-5 shadow-xl">
        <h2 className="mb-1 text-lg font-bold text-neutral-900">{t.selfEntry.modalTitle}</h2>
        <p className="mb-4 text-sm text-neutral-500">{t.selfEntry.modalDesc}</p>

        <form onSubmit={handleNext} className="space-y-4">
          <div>
            <label
              htmlFor="self-entry-name"
              className="mb-1 block text-sm font-bold text-neutral-500"
            >
              {t.selfEntry.nameLabel}
            </label>
            <input
              id="self-entry-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.selfEntry.namePlaceholder}
              className="tap-target w-full rounded-xl border border-neutral-300 px-3 text-base text-neutral-900 focus:border-neutral-900 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="self-entry-room"
              className="mb-1 block text-sm font-bold text-neutral-500"
            >
              {t.selfEntry.roomLabel}
            </label>
            <input
              id="self-entry-room"
              type="text"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              placeholder={t.selfEntry.roomPlaceholder}
              className="tap-target w-full rounded-xl border border-neutral-300 px-3 text-base text-neutral-900 focus:border-neutral-900 focus:outline-none"
            />
          </div>

          <p className="rounded-xl bg-amber-50 p-3 text-sm leading-relaxed text-amber-800">
            {t.selfEntry.riskNotice}
          </p>

          <div className="space-y-3 pt-2">
            <BigButton type="submit" disabled={!canProceed}>
              {t.selfEntry.nextButton}
            </BigButton>
            <BigButton type="button" variant="secondary" onClick={onClose}>
              {t.selfEntry.cancelButton}
            </BigButton>
          </div>
        </form>
      </div>
    </div>
  );
}
