import { useEffect, useRef, useState } from 'react';
import type { SignatureState } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { formatDateTimeJP } from '../logic/expertReport';
import BigButton from '../components/BigButton';
import SignaturePad from '../components/SignaturePad';

interface ExpertCallScreenProps {
  caseNumber: string;
  recordId: string;
  onEndCall: () => void;
}

const INITIAL_SIGNATURE: SignatureState = {
  signed: false,
  signedAt: null,
  dataUrl: null,
};

interface SentPhoto {
  id: number;
  name: string;
  dataUrl: string;
  status: 'sending' | 'sent';
}

function formatCallDuration(totalSeconds: number): string {
  const mm = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, '0');
  const ss = (totalSeconds % 60).toString().padStart(2, '0');
  return `${mm}:${ss}`;
}

/**
 * 専門家とのビデオ通話（デモ用モック画面）。
 * 実際のカメラ・マイクや通信は一切使用しない、見た目だけのモックアップ。
 * 写真の送信も、選択した画像をブラウザ内でプレビュー表示するだけのデモ実装で、
 * 実際にどこかへ送信されることはない。
 */
export default function ExpertCallScreen({
  caseNumber,
  recordId,
  onEndCall,
}: ExpertCallScreenProps) {
  const { t, lang } = useLanguage();
  const [seconds, setSeconds] = useState(0);
  const [photos, setPhotos] = useState<SentPhoto[]>([]);
  const [signature, setSignature] = useState<SignatureState>(INITIAL_SIGNATURE);
  const [showSignaturePad, setShowSignaturePad] = useState(false);
  const nextIdRef = useRef(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  function handleSelectPhotoClick() {
    fileInputRef.current?.click();
  }

  function handleFilesSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const id = nextIdRef.current++;
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = typeof reader.result === 'string' ? reader.result : '';
        setPhotos((prev) => [...prev, { id, name: file.name, dataUrl, status: 'sending' }]);
        // デモ: 実際の送信は行わず、「送信中」から「送信済み」への演出のみ
        setTimeout(() => {
          setPhotos((prev) =>
            prev.map((p) => (p.id === id ? { ...p, status: 'sent' } : p)),
          );
        }, 800);
      };
      reader.readAsDataURL(file);
    });

    // 同じファイルを続けて選択できるように入力値をリセット
    e.target.value = '';
  }

  function handleRemovePhoto(id: number) {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div className="flex flex-1 flex-col px-5 pb-6 pt-2">
      <div className="mb-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-neutral-900">{t.expertCall.title}</h1>
        <span className="flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-600">
          <span className="h-2 w-2 rounded-full bg-red-500" aria-hidden="true" />
          {t.expertCall.liveBadge} {formatCallDuration(seconds)}
        </span>
      </div>

      {/* 通話モックアップ画面 */}
      <div className="relative mb-4 flex aspect-[3/4] w-full flex-col items-center justify-center rounded-2xl bg-neutral-800 text-white">
        <span className="text-6xl leading-none" aria-hidden="true">
          {'\u{1F9D1}‍\u{1F527}'}
        </span>
        <p className="mt-3 text-lg font-bold">{t.expertCall.expertLabel}</p>
        <p className="text-sm text-neutral-300">{t.expertCall.expertRole}</p>

        {/* 自分の映像（ピクチャーインピクチャー風） */}
        <div className="absolute bottom-3 right-3 flex h-20 w-14 flex-col items-center justify-center rounded-lg bg-neutral-700 text-white">
          <span className="text-xl leading-none" aria-hidden="true">
            {'\u{1F477}'}
          </span>
          <p className="mt-1 px-1 text-center text-[10px] leading-tight text-neutral-300">
            {t.expertCall.selfLabel}
          </p>
        </div>
      </div>

      <p className="mb-4 rounded-xl bg-neutral-100 p-3 text-sm leading-relaxed text-neutral-600">
        {t.expertCall.waitingNote}
      </p>

      <section className="mb-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
        <dl className="space-y-2 text-base">
          <div className="flex items-center justify-between">
            <dt className="text-neutral-500">{t.expertCall.buildingLabel}</dt>
            <dd className="font-bold text-neutral-900">{t.common.buildingName}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-neutral-500">{t.expertCall.callIdLabel}</dt>
            <dd className="font-bold text-neutral-900">{caseNumber}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-neutral-500">{t.expertCall.recordIdLabel}</dt>
            <dd className="font-bold text-neutral-900">{recordId}</dd>
          </div>
        </dl>
      </section>

      {/* 写真を専門家へ送る */}
      <section className="mb-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
        <p className="mb-1 text-sm font-bold text-neutral-500">
          {t.expertCall.photoSectionTitle}
        </p>
        <p className="mb-3 text-sm text-neutral-600">{t.expertCall.photoSectionDesc}</p>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          capture="environment"
          onChange={handleFilesSelected}
          className="hidden"
        />
        <button
          type="button"
          onClick={handleSelectPhotoClick}
          className="tap-target w-full rounded-xl border-2 border-dashed border-neutral-300 bg-white text-base font-bold text-neutral-700 active:bg-neutral-100"
        >
          {'\u{1F4F7}'} {t.expertCall.selectPhotoButton}
        </button>

        {photos.length > 0 && (
          <div className="mt-3 grid grid-cols-3 gap-2">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="relative aspect-square overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100"
              >
                <img
                  src={photo.dataUrl}
                  alt={photo.name}
                  className="h-full w-full object-cover"
                />
                <div
                  className={`absolute inset-x-0 bottom-0 px-1 py-0.5 text-center text-[10px] font-bold text-white ${
                    photo.status === 'sending' ? 'bg-neutral-900/60' : 'bg-green-700/80'
                  }`}
                >
                  {photo.status === 'sending' ? t.expertCall.photoSending : t.expertCall.photoSent}
                </div>
                <button
                  type="button"
                  onClick={() => handleRemovePhoto(photo.id)}
                  aria-label={t.expertCall.photoRemoveLabel}
                  className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-neutral-900/70 text-xs font-bold text-white"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <p className="mt-3 text-xs text-neutral-400">{t.expertCall.photoDemoNote}</p>
      </section>

      {/* 確認完了の署名 */}
      <section className="mb-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
        <div className="mb-1 flex items-center justify-between">
          <p className="text-sm font-bold text-neutral-500">
            {t.expertCall.signatureSectionTitle}
          </p>
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-bold ${
              signature.signed
                ? 'bg-green-100 text-green-700'
                : 'bg-neutral-200 text-neutral-600'
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
          onComplete={(dataUrl) =>
            setSignature({ signed: true, signedAt: new Date(), dataUrl })
          }
          onClose={() => setShowSignaturePad(false)}
        />
      )}

      <p className="mb-6 rounded-xl bg-neutral-100 p-3 text-sm leading-relaxed text-neutral-500">
        {t.expertCall.demoNote}
      </p>

      <div className="mt-auto">
        <BigButton variant="danger" onClick={onEndCall}>
          {t.expertCall.endCallButton}
        </BigButton>
      </div>
    </div>
  );
}
