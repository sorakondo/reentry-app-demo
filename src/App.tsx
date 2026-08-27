import { useMemo, useState } from 'react';
import type {
  Answer,
  AnswerValue,
  BuildingInfo,
  EntranceDisplayState,
  PriorCheckRecord,
  SavedResult,
  Screen,
  SeismicInfo,
  ViewMode,
} from './types';
import { CHECKLIST_QUESTIONS, getDynamicQuestions } from './data/checklist';
import { DEFAULT_BUILDING_INFO } from './data/buildingInfo';
import { DEFAULT_PRIOR_CHECK } from './data/priorCheck';
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
import EntranceDisplayScreen from './screens/EntranceDisplayScreen';
import ControlPanelScreen from './screens/ControlPanelScreen';

function createInitialAnswers(): Answer[] {
  return CHECKLIST_QUESTIONS.map((q) => ({
    questionId: q.id,
    value: null,
    comment: '',
  }));
}

function AppContent() {
  const { t, lang } = useLanguage();
  const [view, setView] = useState<ViewMode>('phone');
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
  const [entranceDisplayState, setEntranceDisplayState] =
    useState<EntranceDisplayState>('diagnosing');
  const [priorCheck, setPriorCheck] = useState<PriorCheckRecord | null>(DEFAULT_PRIOR_CHECK);
  const { state: gasAlarm, setNormal, setAlarmStatus } = useGasAlarm();

  const judgement = useMemo(
    () => judge(answers, gasAlarm, getDynamicQuestions(answers)),
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
    // 入口ディスプレイも次の確認のために「診断中」へ戻す（自動切り替えはこの時のみ）
    setEntranceDisplayState('diagnosing');
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
        judgement.result === 'routine'
          ? t.result.titleRoutine
          : judgement.result === 'targeted'
            ? t.result.titleTargeted
            : judgement.result === 'hold'
              ? t.result.titleHold
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

  const viewTabs: { id: ViewMode; label: string }[] = [
    { id: 'phone', label: t.viewSwitcher.phoneTab },
    { id: 'entrance', label: t.viewSwitcher.entranceTab },
    { id: 'control', label: t.viewSwitcher.controlTab },
  ];

  return (
    <div className="flex h-dvh w-full flex-col bg-neutral-900">
      {/* デモ用: スマホ画面／入口ディスプレイ／操作パネルの3つの「端末」を切り替えるタブ */}
      <nav className="flex shrink-0 items-center justify-center gap-2 px-3 py-2">
        {viewTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setView(tab.id)}
            className={`tap-target rounded-full border px-4 text-sm font-bold transition-colors ${
              view === tab.id
                ? 'border-white bg-white text-neutral-900'
                : 'border-neutral-600 bg-neutral-800 text-neutral-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="min-h-0 flex-1">
        {view === 'phone' && (
          <PhoneFrame gasAlarm={gasAlarm} scrollResetKey={screen}>
            {screen === 'home' && (
              <HomeScreen
                priorCheck={priorCheck}
                buildingInfo={buildingInfo}
                onBuildingInfoChange={setBuildingInfo}
                onStart={handleStart}
                onSeismicInfoChange={setSeismicInfo}
              />
            )}

            {screen === 'checklist' && (
              <ChecklistScreen
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
                entranceDisplayState={entranceDisplayState}
                onSetEntranceDisplay={setEntranceDisplayState}
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
        )}

        {view === 'entrance' && <EntranceDisplayScreen state={entranceDisplayState} />}

        {view === 'control' && (
          <ControlPanelScreen
            gasAlarmStatus={gasAlarm.status}
            onSetGasAlarmStatus={setAlarmStatus}
            priorCheck={priorCheck}
            onSetPriorCheck={setPriorCheck}
          />
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
