import type { JudgementDetail } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import BigButton from '../components/BigButton';

interface ResultScreenProps {
  judgement: JudgementDetail;
  onConsultExpert: () => void;
  onRestart: () => void;
}

export default function ResultScreen({
  judgement,
  onConsultExpert,
  onRestart,
}: ResultScreenProps) {
  const { t } = useLanguage();

  const RESULT_META = {
    safe: {
      emoji: '\u{1F7E2}',
      title: t.result.titleSafe,
      barClass: 'bg-green-50 border-green-300',
      textClass: 'text-green-700',
    },
    unsafe: {
      emoji: '\u{1F534}',
      title: t.result.titleUnsafe,
      barClass: 'bg-red-50 border-red-300',
      textClass: 'text-red-700',
    },
    expert_needed: {
      emoji: '\u{1F7E1}',
      title: t.result.titleExpert,
      barClass: 'bg-amber-50 border-amber-300',
      textClass: 'text-amber-700',
    },
  } as const;

  const meta = RESULT_META[judgement.result];

  return (
    <div className="flex flex-1 flex-col px-5 pb-6 pt-2">
      <section
        className={`mb-5 rounded-2xl border-2 p-5 text-center ${meta.barClass}`}
      >
        <div className="mb-2 text-5xl leading-none">{meta.emoji}</div>
        <h1 className={`text-2xl font-extrabold ${meta.textClass}`}>
          {meta.title}
        </h1>

        {judgement.result === 'safe' && (
          <p className="mt-2 text-base text-neutral-600">{t.result.descSafe}</p>
        )}
        {judgement.result === 'expert_needed' && (
          <p className="mt-2 text-base text-neutral-600">{t.result.descExpert}</p>
        )}
      </section>

      {judgement.result === 'unsafe' && (
        <section className="mb-5">
          <h2 className="mb-2 text-sm font-bold text-neutral-500">
            {t.result.dangerSectionTitle}
          </h2>
          <ul className="space-y-2">
            {judgement.gasAlarmTriggered && (
              <li className="rounded-xl border-2 border-red-400 bg-red-50 p-3 text-base font-bold text-red-700">
                {t.result.gasAlarmReasonText}
              </li>
            )}
            {judgement.dangerReasonKeys
              .filter((key) => key !== 'gasAlarm')
              .map((key) => (
                <li
                  key={key}
                  className="rounded-xl border border-red-200 bg-red-50/60 p-3 text-base text-red-700"
                >
                  {t.questions[key as keyof typeof t.questions].dangerDescription}
                </li>
              ))}
          </ul>
        </section>
      )}

      {judgement.result === 'expert_needed' && (
        <section className="mb-5">
          <h2 className="mb-2 text-sm font-bold text-neutral-500">
            {t.result.unknownSectionTitle}
          </h2>
          <ul className="space-y-2">
            {judgement.unknownItems.map((item) => (
              <li
                key={item.questionId}
                className="rounded-xl border border-amber-200 bg-amber-50/60 p-3 text-base text-amber-800"
              >
                {t.questions[item.questionId].shortLabel}
                {t.result.unknownItemSuffix}
              </li>
            ))}
          </ul>
        </section>
      )}

      <p className="mb-6 rounded-xl bg-neutral-100 p-3 text-sm leading-relaxed text-neutral-500">
        {judgement.result === 'safe' ? t.result.disclaimerSafe : t.result.disclaimerGeneral}
      </p>

      {judgement.result !== 'expert_needed' && (
        <section className="mb-2 rounded-2xl border border-indigo-200 bg-indigo-50/40 p-4">
          <p className="mb-3 text-sm leading-relaxed text-neutral-700">
            {t.result.askExpertPrompt}
          </p>
          <BigButton variant="outline" onClick={onConsultExpert}>
            {t.result.askExpertButton}
          </BigButton>
        </section>
      )}

      <div className="mt-auto space-y-3 pt-4">
        {judgement.result === 'expert_needed' && (
          <BigButton onClick={onConsultExpert} className="text-lg">
            {t.result.consultExpertButton}
          </BigButton>
        )}
        <BigButton variant="secondary" onClick={onRestart}>
          {t.result.restartButton}
        </BigButton>
      </div>
    </div>
  );
}
