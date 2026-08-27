import { useMemo, useState } from 'react';
import type { Answer, AnswerValue, Screen } from './types';
import { CHECKLIST_QUESTIONS } from './data/checklist';
import { judge } from './logic/judgement';
import { useGasAlarm } from './logic/useGasAlarm';
import { generateCaseNumber } from './logic/expertReport';
import { LanguageProvider } from './i18n/LanguageContext';

import PhoneFrame from './components/PhoneFrame';
import HomeScreen from './screens/HomeScreen';
import ChecklistScreen from './screens/ChecklistScreen';
import ResultScreen from './screens/ResultScreen';
import ExpertRequestScreen from './screens/ExpertRequestScreen';
import ExpertSentScreen from './screens/ExpertSentScreen';

function createInitialAnswers(): Answer[] {
  return CHECKLIST_QUESTIONS.map((q) => ({
    questionId: q.id,
    value: null,
    comment: '',
  }));
}

function AppContent() {
  const [screen, setScreen] = useState<Screen>('home');
  const [answers, setAnswers] = useState<Answer[]>(createInitialAnswers());
  const [checkedAt, setCheckedAt] = useState<Date>(new Date());
  const [caseNumber, setCaseNumber] = useState<string>('');
  const { state: gasAlarm, toggleStatus, setNormal } = useGasAlarm();

  const judgement = useMemo(
    () => judge(answers, gasAlarm),
    // gasAlarm.lastUpdated changes every few seconds; only status matters for judgement
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [answers, gasAlarm.status],
  );

  function handleAnswerChange(questionId: string, value: AnswerValue, comment: string) {
    setAnswers((prev) =>
      prev.map((a) => (a.questionId === questionId ? { ...a, value, comment } : a)),
    );
  }

  function handleStart() {
    setCheckedAt(new Date());
    setScreen('checklist');
  }

  function handleRestart() {
    // デモ用に切り替えたガス漏れ警報器の状態も、次の確認のために「正常」へ戻す
    setNormal();
    setAnswers(createInitialAnswers());
    setScreen('home');
  }

  function handleFinishChecklist() {
    setScreen('result');
  }

  function handleConsultExpert() {
    setScreen('expertRequest');
  }

  function handleSendToExpert(_extraComment: string) {
    // デモのため実際の送信は行わない。追加コメントはこの後の連携先へ渡すことを想定。
    setCaseNumber(generateCaseNumber());
    setScreen('expertSent');
  }

  return (
    <PhoneFrame>
      {screen === 'home' && (
        <HomeScreen gasAlarm={gasAlarm} onStart={handleStart} onToggleAlarm={toggleStatus} />
      )}

      {screen === 'checklist' && (
        <ChecklistScreen
          questions={CHECKLIST_QUESTIONS}
          answers={answers}
          onAnswerChange={handleAnswerChange}
          onFinish={handleFinishChecklist}
          onExitToHome={() => setScreen('home')}
        />
      )}

      {screen === 'result' && (
        <ResultScreen
          judgement={judgement}
          onConsultExpert={handleConsultExpert}
          onRestart={handleRestart}
        />
      )}

      {screen === 'expertRequest' && (
        <ExpertRequestScreen
          checkedAt={checkedAt}
          gasAlarm={gasAlarm}
          judgement={judgement}
          onSend={handleSendToExpert}
          onBack={() => setScreen('result')}
        />
      )}

      {screen === 'expertSent' && (
        <ExpertSentScreen caseNumber={caseNumber} onBackToHome={handleRestart} />
      )}
    </PhoneFrame>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
