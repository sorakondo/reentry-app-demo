import { useLanguage } from '../i18n/LanguageContext';
import BigButton from '../components/BigButton';

interface ExpertSentScreenProps {
  caseNumber: string;
  onBackToHome: () => void;
}

export default function ExpertSentScreen({
  caseNumber,
  onBackToHome,
}: ExpertSentScreenProps) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-1 flex-col items-center px-5 pb-6 pt-10 text-center">
      <div className="mb-5 text-6xl leading-none">✅</div>
      <h1 className="mb-2 text-2xl font-extrabold text-neutral-900">
        {t.expertSent.title}
      </h1>
      <p className="mb-6 text-base leading-relaxed text-neutral-500">
        {t.expertSent.desc}
      </p>

      <div className="mb-8 w-full rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
        <p className="text-sm font-bold text-neutral-500">
          {t.expertSent.caseNumberLabel}
        </p>
        <p className="mt-1 text-2xl font-extrabold tracking-wide text-neutral-900">
          {caseNumber}
        </p>
      </div>

      <p className="mb-8 rounded-xl bg-neutral-100 p-3 text-sm leading-relaxed text-neutral-500">
        {t.expertSent.demoNote}
      </p>

      <div className="mt-auto w-full">
        <BigButton onClick={onBackToHome}>{t.expertSent.backHomeButton}</BigButton>
      </div>
    </div>
  );
}
