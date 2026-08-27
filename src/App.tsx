import { useMemo, useState } from 'react';
import type { Answer, AnswerValue, BuildingInfo, SavedResult, Screen, SeismicInfo } from './types';
import { CHECKLIST_QUESTIONS } from './data/checklist';
import { DEFAULT_BUILDING_INFO } from './data/buildingInfo';
import { judge } from './logic/judgement';
import { useGasAlarm } from './logic/useGasAlarm';
import {
  buildSavedResultNote,
  generateCaseNumber,
  generateRecordId,
} from './logic/expertReport';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';

import PhoneFrame from './components/PhoneFrame';
import HomeScreen from './screens/HomeScreen';
import ChecklistScreen from './screens/ChecklistScreen';
import ResultScreen from './screens/ResultScreen';
import ExpertRequestScreen from './screens/ExpertRequestScreen';
import ExpertCallScreen from './screens/ExpertCallScreen';

function createInitialAnswers(): Answer[] {
  return CHECKLIST_QUESTIONS.map((q) => ({
    questionId: q.id,
    value: null,
    comment: '',
  }));
}

function AppContent() {
  const { t, lang } = useLanguage();
  const [screen, setScreen] = useState<Screen>('home');
  const [answers, setAnswers] = useState<Answer[]>(createInitialAnswers());
  const [checkedAt, setCheckedAt] = useState<Date>(new Date());
  const [caseNumber, setCaseNumber] = useState<string>('');
  const [recordId, setRecordId] = useState<string>('');
  const [savedResult, setSavedResult] = useState<SavedResult | null>(null);
  const [buildingInfo, setBuildingInfo] = useState<BuildingInfo>(DEFAULT_BUILDING_INFO);
  const [seismicInfo, setSeismicInfo] = useState<SeismicInfo>({
    status: 'idle',
    scale: null,
    areaName: '',
    observedAt: null,
  });
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
    setSavedResult(null);
    setRecordId('');
    setScreen('home');
  }

  function handleFinishChecklist() {
    setRecordId(generateRecordId());
    setSavedResult(null);
    setScreen('result');
  }

  function handleConsultExpert() {
    setScreen('expertRequest');
  }

  function handleSaveResult() {
    setSavedResult({
      id: recordId || generateRecordId(),
      result: judgement.result,
      resultLabel:
        judgement.result === 'safe'
          ? t.result.titleSafe
          : judgement.result === 'unsafe'
            ? t.result.titleUnsafe
            : t.result.titleExpert,
      savedAt: new Date(),
      autoNote: buildSavedResultNote(judgement, lang),
    });
  }

  function handleStartExpertCall(_extraComment: string) {
    // デモのため実際のビデオ通話は行わない。追加コメントはこの後の連携先へ渡すことを想定。
    setCaseNumber(generateCaseNumber());
    setScreen('expertCall');
  }

  return (
    <PhoneFrame scrollResetKey={screen}>
      {screen === 'home' && (
        <HomeScreen
          gasAlarm={gasAlarm}
          buildingInfo={buildingInfo}
          onBuildingInfoChange={setBuildingInfo}
          onStart={handleStart}
          onToggleAlarm={toggleStatus}
          onSeismicInfoChange={setSeismicInfo}
        />
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
          savedResult={savedResult}
          onSaveResult={handleSaveResult}
          onConsultExpert={handleConsultExpert}
          onRestart={handleRestart}
        />
      )}

      {screen === 'expertRequest' && (
        <ExpertRequestScreen
          checkedAt={checkedAt}
          gasAlarm={gasAlarm}
          seismicInfo={seismicInfo}
          buildingInfo={buildingInfo}
          judgement={judgement}
          onStartCall={handleStartExpertCall}
          onBack={() => setScreen('result')}
        />
      )}

      {screen === 'expertCall' && (
        <ExpertCallScreen
          caseNumber={caseNumber}
          recordId={recordId}
          onEndCall={handleRestart}
        />
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
