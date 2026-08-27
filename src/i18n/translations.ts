import type { Lang, QuestionId, StructureType } from '../types';

interface QuestionText {
  text: string;
  shortLabel: string;
  dangerDescription: string;
  unknownBaseText: string;
}

interface Translation {
  common: {
    langToggleLabel: string;
    buildingName: string;
  };
  home: {
    appTitle: string;
    appSubtitle: string;
    buildingNameLabel: string;
    checkedAtLabel: string;
    gasAlarmSectionTitle: string;
    gasAlarmNormal: string;
    gasAlarmAlarm: string;
    gasAlarmNoSignal: string;
    // 画面左上の小さなバッジ専用の短い表記（英語版で1行に収まるように、正式名称より短くする）
    gasAlarmNormalBadge: string;
    gasAlarmAlarmBadge: string;
    gasAlarmNoSignalBadge: string;
    gasAlarmNormalDesc: string;
    gasAlarmAlarmDesc: string;
    gasAlarmNoSignalDesc: string;
    gasLevelLabel: string;
    gasLevelNormal: string;
    gasLevelAbnormal: string;
    gasLevelNoSignal: string;
    lastUpdatedLabel: string;
    disclaimer: string;
    startButton: string;
    devPanelOpen: string;
    devPanelClose: string;
    devPanelDesc: string;
    toggleAlarmButton: (statusLabel: string) => string;
    relativeJustNow: string;
    relativeSecondsAgo: (n: number) => string;
    relativeMinutesAgo: (n: number) => string;
  };
  seismic: {
    sectionTitle: string;
    scaleLabel: (scale: number | null) => string;
    statusLoading: string;
    statusAutoObservedAt: string;
    statusNoData: string;
    statusFailed: string;
    sourceAutoBadge: string;
    sourceManualBadge: string;
    areaUnknown: string;
    retryButton: string;
    manualToggleOn: string;
    manualToggleOff: string;
    manualScaleLabel: string;
    manualAreaLabel: string;
    manualAreaPlaceholder: string;
    manualNotSet: string;
  };
  expertCapacity: {
    sectionTitle: string;
    unitSeparator: string;
    description: string;
    statusAvailable: string;
    statusModerate: string;
    statusCongested: string;
  };
  startConfirm: {
    title: string;
    description: string;
    confirmButton: string;
    editButton: string;
    cancelButton: string;
  };
  buildingInfo: {
    sectionTitle: string;
    settingsButton: string;
    modalTitle: string;
    modalDesc: string;
    ageLabel: string;
    ageUnit: string;
    locationLabel: string;
    locationPlaceholder: string;
    floorsLabel: string;
    floorsUnit: string;
    structureTypeLabel: string;
    structureTypeOptions: Record<StructureType, string>;
    floorAreaLabel: string;
    floorAreaUnit: string;
    notSet: string;
    saveButton: string;
    cancelButton: string;
  };
  priorCheck: {
    sectionTitle: string;
    signerLabel: string;
    savedAtLabel: string;
    recordIdLabel: string;
    notCheckedText: string;
  };
  selfEntry: {
    sectionTitle: string;
    description: string;
    addButton: string;
    emptyText: string;
    nameLabel: string;
    namePlaceholder: string;
    roomLabel: string;
    roomPlaceholder: string;
    entryTimeLabel: string;
    riskNotice: string;
    modalTitle: string;
    modalDesc: string;
    nextButton: string;
    cancelButton: string;
    removeButton: string;
    signedBadge: string;
  };
  viewSwitcher: {
    phoneTab: string;
    entranceTab: string;
    bothTab: string;
    controlTab: string;
  };
  entranceDisplay: {
    diagnosingTitle: string;
    diagnosingDesc: string;
    allowedTitle: string;
    allowedDesc: string;
    deniedTitle: string;
    deniedDesc: string;
    footerNote: string;
    // 画面左上の小さなバッジ専用の短い表記（英語版で1行に収まるように、正式名称より短くする）
    diagnosingBadge: string;
    allowedBadge: string;
    deniedBadge: string;
  };
  controlPanel: {
    title: string;
    subtitle: string;
    gasAlarmSectionTitle: string;
    setNormalButton: string;
    setAlarmButton: string;
    setNoSignalButton: string;
    currentStatusLabel: string;
    priorCheckSectionTitle: string;
    priorCheckOnButton: string;
    priorCheckOffButton: string;
    priorCheckCurrentLabel: string;
    priorCheckOnStatus: string;
    priorCheckOffStatus: string;
    layoutSectionTitle: string;
    layoutCurrentLabel: string;
    layoutPhoneButton: string;
    layoutEntranceButton: string;
    layoutBothButton: string;
  };
  checklist: {
    checkLabel: string;
    progress: (index: number, total: number) => string;
    importantBadge: string;
    answerYes: string;
    answerYesHint: string;
    answerNo: string;
    answerNoHint: string;
    answerUnknown: string;
    answerUnknownHint: string;
    commentLabel: string;
    commentPlaceholder: string;
    commentNote: string;
    criticalStopNote: string;
    backButton: string;
    nextButton: string;
    finishButton: string;
  };
  questions: Record<QuestionId, QuestionText>;
  result: {
    titleRoutine: string;
    titleTargeted: string;
    titleExpert: string;
    titleHold: string;
    descRoutine: string;
    descTargeted: string;
    descExpert: string;
    descHold: string;
    targetedSectionTitle: string;
    targetedItemSuffix: string;
    dangerSectionTitle: string;
    gasAlarmReasonText: string;
    unknownSectionTitle: string;
    unknownItemSuffix: string;
    disclaimerSafe: string;
    disclaimerGeneral: string;
    consultExpertButton: string;
    restartButton: string;
    askExpertPrompt: string;
    askExpertButton: string;
    saveResultButton: string;
    savedBadge: string;
    recordIdLabel: string;
    savedAtLabel: string;
    autoNoteLabel: string;
    saveRequiresSignatureNote: string;
    endWorkButton: string;
  };
  expertRequest: {
    title: string;
    subtitle: string;
    buildingNameLabel: string;
    checkedAtLabel: string;
    gasAlarmLabel: string;
    seismicLabel: string;
    fieldResultSectionTitle: string;
    noUnknownItemsText: string;
    unknownSuffix: string;
    autoSummaryBadge: string;
    autoSummarySectionTitle: string;
    noExtraCommentText: string;
    overallSummary: (unknownCount: number) => string;
    overallSummaryNoUnknown: string;
    extraCommentLabel: string;
    extraCommentPlaceholder: string;
    callButton: string;
    connectingButton: string;
    backButton: string;
  };
  expertCall: {
    liveBadge: string;
    title: string;
    expertLabel: string;
    expertRole: string;
    selfLabel: string;
    waitingNote: string;
    callIdLabel: string;
    buildingLabel: string;
    demoNote: string;
    endCallButton: string;
    photoSectionTitle: string;
    photoSectionDesc: string;
    selectPhotoButton: string;
    photoSending: string;
    photoSent: string;
    photoRemoveLabel: string;
    photoDemoNote: string;
    recordIdLabel: string;
    signatureSectionTitle: string;
    signatureSectionDesc: string;
    signButton: string;
    signedStatus: string;
    unsignedStatus: string;
    signedAtLabel: string;
    signatureModalTitle: string;
    signaturePlaceholder: string;
    signatureInputPlaceholder: string;
    clearButton: string;
    completeSignButton: string;
    cancelButton: string;
    entranceControlSectionTitle: string;
    entranceControlDesc: string;
    setEntranceAllowedButton: string;
    setEntranceDeniedButton: string;
    setEntranceDiagnosingButton: string;
    entranceCurrentLabel: string;
    entranceStatusDiagnosing: string;
    entranceStatusAllowed: string;
    entranceStatusDenied: string;
    entranceHoldNote: string;
  };
  expertDecision: {
    title: string;
    description: string;
    signRequiredNote: string;
  };
}

