import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import BigButton from './BigButton';

interface SignatureInputProps {
  onComplete: (text: string) => void;
  onClose: () => void;
}

/**
 * 署名用の入力欄。以前は手書き（Canvas）だったが、
 * 手書きではなく氏名の文字入力による署名に変更した。
 * フォントはアプリの他の入力欄・表示と統一し、特別な書体は使わない。
 */
export default function SignatureInput({ onComplete, onClose }: SignatureInputProps) {
  const { t } = useLanguage();
  const [text, setText] = useState('');

  const trimmed = text.trim();

  function handleComplete() {
    if (!trimmed) return;
    onComplete(trimmed);
    onClose();
  }

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center">
      <div className="w-full rounded-2xl bg-white p-5 shadow-xl">
        <h2 className="mb-1 text-lg font-bold text-neutral-900">
          {t.expertCall.signatureModalTitle}
        </h2>
        <p className="mb-3 text-sm text-neutral-500">{t.expertCall.signaturePlaceholder}</p>

        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t.expertCall.signatureInputPlaceholder}
          autoFocus
          className="tap-target w-full rounded-xl border-2 border-dashed border-neutral-300 bg-neutral-50 px-4 text-base text-neutral-900 focus:border-neutral-900 focus:outline-none"
        />

        <div className="mt-4 space-y-3">
          <BigButton onClick={handleComplete} disabled={!trimmed}>
            {t.expertCall.completeSignButton}
          </BigButton>
          <BigButton variant="secondary" onClick={onClose}>
            {t.expertCall.cancelButton}
          </BigButton>
        </div>
      </div>
    </div>
  );
}
