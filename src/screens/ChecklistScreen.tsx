import { useState } from 'react';
import type { Answer, AnswerValue, ChecklistQuestion } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import BigButton from '../components/BigButton';

interface ChecklistScreenProps {
  questions: ChecklistQuestion[];
  answers: Answer[];
  onAnswerChange: (questionId: string, value: AnswerValue, comment: string) => void;
  onFinish: () => void;
  onExitToHome: () => void;
}

export default function ChecklistScreen({
  questions,
  answers,
  onAnswerChange,
  onFinish,
  onExitToHome,
}: ChecklistScreenProps) {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  const total = questions.length;
  const question = questions[index];
  const qText = t.questions[question.id];
  const current = answers.find((a) => a.questionId === question.id);
  const selected = current?.value ?? null;
  const comment = current?.comment ?? '';

  const isLast = index === total - 1;

  const ANSWER_OPTIONS: { value: AnswerValue; label: string; hint: string }[] = [
    { value: 'yes', label: t.checklist.answerYes, hint: t.checklist.answerYesHint },
    { value: 'no', label: t.checklist.answerNo, hint: t.checklist.answerNoHint },
    {
      value: 'unknown',
      label: t.checklist.answerUnknown,
      hint: t.checklist.answerUnknownHint,
    },
  ];

  function selectAnswer(value: AnswerValue) {
    onAnswerChange(question.id, value, comment);
  }

  function updateComment(text: string) {
    if (selected) {
      onAnswerChange(question.id, selected, text);
    }
  }

  function goNext() {
    if (!selected) return;
    if (isLast) {
      onFinish();
    } else {
      setIndex((i) => i + 1);
    }
  }

  function goBack() {
    if (index === 0) {
      onExitToHome();
    } else {
      setIndex((i) => i - 1);
    }
  }

  return (
    <div className="flex flex-1 flex-col px-5 pb-6 pt-2">
      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between text-sm font-bold text-neutral-500">
          <span>{t.checklist.progress(index + 1, total)}</span>
          {question.isGasRelated && (
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-700">
              {t.checklist.importantBadge}
            </span>
          )}
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-100">
          <div
            className="h-full rounded-full bg-neutral-900 transition-all"
            style={{ width: `${((index + 1) / total) * 100}%` }}
          />
        </div>
      </div>

      <div className="flex-1">
        <h2 className="mb-6 text-2xl font-bold leading-snug text-neutral-900">
          {qText.text}
        </h2>

        <div className="space-y-3">
          {ANSWER_OPTIONS.map((opt) => {
            const isSelected = selected === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => selectAnswer(opt.value)}
                className={`tap-target w-full rounded-2xl border-2 px-5 py-4 text-left text-lg font-bold transition-colors ${
                  isSelected
                    ? opt.value === 'yes'
                      ? 'border-green-600 bg-green-50 text-green-700'
                      : opt.value === 'no'
                        ? 'border-red-600 bg-red-50 text-red-700'
                        : 'border-amber-500 bg-amber-50 text-amber-700'
                    : 'border-neutral-200 bg-white text-neutral-800 active:bg-neutral-50'
                }`}
              >
                <span className="flex items-center justify-between">
                  <span className="flex items-baseline gap-2">
                    {opt.label}
                    <span className="text-xs font-normal text-neutral-400">
                      （{opt.hint}）
                    </span>
                  </span>
                  {isSelected && <span aria-hidden="true">✓</span>}
                </span>
              </button>
            );
          })}
        </div>

        {selected === 'unknown' && (
          <div className="mt-4">
            <label
              htmlFor="unknown-comment"
              className="mb-1 block text-sm font-bold text-neutral-500"
            >
              {t.checklist.commentLabel}
            </label>
            <textarea
              id="unknown-comment"
              value={comment}
              onChange={(e) => updateComment(e.target.value)}
              rows={4}
              placeholder={t.checklist.commentPlaceholder}
              className="w-full rounded-xl border border-neutral-300 p-3 text-base text-neutral-900 focus:border-neutral-900 focus:outline-none"
            />
            <p className="mt-1 text-xs text-neutral-400">{t.checklist.commentNote}</p>
          </div>
        )}
      </div>

      <div className="mt-6 flex gap-3">
        <BigButton variant="secondary" onClick={goBack} className="w-auto flex-1">
          {t.checklist.backButton}
        </BigButton>
        <BigButton onClick={goNext} disabled={!selected} className="flex-[2]">
          {isLast ? t.checklist.finishButton : t.checklist.nextButton}
        </BigButton>
      </div>
    </div>
  );
}
