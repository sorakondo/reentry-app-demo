import type { JudgementDetail, SavedResult } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { formatDateTimeJP } from '../logic/expertReport';
import BigButton from '../components/BigButton';

interface ResultScreenProps {
  judgement: JudgementDetail;
  savedResult: SavedResult | null;
  onSaveResult: () => void;
  onConsultExpert: () => void;
  onRestart: () => void;
}

export default function ResultScreen({ judgement, savedResult, onSaveResult, onConsultExpert, onRestart }: ResultScreenProps) {
  const { t, lang } = useLanguage();
  const resultMeta = {
    routine: { emoji: '🟢', title: t.result.titleRoutine, barClass: 'bg-green-50 border-green-300', textClass: 'text-green-700', description: t.result.descRoutine },
    targeted: { emoji: '🔵', title: t.result.titleTargeted, barClass: 'bg-blue-50 border-blue-300', textClass: 'text-blue-700', description: t.result.descTargeted },
    expert_review: { emoji: '🟡', title: t.result.titleExpert, barClass: 'bg-amber-50 border-amber-300', textClass: 'text-amber-700', description: t.result.descExpert },
    hold: { emoji: '🔴', title: t.result.titleHold, barClass: 'bg-red-50 border-red-300', textClass: 'text-red-700', description: t.result.descHold },
  } as const;
  const meta = resultMeta[judgement.result];
  const hasExpertAction = judgement.result === 'expert_review' || judgement.result === 'hold';

  return (
    <div className="flex flex-1 flex-col px-5 pb-6 pt-2">
      <section className={`mb-5 rounded-2xl border-2 p-5 text-center ${meta.barClass}`}>
        <div className="mb-2 text-5xl leading-none">{meta.emoji}</div>
        <h1 className={`text-3xl font-extrabold ${meta.textClass}`}>{meta.title}</h1>
        <p className="mt-2 text-base text-neutral-600">{meta.description}</p>
      </section>

      {judgement.result === 'hold' && (
        <section className="mb-5">
          <h2 className="mb-2 text-sm font-bold text-neutral-500">{t.result.dangerSectionTitle}</h2>
          <ul className="space-y-2">
            {judgement.gasAlarmTriggered && <li className="rounded-xl border-2 border-red-400 bg-red-50 p-3 text-base font-bold text-red-700">{t.result.gasAlarmReasonText}</li>}
            {judgement.dangerReasonKeys.filter((key) => key !== 'gasAlarm').map((key) => (
              <li key={key} className="rounded-xl border border-red-200 bg-red-50/60 p-3 text-base text-red-700">{t.questions[key as keyof typeof t.questions].dangerDescription}</li>
            ))}
          </ul>
        </section>
      )}

      {(judgement.result === 'targeted' || judgement.result === 'expert_review') && judgement.targetedItems.length > 0 && (
        <section className="mb-5">
          <h2 className="mb-2 text-sm font-bold text-neutral-500">{t.result.targetedSectionTitle}</h2>
          <ul className="space-y-2">
            {judgement.targetedItems.map((item) => (
              <li key={item.questionId} className="rounded-xl border border-blue-200 bg-blue-50/60 p-3 text-base text-blue-800">{t.questions[item.questionId].shortLabel}{t.result.targetedItemSuffix}</li>
            ))}
          </ul>
        </section>
      )}

      {judgement.result === 'expert_review' && judgement.unknownItems.length > 0 && (
        <section className="mb-5">
          <h2 className="mb-2 text-sm font-bold text-neutral-500">{t.result.unknownSectionTitle}</h2>
          <ul className="space-y-2">
            {judgement.unknownItems.map((item) => (
              <li key={item.questionId} className="rounded-xl border border-amber-200 bg-amber-50/60 p-3 text-base text-amber-800">{t.questions[item.questionId].shortLabel}{t.result.unknownItemSuffix}</li>
            ))}
          </ul>
        </section>
      )}

      <p className="mb-6 rounded-xl bg-neutral-100 p-3 text-sm leading-relaxed text-neutral-500">
        {judgement.result === 'routine' ? t.result.disclaimerSafe : t.result.disclaimerGeneral}
      </p>

      <section className="mb-5 rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
        <BigButton variant={savedResult ? 'secondary' : 'outline'} onClick={onSaveResult} disabled={!!savedResult}>
          {savedResult ? `✓ ${t.result.savedBadge}` : t.result.saveResultButton}
        </BigButton>
        {savedResult && (
          <div className="mt-3 space-y-2 text-sm">
            <div className="flex items-center justify-between"><span className="text-neutral-500">{t.result.recordIdLabel}</span><span className="font-bold text-neutral-900">{savedResult.id}</span></div>
            <div className="flex items-center justify-between"><span className="text-neutral-500">{t.result.savedAtLabel}</span><span className="font-bold text-neutral-900">{formatDateTimeJP(savedResult.savedAt, lang)}</span></div>
            <div><p className="text-neutral-500">{t.result.autoNoteLabel}</p><p className="mt-1 rounded-lg bg-white p-2 leading-relaxed text-neutral-800">{savedResult.autoNote}</p></div>
          </div>
        )}
      </section>

      {!hasExpertAction && (
        <section className="mb-2 rounded-2xl border border-indigo-200 bg-indigo-50/40 p-4">
          <p className="mb-3 text-sm leading-relaxed text-neutral-700">{t.result.askExpertPrompt}</p>
          <BigButton variant="outline" onClick={onConsultExpert}>{t.result.askExpertButton}</BigButton>
        </section>
      )}

      <div className="mt-auto space-y-3 pt-4">
        {hasExpertAction && <BigButton onClick={onConsultExpert} className="text-lg">{t.result.consultExpertButton}</BigButton>}
        <BigButton variant="secondary" onClick={onRestart}>{t.result.restartButton}</BigButton>
      </div>
    </div>
  );
}