const ja: Translation = {
  common: {
    langToggleLabel: 'English',
    buildingName: '○○ビル',
  },
  home: {
    appTitle: '建物再入場確認',
    appSubtitle: '建物の安全状態を確認します',
    buildingNameLabel: '建物名',
    checkedAtLabel: '確認日時',
    gasAlarmSectionTitle: 'ガス漏れ警報器',
    gasAlarmNormal: 'ガス漏れ警報なし',
    gasAlarmAlarm: 'ガス漏れ警報あり',
    gasAlarmNoSignal: '接続なし',
    gasAlarmNormalBadge: 'ガス漏れ警報なし',
    gasAlarmAlarmBadge: 'ガス漏れ警報あり',
    gasAlarmNoSignalBadge: '接続なし',
    gasAlarmNormalDesc: '警報器からの最新データを受信しています',
    gasAlarmAlarmDesc: '警報器が異常を検知しています。ただちに避難してください。',
    gasAlarmNoSignalDesc: '警報器との通信が途絶えています。状態を確認できません。',
    gasLevelLabel: 'ガス濃度',
    gasLevelNormal: '正常範囲',
    gasLevelAbnormal: '異常濃度を検知',
    gasLevelNoSignal: '受信なし',
    lastUpdatedLabel: '最終受信',
    disclaimer:
      'このシステムは建物の安全性を最終的に保証するものではありません。危険を感じた場合は建物に立ち入らないでください。',
    startButton: '確認を開始',
    devPanelOpen: '研究用デモ操作パネル',
    devPanelClose: '研究用デモ操作パネルを閉じる',
    devPanelDesc:
      '発表デモ用：ガス漏れ警報器の状態を切り替えます（実際のセンサーとは連動しません）。「最初からやり直す」を押すと自動的に「正常」に戻ります。',
    toggleAlarmButton: (statusLabel) => `警報器状態を切り替える（現在：${statusLabel}）`,
    relativeJustNow: 'たった今',
    relativeSecondsAgo: (n) => `${n}秒前`,
    relativeMinutesAgo: (n) => `${n}分前`,
  },
  seismic: {
    sectionTitle: '周辺の震度情報',
    scaleLabel: (scale) => {
      const labels: Record<number, string> = {
        0: '震度0',
        10: '震度1',
        20: '震度2',
        30: '震度3',
        40: '震度4',
        45: '震度5弱',
        46: '震度5弱以上（未確定）',
        50: '震度5強',
        55: '震度6弱',
        60: '震度6強',
        70: '震度7',
      };
      if (scale === null) return '不明';
      return labels[scale] ?? '不明';
    },
    statusLoading: '位置情報から震度情報を取得しています…',
    statusAutoObservedAt: '取得日時',
    statusNoData: '直近の震度情報の報告はありません',
    statusFailed: '震度情報を自動取得できませんでした。手動で入力してください。',
    sourceAutoBadge: '自動取得',
    sourceManualBadge: '手動入力',
    areaUnknown: '地域不明',
    retryButton: '自動取得をやり直す',
    manualToggleOn: '手動で入力する',
    manualToggleOff: '自動取得に戻す',
    manualScaleLabel: '震度',
    manualAreaLabel: '地域名（任意）',
    manualAreaPlaceholder: '例：○○市○○区',
    manualNotSet: '未入力',
  },
  expertCapacity: {
    sectionTitle: '専門家テレビ電話 対応状況',
    unitSeparator: '/',
    description: '現在対応中の相談件数です',
    statusAvailable: '空きがあります。すぐに接続できます。',
    statusModerate: 'やや混雑しています。',
    statusCongested: '混雑しています。接続までお待ちいただく場合があります。',
  },
  startConfirm: {
    title: '建物情報の確認',
    description:
      '確認作業を始める前に、建物の情報に変更がないかご確認ください。変更がある場合は「情報を変更する」から修正できます。',
    confirmButton: 'この内容で確認を開始する',
    editButton: '情報を変更する',
    cancelButton: 'キャンセル',
  },
  buildingInfo: {
    sectionTitle: '建物・現場情報',
    settingsButton: '設定',
    modalTitle: '建物情報の設定',
    modalDesc: '建物の基本情報を入力してください（デモ用にあらかじめ入力されています）。',
    ageLabel: '築年数',
    ageUnit: '年',
    locationLabel: '所在地',
    locationPlaceholder: '例：東京都千代田区丸の内1-1-1',
    floorsLabel: '階数',
    floorsUnit: '階建て',
    structureTypeLabel: '構造種別',
    structureTypeOptions: {
      RC: 'RC造（鉄筋コンクリート造）',
      S: 'S造（鉄骨造）',
      wood: '木造',
      other: 'その他',
    },
    floorAreaLabel: '延床面積',
    floorAreaUnit: 'm²',
    notSet: '未設定',
    saveButton: '保存する',
    cancelButton: 'キャンセル',
  },
  priorCheck: {
    sectionTitle: 'この建物の確認記録',
    signerLabel: '署名者',
    savedAtLabel: '保存日時',
    recordIdLabel: '記録ID',
    notCheckedText: 'この建物はまだ確認されていません。',
  },
  selfEntry: {
    sectionTitle: '自己責任での入場記録',
    description:
      '診断が完了する前でも、自己責任で建物に入る方の氏名・入室時刻・行き先・署名を記録できます。',
    addButton: '＋ 入場記録を追加',
    emptyText: 'まだ記録はありません。',
    nameLabel: '氏名',
    namePlaceholder: '例：山田 太郎',
    roomLabel: '行き先の部屋',
    roomPlaceholder: '例：3階 事務室',
    entryTimeLabel: '入室時刻',
    riskNotice:
      '診断が完了していない建物への入場は危険を伴う可能性があります。自己責任での入場であることを理解のうえ、署名してください。',
    modalTitle: '自己責任での入場記録',
    modalDesc: '氏名と行き先を入力してください。次の画面で署名します。',
    nextButton: '次へ（署名する）',
    cancelButton: 'キャンセル',
    removeButton: '削除',
    signedBadge: '署名済み',
  },
  viewSwitcher: {
    phoneTab: '📱 スマホ',
    entranceTab: '🚪 入口',
    bothTab: '📱🚪 横並び',
    controlTab: '🎛 操作パネル',
  },
  entranceDisplay: {
    diagnosingTitle: '診断中',
    diagnosingDesc: '現在、建物の安全性を確認しています。しばらくお待ちください。',
    allowedTitle: '入場可能',
    allowedDesc: '建物への再入場が許可されています。',
    deniedTitle: '入場禁止',
    deniedDesc: '建物への再入場は禁止されています。立ち入らないでください。',
    footerNote: 'これは建物入口に設置される案内表示のデモです。',
    diagnosingBadge: '診断中',
    allowedBadge: '入場可能',
    deniedBadge: '入場禁止',
  },
  controlPanel: {
    title: 'デモ用 操作パネル',
    subtitle: 'このパネルはデモ発表用の操作画面です。実際のシステムには存在しません。',
    gasAlarmSectionTitle: 'ガス漏れ警報器の状態',
    setNormalButton: '正常にする',
    setAlarmButton: '警報にする',
    setNoSignalButton: '通信なしにする',
    currentStatusLabel: '現在の状態',
    priorCheckSectionTitle: 'この建物の確認記録',
    priorCheckOnButton: '確認済みにする',
    priorCheckOffButton: '未確認にする',
    priorCheckCurrentLabel: '現在の状態',
    priorCheckOnStatus: '確認済み',
    priorCheckOffStatus: '未確認',
    layoutSectionTitle: '画面レイアウト',
    layoutCurrentLabel: '現在の表示',
    layoutPhoneButton: '📱 スマホのみ',
    layoutEntranceButton: '🚪 入口のみ',
    layoutBothButton: '📱🚪 横並び',
  },
  checklist: {
    checkLabel: '確認項目',
    progress: (index, total) => `${index} / ${total}`,
    importantBadge: '重要項目',
    answerYes: 'はい',
    answerYesHint: '危険あり',
    answerNo: 'いいえ',
    answerNoHint: '危険なし',
    answerUnknown: '判断できない',
    answerUnknownHint: '現場では確認できない',
    commentLabel: '状況を入力してください（任意）',
    commentPlaceholder:
      '例：1階の柱にひび割れがあるように見えるが、損傷の程度を判断できない',
    commentNote: '入力内容は専門家への相談内容として使用されます。',
    criticalStopNote:
      '「はい」を選択すると、この時点で入場禁止（HOLD）の判定が確定し、確認はここで終了します。',
    backButton: '戻る',
    nextButton: '次へ',
    finishButton: '結果を見る',
  },
  questions: {
    q1_tilt: {
      text: '建物に明らかな傾き・沈下がありますか？',
      shortLabel: '建物の傾き',
      dangerDescription: '建物の傾きなど、外観上の異常がある可能性があります',
      unknownBaseText:
        '建物の傾きについて、外観からの確認だけでは現場で安全性を判断できませんでした。',
    },
    q2_crack: {
      text: '主要構造部（柱・梁など）に重大なひび割れ・損傷がありますか？',
      shortLabel: '柱・梁の損傷',
      dangerDescription: '柱・梁に危険がある可能性があります',
      unknownBaseText:
        '柱・梁について、損傷の有無や程度を現場で判断できませんでした。',
    },
    q3_adjacent: {
      text: '隣接建物・地盤に危険な変状がありますか？',
      shortLabel: '隣接建物・地盤の危険',
      dangerDescription: '隣接建物・地盤に危険な変状がある可能性があります',
      unknownBaseText: '隣接建物・地盤の状態を現場で判断できませんでした。',
    },
    q4_monitoring: {
      text: '構造モニタリングに異常がありますか？（最新データを受信できていない場合を含む）',
      shortLabel: '構造モニタリング',
      dangerDescription: '構造モニタリングに異常がある可能性があります',
      unknownBaseText: '構造モニタリングの状態を現場で判断できませんでした。',
    },
    q5_ceiling: {
      text: '天井に落下・崩落の兆候がありますか？',
      shortLabel: '天井の損傷',
      dangerDescription: '天井に落下・崩落の危険がある可能性があります',
      unknownBaseText: '天井の落下・崩落の危険を現場で判断できませんでした。',
    },
    q6_glass: {
      text: 'ガラスやその他の落下物による危険がありますか？',
      shortLabel: 'ガラス・落下物の危険',
      dangerDescription: 'ガラス・落下物による危険がある可能性があります',
      unknownBaseText: 'ガラス・落下物の危険を現場で判断できませんでした。',
    },
    q7_exit: {
      text: '非常階段・出口の利用に支障がありますか？',
      shortLabel: '非常階段・出口',
      dangerDescription: '非常階段・出口を利用できない可能性があります',
      unknownBaseText: '非常階段・出口の利用可否を現場で判断できませんでした。',
    },
    q9_fire: {
      text: '火災警報・消火設備に異常がありますか？',
      shortLabel: '火災警報・消防設備',
      dangerDescription: '火災警報・消防設備に異常がある可能性があります',
      unknownBaseText: '火災警報・消防設備の状態を現場で判断できませんでした。',
    },
    q10_elevator: {
      text: 'エレベーターが停止している、または閉じ込められた人がいますか？',
      shortLabel: 'エレベーター・閉じ込め',
      dangerDescription: 'エレベーターの停止や閉じ込めの危険があります',
      unknownBaseText: 'エレベーターの停止・閉じ込め状況を現場で判断できませんでした。',
    },
    q11_power: {
      text: '電力に異常があり、通電による危険がありますか？',
      shortLabel: '電力の状態',
      dangerDescription: '電力の停止・通電による追加確認が必要です',
      unknownBaseText: '電力の状態を現場で判断できませんでした。',
    },
    q12_missing_data: {
      text: '安全判定に必要な重要データが不足していますか？',
      shortLabel: '重要データの不足',
      dangerDescription: '安全判定に必要な重要データが不足しています',
      unknownBaseText: '安全判定に必要な重要データの有無を判断できませんでした。',
    },
  },
  result: {
    titleRoutine: 'Routine Check',
    titleTargeted: 'Targeted Check',
    titleExpert: 'Expert Review',
    titleHold: 'HOLD',
    descRoutine: '今回の関連項目はすべて正常でした。',
    descTargeted: '一部の設備・内装項目に追加確認が必要です。',
    descExpert: '構造・重要項目を現場だけでは判断できません。',
    descHold: '重大な危険または安全判定を止める状態を検知しました。',
    targetedSectionTitle: '追加確認が必要な項目',
    targetedItemSuffix: '：追加確認',
    dangerSectionTitle: 'HOLDの理由',
    gasAlarmReasonText: 'ガス漏れ警報器が警報を検知しています',
    unknownSectionTitle: '判断できなかった項目',
    unknownItemSuffix: '：判断できない',
    disclaimerSafe: 'この結果は建物の安全性を保証するものではありません。',
    disclaimerGeneral:
      'このシステムは建物の安全性を最終的に保証するものではありません。危険を感じた場合は建物に立ち入らないでください。',
    consultExpertButton: '専門家への相談内容を確認',
    restartButton: '最初からやり直す',
    askExpertPrompt: '判断に迷う場合や不安な点がある場合は、専門家に相談することもできます。',
    askExpertButton: '専門家に相談する',
    saveResultButton: '確認結果をアプリに保存',
    savedBadge: '保存済み',
    recordIdLabel: '記録ID',
    savedAtLabel: '保存日時',
    autoNoteLabel: '自動整理メモ',
    saveRequiresSignatureNote: '保存する前に、上の署名欄への署名が必要です。',
    endWorkButton: '確認作業を終了する',
  },
  expertRequest: {
    title: '専門家への確認依頼',
    subtitle:
      '入力内容をもとに、相談内容を自動的に整理しました。内容を確認のうえ、専門家とのビデオ通話を開始してください。',
    buildingNameLabel: '建物名',
    checkedAtLabel: '確認日時',
    gasAlarmLabel: 'ガス漏れ警報器',
    seismicLabel: '周辺の震度',
    fieldResultSectionTitle: '現場確認結果',
    noUnknownItemsText: '現場で判断できなかった項目はありません。',
    unknownSuffix: '：判断できない',
    autoSummaryBadge: '自動整理（デモ）',
    autoSummarySectionTitle: '専門家への相談内容',
    noExtraCommentText: '現場からの追加情報なし',
    overallSummary: (unknownCount) =>
      `現場確認の結果、${unknownCount}件の項目について、現場の担当者だけでは安全性を判断できませんでした。恐れ入りますが、下記の内容をご確認のうえ、再入場の可否についてご判断をお願いいたします。`,
    overallSummaryNoUnknown:
      '現場確認では判断できなかった項目はありませんでしたが、現場の担当者が判断に迷う点があるため、念のため専門家のご確認をお願いいたします。',
    extraCommentLabel: '通話で伝えたいこと（任意）',
    extraCommentPlaceholder: '例：結果は「再入場可能」だったが、念のため確認してほしい',
    callButton: '専門家とビデオ通話をつなぐ',
    connectingButton: '接続中…',
    backButton: '結果画面に戻る',
  },
  expertCall: {
    liveBadge: '通話中',
    title: '専門家とビデオ通話中',
    expertLabel: '専門家',
    expertRole: '建物構造の専門家（オンライン）',
    selfLabel: 'あなた（現場）',
    waitingNote: '専門家が状況を確認しています。現在の状況を落ち着いてお伝えください。',
    callIdLabel: '通話ID',
    buildingLabel: '建物名',
    demoNote: 'これは研究発表用のデモです。実際のビデオ通話は行われていません。',
    endCallButton: '通話を終了する',
    photoSectionTitle: '専門家へ写真を送る',
    photoSectionDesc: '現場の状況が伝わる写真があれば、通話中に専門家へ送ることができます。',
    selectPhotoButton: '写真を選択して送る',
    photoSending: '送信中…',
    photoSent: '送信済み',
    photoRemoveLabel: '写真を削除',
    photoDemoNote: 'これはデモのため、実際には専門家へ送信されません。',
    recordIdLabel: '記録ID',
    signatureSectionTitle: '確認完了の署名',
    signatureSectionDesc: '確認が完了したら、下記に署名してください。',
    signButton: '署名する',
    signedStatus: '署名済み',
    unsignedStatus: '未署名',
    signedAtLabel: '署名日時',
    signatureModalTitle: '署名',
    signaturePlaceholder: '以下にお名前を入力し、署名としてください',
    signatureInputPlaceholder: 'お名前',
    clearButton: 'クリア',
    completeSignButton: '署名して完了',
    cancelButton: 'キャンセル',
    entranceControlSectionTitle: '入口ディスプレイの表示',
    entranceControlDesc: '判定結果に応じて、建物入口のディスプレイの表示が自動的に切り替わります。',
    setEntranceAllowedButton: '入口を「入場可能」にする',
    setEntranceDeniedButton: '入口を「入場禁止」にする',
    setEntranceDiagnosingButton: '入口を「診断中」にする',
    entranceCurrentLabel: '現在の入口表示',
    entranceStatusDiagnosing: '診断中',
    entranceStatusAllowed: '入場可能',
    entranceStatusDenied: '入場禁止',
    entranceHoldNote: 'HOLD（再入場禁止）の判定のため、「入場可能」は選択できません。',
  },
  expertDecision: {
    title: '入場可否の判定',
    description: '専門家との通話内容をもとに、この建物への入場可否を決定してください。',
    signRequiredNote: '決定ボタンを押すには、先に署名をしてください。',
  },
};

