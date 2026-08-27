import { useMemo, useState } from 'react';
import type { GasAlarmState, JudgementDetail } from '../types';
import {
  buildOverallSummaryText,
  buildQuestionSummaryText,
  formatDateTimeJP,
} from '../logic/expertReport';
import { useLanguage } from '../i18n/LanguageContext';
import BigButton from '../components/BigButton';

interface ExpertRequestScreenProps {
  checkedAt: Date;
  gasAlarm: GasAlarmState;
  judgement: JudgementDetail;
  onSend: (extraComment: string) => void;
  onBack: () => void;
}

export default function ExpertRequestScreen({
  checkedAt,
  gasAlarm,
  judgement,
  onSend,
  onBack,
}: ExpertRequestScreenProps) {
  const { t, lang } = useLanguage();
  const [sending, setSending] = useState(false);
  const [extraComment, setExtraComment] = useState('');

  const overallText = useMemo(
    () => buildOverallSummaryText(judgement.unknownItems.length, lang),
    [judgement.unknownItems.length, lang],
  );

  function handleSend() {
    setSending(true);
    // デモ: 実際の通信は行わず、送信中の演出のみ
    setTimeout(() => {
      onSend(extraComment);
    }, 900);
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

      <div className="mt-auto space-y-3">
        <BigButton onClick={handleSend} disabled={sending} className="text-lg">
          {sending ? t.expertRequest.sendingButton : t.expertRequest.sendButton}
        </BigButton>
        <BigButton variant="secondary" onClick={onBack} disabled={sending}>
          {t.expertRequest.backButton}
        </BigButton>
      </div>
    </div>
  );
}
