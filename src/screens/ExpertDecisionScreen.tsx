import { useState } from 'react';
import type { SignatureState } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { formatDateTimeJP } from '../logic/expertReport';
import BigButton from '../components/BigButton';
import SignaturePad from '../components/SignaturePad';

interface ExpertDecisionScreenProps {
  onDecide: (result: 'allowed' | 'denied') => void;
}

const INITIAL_SIGNATURE: SignatureState = {
  signed: false,
  signedAt: null,
  dataUrl: null,
};

/**
 * 専門家とのビデオ通話が終わった直後にのみ表示される画面。
 * 通話内容をもとに入場の可否を最終決定するための画面で、
 * 決定ボタンは署名が完了するまで押せないようにする。
 * このコンポーネントは App.tsx 側で expertCall からの遷移でのみ
 * 呼び出されるため、他の画面経路からは到達できない。
 */
export default function ExpertDecisionScreen({ onDecide }: ExpertDecisionScreenProps) {
  const { t, lang } = useLanguage();
  const [signature, setSignature] = useState<SignatureState>(INITIAL_SIGNATURE);
  const [showSignaturePad, setShowSignaturePad] = useState(false);

  return (
    <div className="flex flex-1 flex-col px-5 pb-6 pt-2">
      <header className="mb-5">
        <h1 className="text-2xl font-bold leading-tight text-neutral-900">
          {t.expertDecision.title}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-neutral-600">
          {t.expertDecision.description}
        </p>
      </header>

      {/* 確認完了の署名（ResultScreenと同じ署名パターンを再利用） */}
      <section className="mb-5 rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
        <div className="mb-1 flex items-center justify-between">
          <p className="text-sm font-bold text-neutral-500">{t.expertCall.signatureSectionTitle}</p>
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-bold ${
              signature.signed ? 'bg-green-100 text-green-700' : 'bg-neutral-200 text-neutral-600'
            }`}
          >
            {signature.signed ? t.expertCall.signedStatus : t.expertCall.unsignedStatus}
          </span>
        </div>
        <p className="mb-3 text-sm text-neutral-600">{t.expertCall.signatureSectionDesc}</p>

        {signature.signed && signature.dataUrl && (
          <div className="mb-3 flex items-center gap-3">
            <img
              src={signature.dataUrl}
              alt={t.expertCall.signedStatus}
              className="h-16 w-28 rounded-lg border border-neutral-200 bg-white object-contain"
            />
            {signature.signedAt && (
              <p className="text-xs text-neutral-400">
                {t.expertCall.signedAtLabel}：{formatDateTimeJP(signature.signedAt, lang)}
              </p>
            )}
          </div>
        )}

        <button
          type="button"
          onClick={() => setShowSignaturePad(true)}
          className="tap-target w-full rounded-xl border-2 border-dashed border-neutral-300 bg-white text-base font-bold text-neutral-700 active:bg-neutral-100"
        >
          {'✍️'} {t.expertCall.signButton}
        </button>
      </section>

      {showSignaturePad && (
        <SignaturePad
          onComplete={(dataUrl) => setSignature({ signed: true, signedAt: new Date(), dataUrl })}
          onClose={() => setShowSignaturePad(false)}
        />
      )}

      <div className="mt-auto space-y-3 pt-4">
        {!signature.signed && (
          <p className="text-center text-xs font-bold text-neutral-500">
            {t.expertDecision.signRequiredNote}
          </p>
        )}
        <BigButton
          variant="primary"
          onClick={() => onDecide('allowed')}
          disabled={!signature.signed}
        >
          {t.expertCall.setEntranceAllowedButton}
        </BigButton>
        <BigButton
          variant="danger"
          onClick={() => onDecide('denied')}
          disabled={!signature.signed}
        >
          {t.expertCall.setEntranceDeniedButton}
        </BigButton>
      </div>
    </div>
  );
}
