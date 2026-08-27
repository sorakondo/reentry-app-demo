import { useEffect, useMemo, useRef, useState } from 'react';
import type { Answer, AnswerValue } from '../types';
import { getDynamicQuestions } from '../data/checklist';
import { useLanguage } from '../i18n/LanguageContext';
import BigButton from '../components/BigButton';

interface ChecklistScreenProps {
  answers: Answer[];
  onAnswerChange: (questionId: string, value: AnswerValue, comment: string) => void;
  onFinish: () => void;
  onExitToHome: () => void;
}

export default function ChecklistScreen({ answers, onAnswerChange, onFinish, onExitToHome }: ChecklistScreenProps) {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  const topRef = useRef<HTMLDivElement>(null);
  const questions = useMemo(() => getDynamicQuestions(answers), [answers]);
  const question = questions[index];
  const current = answers.find((answer) => answer.questionId === question.id);
  const selected = current?.value ?? null;
  const comment = current?.comment ?? '';
  const total = questions.length;
  const isLast = index === total - 1;
  const answerOptions: { value: AnswerValue; label: string; hint: string }[] = [
    { value: 'yes', label: t.checklist.answerYes, hint: t.checklist.answerYesHint },
    { value: 'no', label: t.checklist.answerNo, hint: t.checklist.answerNoHint },
    { value: 'unknown', label: t.checklist.answerUnknown, hint: t.checklist.answerUnknownHint },
  ];

  useEffect(() => {
    topRef.current?.scrollIntoView({ block: 'start' });
  }, [index]);

  function selectAnswer(value: AnswerValue) {
    onAnswerChange(question.id, value, comment);
  }

  function updateComment(text: string) {
    if (selected) onAnswerChange(question.id, selected, text);
  }

  function goNext() {
    if (!selected) return;
    if (isLast) onFinish();
    else setIndex((value) => value + 1);
  }

  function goBack() {
    if (index === 0) onExitToHome();
    else setIndex((value) => value - 1);
  }

  return (
    <div ref={topRef} className="flex flex-1 flex-col px-5 pb-6 pt-2">
      <div className="flex-1">
        <div className="mb-3 flex items-center gap-2 text-xs font-bold text-neutral-400">
          <span>{t.checklist.checkLabel}</span>
          {question.isGasRelated && (
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-700">
              {t.checklist.importantBadge}
            </span>
          )}
        </div>
        <h2 className="mb-6 text-2xl font-bold leading-snug text-neutral-900">{t.questions[question.id].text}</h2>

        <div className="space-y-3">
          {answerOptions.map((option) => {
            const isSelected = selected === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => selectAnswer(option.value)}
                className={`tap-target w-full rounded-2xl border-2 px-5 py-4 text-left text-lg font-bold transition-colors ${
                  isSelected
                    ? option.value === 'yes'
                      ? 'border-red-600 bg-red-50 text-red-700'
                      : option.value === 'no'
                        ? 'border-green-600 bg-green-50 text-green-700'
                        : 'border-amber-500 bg-amber-50 text-amber-700'
                    : 'border-neutral-200 bg-white text-neutral-800 active:bg-neutral-50'
                }`}
              >
                <span className="flex items-center justify-between">
                  <span className="flex items-baseline gap-2">
                    {option.label}
                    <span className="text-xs font-normal text-neutral-400">（{option.hint}）</span>
                  </span>
                  {isSelected && <span aria-hidden="true">✓</span>}
                </span>
              </button>
            );
          })}
        </div>

        {selected === 'unknown' && (
          <div className="mt-4">
            <label htmlFor="unknown-comment" className="mb-1 block text-sm font-bold text-neutral-500">{t.checklist.commentLabel}</label>
            <textarea
              id="unknown-comment"
              value={comment}
              onChange={(event) => updateComment(event.target.value)}
              rows={4}
              placeholder={t.checklist.commentPlaceholder}
              className="w-full rounded-xl border border-neutral-300 p-3 text-base text-neutral-900 focus:border-neutral-900 focus:outline-none"
            />
            <p className="mt-1 text-xs text-neutral-400">{t.checklist.commentNote}</p>
          </div>
        )}
      </div>

      <div className="mt-6 flex gap-3">
        <BigButton variant="secondary" onClick={goBack} className="w-auto flex-1">{t.checklist.backButton}</BigButton>
        <BigButton onClick={goNext} disabled={!selected} className="flex-[2]">{isLast ? t.checklist.finishButton : t.checklist.nextButton}</BigButton>
      </div>
    </div>
  );
}
