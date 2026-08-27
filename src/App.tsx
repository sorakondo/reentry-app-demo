import { useMemo, useState } from 'react';
import type {
  AlarmStatus,
  Answer,
  AnswerValue,
  BuildingInfo,
  EntranceDisplayState,
  PriorCheckRecord,
  SavedResult,
  Screen,
  SeismicInfo,
  SelfResponsibilityEntry,
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
import ExpertDecisionScreen from './screens/ExpertDecisionScreen';
import EntranceDisplayScreen from './screens/EntranceDisplayScreen';
import ControlPanelScreen from './screens/ControlPanelScreen';

// 「火災警報・消火設備に異常がありますか？」は、現在のガス漏れ警報器の状態から
// 妥当な初期値を推定して事前に選択しておく（ユーザーは後から自由に変更できる）。
// ・ガス漏れ警報あり → 建物側の異常が疑われるため「はい（異常あり）」を初期値に
// ・警報器との通信なし → 現場で確認できないため「判断できない」を初期値に
// ・警報なし（正常） → 「いいえ（異常なし）」を初期値に
function defaultFireEquipmentAnswer(gasAlarmStatus: AlarmStatus): AnswerValue {
  if (gasAlarmStatus === 'alarm') return 'yes';
  if (gasAlarmStatus === 'noSignal') return 'unknown';
  return 'no';
}

function createInitialAnswers(gasAlarmStatus: AlarmStatus): Answer[] {
  return CHECKLIST_QUESTIONS.map((q) => ({
    questionId: q.id,
    value: q.id === 'q9_fire' ? defaultFireEquipmentAnswer(gasAlarmStatus) : null,
    comment: '',
  }));
}

function AppContent() {
  const { t, lang } = useLanguage();
  const [view, setView] = useState<ViewMode>('phone');
  const [screen, setScreen] = useState<Screen>('home');
  const [answers, setAnswers] = useState<Answer[]>(createInitialAnswers('normal'));
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
  const [priorCheck, setPriorCheck] = useState<PriorCheckRecord | null>(DEFAULT_PRIOR_CHECK);
  const [selfEntries, setSelfEntries] = useState<SelfResponsibilityEntry[]>([]);
  // 専門家とのビデオ通話後の入場可否決定画面で手動決定した結果。
  // 通常は判定結果（judgement）から自動的に入口ディスプレイの表示が決まるが、
  // 専門家が最終決定した場合はその結果を優先して表示する。
  const [manualEntranceOverride, setManualEntranceOverride] = useState<
    'allowed' | 'denied' | null
  >(null);
  const { state: gasAlarm, setNormal, setAlarmStatus } = useGasAlarm();

  const judgement = useMemo(
    () => judge(answers, gasAlarm, getDynamicQuestions(answers)),
    // gasAlarm.lastUpdated changes every few seconds; only status matters for judgement
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [answers, gasAlarm.status],
  );

  // 入口ディスプレイの表示は手動設定ではなく、判定結果から自動的に決まる。
  // ・ホーム画面／チェックリスト中（＝まだ確認が終わっていない）は常に「診断中」
  // ・確認が終わったら、結果が出た時点で必ず「入場可能」か「入場禁止」のどちらかになる
  //   （HOLDのみ「入場禁止」。それ以外（routine/targeted/expert_review）は「入場可能」。
  //   　「要追加確認・要専門家確認」でも診断自体は完了しているため、診断中のままにはしない）
  const entranceDisplayState: EntranceDisplayState = useMemo(() => {
    // 専門家が通話後に手動で決定した入場可否は、次の確認が始まる（handleStart）まで
    // 画面遷移に関わらず優先して表示し続ける（例：決定後にホーム画面へ戻っても保持される）
    if (manualEntranceOverride) return manualEntranceOverride;
    if (screen === 'home' || screen === 'checklist') return 'diagnosing';
    return judgement.result === 'hold' ? 'denied' : 'allowed';
  }, [screen, judgement.result, manualEntranceOverride]);

  function handleAnswerChange(questionId: string, value: AnswerValue, comment: string) {
    setAnswers((prev) =>
      prev.map((a) => (a.questionId === questionId ? { ...a, value, comment } : a)),
    );
  }

  function handleStart() {
    setCheckedAt(new Date());
    // 前回確認時に専門家が手動決定した入口表示が残らないよう、新しい確認の開始時にリセットする
    setManualEntranceOverride(null);
    // 確認開始時点の最新のガス漏れ警報器の状態をもとに、火災警報・消火設備の項目の初期値を決め直す
    setAnswers(createInitialAnswers(gasAlarm.status));
    setScreen('checklist');
  }

  function handleRestart() {
    // デモ用に切り替えたガス漏れ警報器の状態も、次の確認のために「正常」へ戻す
    setNormal();
    setAnswers(createInitialAnswers('normal'));
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

  function handleEndCall() {
    // 通話終了後は直接ホームに戻さず、入場可否を決定する画面へ進む
    // （このページは専門家との通話を行った場合にのみ表示される）
    setScreen('expertDecision');
  }

  function handleExpertDecision(result: 'allowed' | 'denied') {
    setManualEntranceOverride(result);
    handleRestart();
  }

  // 診断前・診断中でも自己責任で建物に入場する人の記録を追加する
  // （入室時刻は署名が完了した瞬間の時刻を自動で記録する）
  function handleAddSelfEntry(entry: SelfResponsibilityEntry) {
    setSelfEntries((prev) => [entry, ...prev]);
  }

  function handleRemoveSelfEntry(id: string) {
    setSelfEntries((prev) => prev.filter((e) => e.id !== id));
  }

  const viewTabs: { id: ViewMode; label: string }[] = [
    { id: 'phone', label: t.viewSwitcher.phoneTab },
    { id: 'entrance', label: t.viewSwitcher.entranceTab },
    { id: 'both', label: t.viewSwitcher.bothTab },
    { id: 'control', label: t.viewSwitcher.controlTab },
  ];

  // スマホ画面と入口ディスプレイのパネルは「スマホのみ」「入口のみ」「横並び」で
  // 使い回すため、ここで一度だけ組み立てておく。
  const phonePanel = (
    <PhoneFrame
      gasAlarm={gasAlarm}
      entranceDisplayState={entranceDisplayState}
      scrollResetKey={screen}
    >
      {screen === 'home' && (
        <HomeScreen
          priorCheck={priorCheck}
          buildingInfo={buildingInfo}
          onBuildingInfoChange={setBuildingInfo}
          onStart={handleStart}
          onSeismicInfoChange={setSeismicInfo}
          selfEntries={selfEntries}
          onAddSelfEntry={handleAddSelfEntry}
          onRemoveSelfEntry={handleRemoveSelfEntry}
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
        <ExpertCallScreen caseNumber={caseNumber} recordId={recordId} onEndCall={handleEndCall} />
      )}

      {screen === 'expertDecision' && <ExpertDecisionScreen onDecide={handleExpertDecision} />}
    </PhoneFrame>
  );

  const entrancePanel = <EntranceDisplayScreen state={entranceDisplayState} />;

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
        {view === 'phone' && phonePanel}

        {view === 'entrance' && entrancePanel}

        {/* スマホ画面と入口ディスプレイを画面切り替えなしで横並び（狭い画面では縦積み）に表示 */}
        {view === 'both' && (
          <div className="flex h-full w-full flex-col lg:flex-row">
            <div className="min-h-0 min-w-0 flex-1">{phonePanel}</div>
            <div className="min-h-0 min-w-0 flex-1">{entrancePanel}</div>
          </div>
        )}

        {view === 'control' && (
          <ControlPanelScreen
            gasAlarmStatus={gasAlarm.status}
            onSetGasAlarmStatus={setAlarmStatus}
            priorCheck={priorCheck}
            onSetPriorCheck={setPriorCheck}
            view={view}
            onSetView={setView}
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