const en: Translation = {
  common: {
    langToggleLabel: '日本語',
    buildingName: 'Building A',
  },
  home: {
    appTitle: 'Post-Disaster Re-Entry Check',
    appSubtitle: "Check the building's safety status",
    buildingNameLabel: 'Building',
    checkedAtLabel: 'Checked at',
    gasAlarmSectionTitle: 'Gas Leak Detector',
    gasAlarmNormal: 'No Gas Alarm',
    gasAlarmAlarm: 'Gas Alarm Active',
    gasAlarmNoSignal: 'Not Connected',
    gasAlarmNormalBadge: 'No Alarm',
    gasAlarmAlarmBadge: 'Alarm',
    gasAlarmNoSignalBadge: 'Offline',
    gasAlarmNormalDesc: 'Receiving the latest data from the detector',
    gasAlarmAlarmDesc:
      'The detector has detected an abnormality. Evacuate immediately.',
    gasAlarmNoSignalDesc: 'Communication with the detector has been lost. Status cannot be confirmed.',
    gasLevelLabel: 'Gas level',
    gasLevelNormal: 'Normal range',
    gasLevelAbnormal: 'Abnormal level detected',
    gasLevelNoSignal: 'No data received',
    lastUpdatedLabel: 'Last received',
    disclaimer:
      'This system does not ultimately guarantee the safety of the building. If you sense danger, do not enter the building.',
    startButton: 'Start Check',
    devPanelOpen: 'Research demo control panel',
    devPanelClose: 'Close demo control panel',
    devPanelDesc:
      'For presentation demos: toggle the gas leak detector state (not linked to a real sensor). It automatically resets to "Normal" when you press "Start Over".',
    toggleAlarmButton: (statusLabel) => `Toggle detector state (current: ${statusLabel})`,
    relativeJustNow: 'just now',
    relativeSecondsAgo: (n) => `${n}s ago`,
    relativeMinutesAgo: (n) => `${n}m ago`,
  },
  seismic: {
    sectionTitle: 'Nearby Seismic Intensity',
    scaleLabel: (scale) => {
      const labels: Record<number, string> = {
        0: 'Intensity 0',
        10: 'Intensity 1',
        20: 'Intensity 2',
        30: 'Intensity 3',
        40: 'Intensity 4',
        45: 'Intensity 5 Lower',
        46: 'Intensity 5+ (unconfirmed)',
        50: 'Intensity 5 Upper',
        55: 'Intensity 6 Lower',
        60: 'Intensity 6 Upper',
        70: 'Intensity 7',
      };
      if (scale === null) return 'Unknown';
      return labels[scale] ?? 'Unknown';
    },
    statusLoading: 'Fetching seismic intensity from your location…',
    statusAutoObservedAt: 'Retrieved at',
    statusNoData: 'No recent seismic intensity reports nearby',
    statusFailed: 'Could not automatically retrieve seismic data. Please enter it manually.',
    sourceAutoBadge: 'Auto',
    sourceManualBadge: 'Manual',
    areaUnknown: 'Unknown area',
    retryButton: 'Retry automatic detection',
    manualToggleOn: 'Enter manually',
    manualToggleOff: 'Use automatic detection',
    manualScaleLabel: 'Seismic intensity',
    manualAreaLabel: 'Area name (optional)',
    manualAreaPlaceholder: 'e.g., City / Ward name',
    manualNotSet: 'Not set',
  },
  expertCapacity: {
    sectionTitle: 'Expert Video Call Availability',
    unitSeparator: '/',
    description: 'Consultations currently in progress',
    statusAvailable: 'Available — you can connect right away.',
    statusModerate: 'Moderately busy right now.',
    statusCongested: 'Busy — you may need to wait to connect.',
  },
  startConfirm: {
    title: 'Confirm Building Information',
    description:
      'Before starting the check, please confirm the building information is still accurate. Use "Edit Info" if anything has changed.',
    confirmButton: 'Start Check with This Info',
    editButton: 'Edit Info',
    cancelButton: 'Cancel',
  },
  buildingInfo: {
    sectionTitle: 'Building & Site Info',
    settingsButton: 'Settings',
    modalTitle: 'Building Information Settings',
    modalDesc: "Enter the building's basic information (pre-filled for this demo).",
    ageLabel: 'Building age',
    ageUnit: 'yr',
    locationLabel: 'Location',
    locationPlaceholder: 'e.g., 1-1-1 Marunouchi, Chiyoda-ku, Tokyo',
    floorsLabel: 'Floors',
    floorsUnit: 'floors',
    structureTypeLabel: 'Structure type',
    structureTypeOptions: {
      RC: 'RC (Reinforced Concrete)',
      S: 'S (Steel)',
      wood: 'Wood',
      other: 'Other',
    },
    floorAreaLabel: 'Total floor area',
    floorAreaUnit: 'm²',
    notSet: 'Not set',
    saveButton: 'Save',
    cancelButton: 'Cancel',
  },
  priorCheck: {
    sectionTitle: "Building's Check Record",
    signerLabel: 'Signer',
    savedAtLabel: 'Saved at',
    recordIdLabel: 'Record ID',
    notCheckedText: 'This building has not been checked yet.',
  },
  selfEntry: {
    sectionTitle: 'Self-Responsibility Entry Log',
    description:
      'Even before the check is complete, record the name, entry time, destination room, and signature of anyone entering the building at their own risk.',
    addButton: '+ Add Entry Record',
    emptyText: 'No records yet.',
    nameLabel: 'Name',
    namePlaceholder: 'e.g. Taro Yamada',
    roomLabel: 'Destination room',
    roomPlaceholder: 'e.g. 3F Office',
    entryTimeLabel: 'Entry time',
    riskNotice:
      'Entering a building before the safety check is complete may be dangerous. By signing, you acknowledge you are entering at your own risk.',
    modalTitle: 'Self-Responsibility Entry Record',
    modalDesc: 'Enter the name and destination. You will sign on the next screen.',
    nextButton: 'Next (Sign)',
    cancelButton: 'Cancel',
    removeButton: 'Remove',
    signedBadge: 'Signed',
  },
  viewSwitcher: {
    phoneTab: '📱 Phone',
    entranceTab: '🚪 Entrance',
    bothTab: '📱🚪 Side by side',
    controlTab: '🎛 Control Panel',
  },
  entranceDisplay: {
    diagnosingTitle: 'Diagnosing',
    diagnosingDesc: 'The building safety check is currently in progress. Please wait.',
    allowedTitle: 'Entry Allowed',
    allowedDesc: 'Re-entry into the building is currently allowed.',
    deniedTitle: 'Entry Prohibited',
    deniedDesc: 'Re-entry into the building is prohibited. Do not enter.',
    footerNote: 'This is a demo of the sign displayed at the building entrance.',
    diagnosingBadge: 'Checking',
    allowedBadge: 'Allowed',
    deniedBadge: 'Denied',
  },
  controlPanel: {
    title: 'Demo Control Panel',
    subtitle: 'This panel is for the presentation demo only and does not exist in a real system.',
    gasAlarmSectionTitle: 'Gas Leak Detector State',
    setNormalButton: 'Set to Normal',
    setAlarmButton: 'Set to Alarm',
    setNoSignalButton: 'Set to No Signal',
    currentStatusLabel: 'Current state',
    priorCheckSectionTitle: "This Building's Check Record",
    priorCheckOnButton: 'Mark as Checked',
    priorCheckOffButton: 'Mark as Not Checked',
    priorCheckCurrentLabel: 'Current state',
    priorCheckOnStatus: 'Checked',
    priorCheckOffStatus: 'Not checked',
    layoutSectionTitle: 'Display Layout',
    layoutCurrentLabel: 'Current view',
    layoutPhoneButton: '📱 Phone only',
    layoutEntranceButton: '🚪 Entrance only',
    layoutBothButton: '📱🚪 Side by side',
  },
  checklist: {
    checkLabel: 'Check item',
    progress: (index, total) => `${index} / ${total}`,
    importantBadge: 'Important',
    answerYes: 'Yes',
    answerYesHint: 'Danger present',
    answerNo: 'No',
    answerNoHint: 'No danger',
    answerUnknown: "Can't tell",
    answerUnknownHint: 'Cannot confirm on site',
    commentLabel: 'Describe the situation (optional)',
    commentPlaceholder:
      'e.g., A crack is visible on a 1st-floor column, but I cannot judge how severe it is.',
    commentNote: 'What you enter here will be used in the consultation message to the expert.',
    criticalStopNote:
      'Answering "Yes" immediately confirms an entry-prohibited (HOLD) result and ends the check here.',
    backButton: 'Back',
    nextButton: 'Next',
    finishButton: 'See Result',
  },
  questions: {
    q1_tilt: {
      text: 'Is there an obvious tilt or settling in the building?',
      shortLabel: 'Building tilt',
      dangerDescription: 'There may be a visible abnormality such as a building tilt',
      unknownBaseText:
        'Whether the building is tilting could not be judged on site from a visual check alone.',
    },
    q2_crack: {
      text: 'Is there major cracking or damage to primary structural members (columns, beams)?',
      shortLabel: 'Column / beam damage',
      dangerDescription: 'There may be danger from damaged columns or beams',
      unknownBaseText:
        'Whether the columns or beams are damaged, and how severely, could not be judged on site.',
    },
    q3_adjacent: {
      text: 'Is there a dangerous change to an adjacent building or the ground?',
      shortLabel: 'Adjacent / ground hazard',
      dangerDescription: 'Adjacent buildings or the ground may have a dangerous change',
      unknownBaseText: 'The condition of adjacent buildings or the ground could not be judged on site.',
    },
    q4_monitoring: {
      text: 'Is there a problem with structural monitoring (including not receiving the latest data)?',
      shortLabel: 'Structural monitoring',
      dangerDescription: 'Structural monitoring may be abnormal',
      unknownBaseText: 'The status of structural monitoring could not be judged on site.',
    },
    q5_ceiling: {
      text: 'Are there signs of ceiling damage or potential collapse?',
      shortLabel: 'Ceiling damage',
      dangerDescription: 'There may be a risk of ceiling damage or collapse',
      unknownBaseText: 'The risk of ceiling damage or collapse could not be judged on site.',
    },
    q6_glass: {
      text: 'Is there a hazard from glass or other falling objects?',
      shortLabel: 'Glass / falling objects',
      dangerDescription: 'There may be a glass or falling-object hazard',
      unknownBaseText: 'The glass or falling-object hazard could not be judged on site.',
    },
    q7_exit: {
      text: 'Is there any problem using the emergency stairs or exits?',
      shortLabel: 'Emergency stairs / exits',
      dangerDescription: 'Emergency stairs or exits may not be usable',
      unknownBaseText: 'Whether emergency stairs or exits are usable could not be judged on site.',
    },
    q9_fire: {
      text: 'Is there an abnormality in the fire alarm or fire-protection systems?',
      shortLabel: 'Fire alarm / fire protection',
      dangerDescription: 'Fire alarms or fire-protection systems may be abnormal',
      unknownBaseText: 'The status of fire alarms or fire-protection systems could not be judged on site.',
    },
    q10_elevator: {
      text: 'Has the elevator stopped, or is anyone trapped inside?',
      shortLabel: 'Elevator / trapped person',
      dangerDescription: 'There may be an elevator outage or trapped person',
      unknownBaseText: 'The elevator outage or trapped-person status could not be judged on site.',
    },
    q11_power: {
      text: 'Is there a power abnormality creating an electrical hazard?',
      shortLabel: 'Power status',
      dangerDescription: 'Additional checks are needed for power or electrical hazards',
      unknownBaseText: 'The power status could not be judged on site.',
    },
    q12_missing_data: {
      text: 'Is critical data needed for the safety decision missing?',
      shortLabel: 'Missing critical data',
      dangerDescription: 'Critical data needed for a safety decision is missing',
      unknownBaseText: 'The availability of critical safety data could not be judged on site.',
    },
  },
  result: {
    titleRoutine: 'Routine Check',
    titleTargeted: 'Targeted Check',
    titleExpert: 'Expert Review',
    titleHold: 'HOLD',
    descRoutine: 'All relevant checks were normal.',
    descTargeted: 'A focused follow-up is needed for one or more systems or interior items.',
    descExpert: 'Structural or critical items cannot be judged on site alone.',
    descHold: 'A serious hazard or a stop condition for the safety decision was detected.',
    targetedSectionTitle: 'Items needing a focused follow-up',
    targetedItemSuffix: ': follow-up needed',
    dangerSectionTitle: 'Why HOLD',
    gasAlarmReasonText: 'The gas leak detector has detected an alarm',
    unknownSectionTitle: 'Items that could not be judged',
    unknownItemSuffix: ": Can't tell",
    disclaimerSafe: 'This result does not guarantee the safety of the building.',
    disclaimerGeneral:
      'This system does not ultimately guarantee the safety of the building. If you sense danger, do not enter the building.',
    consultExpertButton: 'Review consultation details for an expert',
    restartButton: 'Start Over',
    askExpertPrompt: "If you're unsure or feel uneasy about this result, you can also consult an expert.",
    askExpertButton: 'Consult an expert',
    saveResultButton: 'Save Confirmation Result to App',
    savedBadge: 'Saved',
    recordIdLabel: 'Record ID',
    savedAtLabel: 'Saved at',
    autoNoteLabel: 'Auto-summarized memo',
    saveRequiresSignatureNote: 'Please sign above before saving.',
    endWorkButton: 'End Confirmation Work',
  },
  expertRequest: {
    title: 'Expert Consultation Request',
    subtitle:
      'The consultation message below was organized automatically from your answers. Please review it, then start a video call with an expert.',
    buildingNameLabel: 'Building',
    checkedAtLabel: 'Checked at',
    gasAlarmLabel: 'Gas leak detector',
    seismicLabel: 'Nearby seismic intensity',
    fieldResultSectionTitle: 'On-site check results',
    noUnknownItemsText: 'No items were left unable to be judged on site.',
    unknownSuffix: ": Can't tell",
    autoSummaryBadge: 'Auto-summarized (Demo)',
    autoSummarySectionTitle: 'Message to the expert',
    noExtraCommentText: 'No additional notes from the site',
    overallSummary: (unknownCount) =>
      `On-site staff were unable to judge the safety of ${unknownCount} item(s) during this check. Please review the details below and advise on whether re-entry is appropriate.`,
    overallSummaryNoUnknown:
      'No items were left unable to be judged during the on-site check, but the on-site staff would still like an expert to review the result, just to be safe.',
    extraCommentLabel: 'Anything you want to mention on the call (optional)',
    extraCommentPlaceholder:
      'e.g., The result was "Re-Entry Allowed", but I would still like it double-checked.',
    callButton: 'Start Video Call with Expert',
    connectingButton: 'Connecting…',
    backButton: 'Back to results',
  },
  expertCall: {
    liveBadge: 'Live',
    title: 'Video Call with Expert',
    expertLabel: 'Expert',
    expertRole: 'Structural safety expert (online)',
    selfLabel: 'You (on site)',
    waitingNote: 'The expert is reviewing the situation. Please describe the current state calmly.',
    callIdLabel: 'Call ID',
    buildingLabel: 'Building',
    demoNote:
      'This is a demo for a research presentation. No actual video call is taking place.',
    endCallButton: 'End Call',
    photoSectionTitle: 'Send Photos to the Expert',
    photoSectionDesc:
      'If you have photos that show the situation on site, you can send them to the expert during the call.',
    selectPhotoButton: 'Select & Send Photo',
    photoSending: 'Sending…',
    photoSent: 'Sent',
    photoRemoveLabel: 'Remove photo',
    photoDemoNote: 'This is a demo — photos are not actually sent to the expert.',
    recordIdLabel: 'Record ID',
    signatureSectionTitle: 'Completion Signature',
    signatureSectionDesc: 'Once the confirmation is complete, please sign below.',
    signButton: 'Sign',
    signedStatus: 'Signed',
    unsignedStatus: 'Not signed',
    signedAtLabel: 'Signed at',
    signatureModalTitle: 'Signature',
    signaturePlaceholder: 'Type your name below as your signature',
    signatureInputPlaceholder: 'Your name',
    clearButton: 'Clear',
    completeSignButton: 'Sign & Complete',
    cancelButton: 'Cancel',
    entranceControlSectionTitle: 'Entrance Display',
    entranceControlDesc: 'The entrance display switches automatically based on the check result.',
    setEntranceAllowedButton: 'Set Entrance to "Allowed"',
    setEntranceDeniedButton: 'Set Entrance to "Prohibited"',
    setEntranceDiagnosingButton: 'Set Entrance to "Diagnosing"',
    entranceCurrentLabel: 'Current entrance display',
    entranceStatusDiagnosing: 'Diagnosing',
    entranceStatusAllowed: 'Entry Allowed',
    entranceStatusDenied: 'Entry Prohibited',
    entranceHoldNote: '"Allowed" cannot be selected because the result is HOLD (do not re-enter).',
  },
  expertDecision: {
    title: 'Entry Decision',
    description:
      'Based on the call with the expert, decide whether entry to this building is allowed.',
    signRequiredNote: 'Please sign before you can press a decision button.',
  },
};

export const translations: Record<Lang, Translation> = { ja, en };
export type { Translation };
